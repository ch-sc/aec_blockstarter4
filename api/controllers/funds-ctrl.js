// TODO
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

class FundCtrl {

  constructor() { }

  getBackerProjects(options, callback) {
    const tasks = [];
    store.getProjects(options.userAddr).forEach(entry => {
      tasks.push(callback => {
        let address;
        ProjectContract.at(entry.projAddr)
          .then(instance => {
            address = instance.address
            if (instance.isBackedBy(address)) {
              return instance.getProjectInfo()
            }
          }).then(result => {
            callback(null, this._formatProjectInfo(address, result))
          })
          .catch(callback)
      })
    })
    async.parallel(tasks, callback)
  }

  doFund(options, callback) {
    ProjectContract.at(options.projAddr).then(instance => {
      return instance.fund({
        from: options.userAddr,
        gas: 4712388,
        gasPrice: 100000000000,
        value: options.funding
      });
    }).then(() => {
      return ProjectContract.at(option.projAddr)
        .then(instance => instance.getFundingStatus())
        .then(result => callback(null, result))
        .catch(callback)
    }).catch(callback)
  }

}

module.exports = FundCtrl