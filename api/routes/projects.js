const async = require('async');
const express = require('express');
const fs = require('fs');
const Web3 = require('web3');
const TruffleContract = require('truffle-contract');

const store = require('../lib/store')

const router = express.Router();

const provider = new Web3.providers.HttpProvider('http://localhost:8545');

const projectData = JSON.parse(fs.readFileSync('../dapp/build/contracts/Project.json'));
const ProjectContract = new TruffleContract(projectData);
ProjectContract.setProvider(provider);

/**
 * GET /projects
 * returns all projects
 */
router.get('/', function(req, res, next) {
  const tasks = [];
  store.getProjects().forEach(entry => {
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
  async.parallel(tasks, (err, result) => {
    if (err) return next(err)
    res.send(result)
  })
});

module.exports = router;
