const express = require('express');
const fs = require('fs');
const Web3 = require('web3');
const TruffleContract = require('truffle-contract');

const router = express.Router();

const provider = new Web3.providers.HttpProvider('http://localhost:8545');

const projectData = JSON.parse(fs.readFileSync('../dapp/build/contracts/Project.json'));
const ProjectContract = new TruffleContract(projectData);
ProjectContract.setProvider(provider);

/**
 * POST /funds
 * BODY: {userAddr, projAddr, funding, etc...}
 * funds a certain project
 * returns the current funding status of the project if successful
 */
 router.post('/', function (req, res, next) {
   let userAddr = req.body.userAddr;
   let projAddr = req.body.projAddr;
   let funding = req.body.funding;

   ProjectContract.at(projAddr)
   .then(instance => {
     return instance.fund({
       from: userAddr,
       gas: 4712388,
       gasPrice: 100000000000,
       value: funding
     });
   })
   .then(result => {
     res.send(result);
   }).catch(next);
 });
 
 module.exports = router;
