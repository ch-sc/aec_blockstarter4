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
 * GET /projects
 * returns all projects
 */
router.get('/', function (req, res) {
  // TODO get all projets
  const projects = [
    {
      lala: 'lele'
    }
  ]
  res.send(projects);
});

module.exports = router;
