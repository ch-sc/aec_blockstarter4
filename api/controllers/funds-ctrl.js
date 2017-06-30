// TODO
const async = require('async');
const fs = require('fs');
const Web3 = require('web3');
const TruffleContract = require('truffle-contract');

const store = require('../lib/store')
const ProjectCtrl = require('./project-ctrl')

const provider = new Web3.providers.HttpProvider('http://localhost:8545');

const projectData = JSON.parse(fs.readFileSync('../dapp/build/contracts/Project.json'));
const ProjectContract = new TruffleContract(projectData);
ProjectContract.setProvider(provider);

class FundCtrl {

  constructor() { }

  getBackerProjects(userAddr, callback) {
    const tasks = [];
    store.getProjects().forEach(entry => {
      tasks.push(callback => {
        let proj;
        ProjectContract.at(entry.projAddr)
          .then(instance => {
            proj = instance
            return instance.isBackedBy(userAddr)
          })
          .then(result => {
            if (result)
              return proj.getProjectInfo()
            else 
              return null
          })
          .then(result => {
            callback(null, result ? new ProjectCtrl()._formatProjectInfo(proj.address, result) : null)
          })
          .catch(callback)
      })
    })
    async.parallel(tasks, (err, result) => {
      if (err) return callback(err)
      callback(null, result.filter(item => item != null))
    })
  }

  doFund(options, callback) {
    let proj;
    ProjectContract.at(options.projAddr)
    .then(instance => {
      proj = instance;
      return instance.fund({
        from: options.userAddr,
        gas: 4712388,
        gasPrice: 100000000000,
        value: options.funding
      });
    })
    .then(() => {
      return proj.getFundingStatus()
    })
    .then(result => callback(null, result))
    .catch(callback)
  }

}

module.exports = FundCtrl
