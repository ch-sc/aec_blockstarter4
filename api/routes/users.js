var express = require('express');
const fs = require('fs');
const Web3 = require('web3');
const TruffleContract = require('truffle-contract');

var router = express.Router();

const provider = new Web3.providers.HttpProvider('http://localhost:8545');
const web3 = new Web3(provider);

const projectData = JSON.parse(fs.readFileSync('../dapp/build/contracts/Project.json'));
const ProjectContract = new TruffleContract(projectData);
ProjectContract.setProvider(provider);

/**
 * GET /users
 * returns all users of the blockchain
 */
router.get('/users', function (req, res) {
  let users = web3.eth.account;
  res.send(users);
});


/**
 * GET /user/{addr}/projects
 * lists all the proejcts that a user owns
 */
router.get('/user/:addr/projects', function (req, res) {

});


/**
 * GET /user/{addr}/funds
 * list all the projects that I already backed/funded
 */
router.get('/user/:addr/funds', function (req, res) {
  let userAddr = req.params.addr;
  let balance = web3.fromWei(eth.getBalance(userAddr), "ether");
  res.send(balance);
});

module.exports = router;
