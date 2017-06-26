var express = require('express');
const fs = require('fs');
const Web3 = require('web3');
const TruffleContract = require('truffle-contract');

var router = express.Router();

const provider = new Web3.providers.HttpProvider('http://localhost:8545');
const web3 = new Web3(provider);

const account = web3.eth.accounts[0];
const projectData = JSON.parse(fs.readFileSync('../dapp/build/contracts/Project.json'));
const ProjectContract = new TruffleContract(projectData);
ProjectContract.setProvider(provider);

/**
 * GET /projects
 * returns all projects
 */
router.get('/projects', function (req, res) {
  
});


/**
 * POST /user/{addr}/project
 * BODY: {title, description, etc...}
 * creates a project for a ceratain user
 * returns project if successful
 */
router.post('/user/:addr/project', function (req, res) {
  let address;

  return ProjectContract.new({
    from: account,
    gas: 4712388,
    gasPrice: 100000000000
  }).then(instance => {
    address = instance.address;
    return instance.set(req.body.title, req.body.description, req.body.projectStart, req.body.projectEnd, req.body.fundingGoal, req.body.fundingStart, req.body.fundingEnd, {
      from: account,
      gas: 4712388,
      gasPrice: 100000000000
    })
  }).then(result => {
    console.log(address);
    return ProjectContract.at(address).then(instance => {
      return instance.getProjectInfo();
    }).then(result => {
      //return project
      res.send(result);
    }).catch(err => {
      console.error(err);
    })
  }).catch(err => console.error(err));
});


/**
 * POST /fund
 * BODY: {userAddr, projAddr, funding, etc...}
 * funds a certain project
 * returns the current funding status of the project if succesful
 */
router.post('/fund', function (req, res) {
  return ProjectContract.at(req.body.projAddr).then(instance => {
    instance.fund({
      from: account,
      gas: 4712388,
      gasPrice: 100000000000,
      value: req.body.funding
    });
  }).then(result => {
    const balance = web3.eth.getBalance(account).toNumber();
    console.log('Fund:', balance);
    return ProjectContract.at(address).then(instance => {
      return instance.getFundingStatus();
    }).then(result => {
      console.log(result[0]);
      // return funding status
      res.send(result[0]);
    }).catch(err => {
      console.error(err);
    });
  }).catch(err => console.error(err));
});


/**
 * DELETE /user/{userAddr}/project/{projAddr}
 * removes the project and sends all the fundings back to each backer
 * returns true
 */
router.delete('/user/:userAddr/project/:projAddr', function (req, res) {
  ProjectContract.at(req.query.projAddr).then(instance => {
    instance.remove({
      from: account,
      gas: 4712388,
      gasPrice: 100000000000
    });
  }).then(result => {
    console.log('project %s removed', address);
    // return true
    res.send(true);
  }).catch(err => console.error(err));
});

module.exports = router;
