const async = require('async');
const fs = require('fs');
const Web3 = require('web3');
const TruffleContract = require('truffle-contract');

const MappingCtrl = require('./mapping-ctrl')

const provider = new Web3.providers.HttpProvider('http://localhost:8545');
const web3 = new Web3(provider);

const projectData = JSON.parse(fs.readFileSync('../dapp/build/contracts/Project.json'));
const ProjectContract = new TruffleContract(projectData);
ProjectContract.setProvider(provider);

class ProjectCtrl {

  constructor() {}

  get(options, callback) {
    new MappingCtrl().getProjectAddresses(options.userAddr)
      .then(addresses => {
        const tasks = [];
        addresses.forEach(address => {
          tasks.push(callback => {
            ProjectContract.at(address)
              .then(instance => {
                return instance.getProjectInfo()
              })
              .then(result => {
                callback(null, this._formatProjectInfo(address, result))
              })
              .catch(callback)
          })
        })
        async.parallel(tasks, callback)
      })
      .catch(callback)
  }

  create(from, options, callback) {
    from = from || web3.eth.accounts[0];
    let proj;
    ProjectContract
      .new({
        from: from,
        gas: 4712388,
        gasPrice: 100000000000
      })
      .then(instance => {
        proj = instance;
        return instance.set(options.title, options.description, options.fundingGoal, Date.parse(options.fundingEnd), {
          from: from,
          gas: 4712388,
          gasPrice: 100000000000
        })
      })
      .then(() => {
        return new MappingCtrl().addProjectMapping({
          projectAddr: proj.address,
          creatorAddr: from
        })
      })
      .then(() => {
        return proj.getProjectInfo()
      })
      .then(result => {
        callback(null, this._formatProjectInfo(proj.address, result))
      })
      .catch(callback);
  }

  update(from, projAddr, properties, callback) {
    let proj
    let options = {
      from: from,
      gas: 4712388,
      gasPrice: 100000000000
    };
    ProjectContract.at(projAddr)
      .then(instance => {
        proj = instance;
        if (properties.title) {
          return proj.setTitle(properties.title, options)
        }
        return proj;
      })
      .then(() => {
        if (properties.description) {
          return proj.setDescription(properties.description, options)
        }
        return proj;
      })
      .then(() => {
        if (properties.fundingGoal) {
          return proj.setFundingGoal(properties.fundingGoal, options)
        }
        return proj;
      })
      .then(() => {
        if (properties.fundingStart) {
          return proj.setFundingStart(Date.parse(properties.fundingStart), options)
        }
        return proj;
      })
      .then(() => {
        if (properties.fundingEnd) {
          return proj.setFundingEnd(Date.parse(properties.fundingEnd), options)
        }
        return proj;
      })
      .then(() => {
        return proj.getProjectInfo()
      })
      .then(result => {
        callback(null, this._formatProjectInfo(proj.address, result))
      })
      .catch(callback);
  }

  delete(options, callback) {
    ProjectContract.at(options.projAddr).then(instance => {
        return instance.remove({
          from: options.from,
          gas: 4712388,
          gasPrice: 100000000000
        });
      })
      .then(() => {
        return new MappingCtrl().deleteProjectMapping({
          projectAddr: options.projAddr,
          from: options.from
        })
      })
      .then(() => callback())
      .catch(callback);
  }

  _formatProjectInfo(address, result) {
    let i = 0
    return {
      address: address,
      creator: result[i++],
      title: result[i++].toString(),
      description: result[i++].toString(),
      fundingAmount: result[i++].toNumber(),
      fundingGoal: result[i++].toNumber(),
      fundingStart: result[i++].toNumber(),
      fundingEnd: result[i++].toNumber(),
      fundingsCount: result[i++].toNumber(),
      sharesCount: result[i++].toNumber(),
      balance: result[i++].toNumber(),
    }
  }

}

module.exports = ProjectCtrl
