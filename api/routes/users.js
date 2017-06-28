const express = require('express');
const fs = require('fs');
const Web3 = require('web3');
const TruffleContract = require('truffle-contract');

const store = require('../lib/store')
const logger = require('../lib/logger')

const router = express.Router();

const provider = new Web3.providers.HttpProvider('http://localhost:8545');
const web3 = new Web3(provider);

const projectData = JSON.parse(fs.readFileSync('../dapp/build/contracts/Project.json'));
const ProjectContract = new TruffleContract(projectData);
ProjectContract.setProvider(provider);

/**
 * GET /users/
 * returns all users of the blockchain
 */
router.get('/', function (req, res) {
  res.send(web3.eth.accounts);
});


/**
 * GET /users/{addr}/projects
 * lists all the proejcts that a user owns
 */
router.get('/:addr/projects', function (req, res) {
  // TODO list of projects of a user
  const projects = [
    {
      lala: 'lele'
    }
  ]
  res.send(projects);
});


/**
 * POST /users/{addr}/projects
 * BODY: {title, description, etc...}
 * creates a project for a ceratain user
 * returns project if successful
 */
router.post('/:addr/projects', function (req, res,  next) {
  let projAddr;
  ProjectContract.new({
    from: req.params.addr,
    gas: 4712388,
    gasPrice: 100000000000
  }).then(instance => {
    projAddr = instance.address;
    store.addProject(projAddr, req.params.addr)
    return instance.set(req.body.title, req.body.description, req.body.fundingGoal, Date.parse(req.body.fundingEnd), {
      from: req.params.addr,
      gas: 4712388,
      gasPrice: 100000000000
    })
  }).then(() => {
    return ProjectContract.at(projAddr)
    .then(instance => instance.getProjectInfo())
    .then(result => res.send(result))
    .catch(next)
  })
  .catch(next);
});



/**
 * DELETE /users/{userAddr}/project/{projAddr}
 * removes the project and sends all the fundings back to each backer
 * returns true
 */
router.delete('/:userAddr/project/:projAddr', function (req, res, next) {
  ProjectContract.at(req.params.projAddr).then(instance => {
    instance.remove({
      from: req.params.userAddr,
      gas: 4712388,
      gasPrice: 100000000000
    });
  })
  .then(result => res.send(result))
  .catch(next);
});



/**
 * GET /users/{addr}/funds
 * list all the projects that I already backed/funded
 */
router.get('/:addr/funds', function (req, res) {
  let userAddr = req.params.addr;
  let balance = web3.fromWei(web3.eth.getBalance(userAddr), "ether");
  res.send(balance);
});

module.exports = router;
