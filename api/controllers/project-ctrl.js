const async = require('async');
const fs = require('fs');
const Web3 = require('web3');
const TruffleContract = require('truffle-contract');

const store = require('../lib/store')

const provider = new Web3.providers.HttpProvider('http://localhost:8545');
const web3 = new Web3(provider);

const projectData = JSON.parse(fs.readFileSync('../dapp/build/contracts/Project.json'));
const ProjectContract = new TruffleContract(projectData);
ProjectContract.setProvider(provider);

class ProjectCtrl {

  constructor() {}

  get(options, callback) {
    const tasks = [];
    store.getProjects(options.userAddr).forEach(entry => {
      tasks.push(callback => {
        let address;
        ProjectContract.at(entry.projAddr)
          .then(instance => {
            address = instance.address
            return instance.getProjectInfo()
          })
          .then(result => {
            let i = 0
            const project = {
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
            };
            callback(null, project)
          })
          .catch(callback)
      })
    })
    async.parallel(tasks, callback)
  }

  create(options, callback) {
    options = Object.assign({
      from: web3.eth.accounts[0]
    }, options || {})
    let projAddr;
    ProjectContract.new({
        from: options.from,
        gas: 4712388,
        gasPrice: 100000000000
      }).then(instance => {
        projAddr = instance.address;
        store.addProject(projAddr, options.from)
        return instance.set(options.title, options.description, options.fundingGoal, Date.parse(options.fundingEnd), {
          from: options.from,
          gas: 4712388,
          gasPrice: 100000000000
        })
      }).then(() => {
        return ProjectContract.at(projAddr)
          .then(instance => instance.getProjectInfo())
          .then(result => callback(null, result))
          .catch(callback)
      })
      .catch(callback);
  }
  
  update(from, projAddr, properties, callback) {

    var proj;
    ProjectContract.at(projAddr)
      .then(instance => {
        proj = instance;
        if (properties.title) {
          return proj.setTitle(properties.title)
        }
        return proj;
      })
      .then(() => {
        if (properties.description) {
          return proj.setDescription(properties.description)
        }
        return proj;
      })
      .then(() => {
        if (properties.fundingGoal) {
          return proj.setFundingGoal(properties.fundingGoal)
        }
        return proj;
      })
      .then(() => {
        if (properties.fundingStart) {
          return proj.setFundingStart(properties.fundingStart)
        }
        return proj;
      })
      .then(() => {
        if (properties.fundingEnd) {
          return proj.setFundingEnd(properties.fundingEnd)
        }
        return proj;
      })
      .then(() => callback(null, true))
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
      .then(result => callback(null, result))
      .catch(callback);    
  }

}

module.exports = ProjectCtrl
