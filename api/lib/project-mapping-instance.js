const fs = require('fs')
const path = require('path')
const Promise = require('promise')

const Web3 = require('web3')
const TruffleContract = require('truffle-contract')

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider)

const from = web3.eth.accounts[0]
const filePath = path.join(__dirname, '../data.json')

const projectMappingData = JSON.parse(fs.readFileSync('../dapp/build/contracts/ProjectMapping.json'))
const ProjectMappingContract = new TruffleContract(projectMappingData)
ProjectMappingContract.setProvider(provider);

const promise = new Promise(function(resolve, reject) {
  let data
  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath))
  }
  if (data && data.projectMappingInstanceAddr) {
    ProjectMappingContract
      .at(data.projectMappingInstanceAddr)
      .then(resolve)
      .catch(() => {
        createNewInstance(resolve, reject)
      })
  } else {
    createNewInstance(resolve, reject)
  }
})

function createNewInstance(resolve, reject) {
  ProjectMappingContract
    .new({
      from: from,
      gas: 4712388,
      gasPrice: 100000000000
    })
    .then(instance => {
      fs.writeFile(filePath, JSON.stringify({
        projectMappingInstanceAddr: instance.address
      }), function(err) {
        if (err) return reject(err)
        resolve(instance)
      })
    })
    .catch(reject)
}

module.exports = promise
