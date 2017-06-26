const fs = require('fs')
const commander = require('commander')
const Web3 = require('web3')
const TruffleContract = require('truffle-contract');
  
const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider);

const account = web3.eth.accounts[0];

const projectData = JSON.parse(fs.readFileSync('../dapp/build/contracts/Project.json'))
const ProjectContract = new TruffleContract(projectData)
ProjectContract.setProvider(provider)

function createNewProject(title, description, projectStart, projectEnd, fundingGoal, fundingStart, fundingEnd) {
  let address
  return ProjectContract.new({
    from: account,
    gas: 4712388,
    gasPrice: 100000000000
  }).then(instance => {
    address = instance.address
    return instance.set(title, description, projectStart, projectEnd, fundingGoal, fundingStart, fundingEnd, {
      from: account,
      gas: 4712388,
      gasPrice: 100000000000
    })
  }).then(result => {
    console.log(address)
  }).catch(err => console.error(err))
}

function getFundingStatus(address) {
  return ProjectContract.at(address).then(instance => {
    return instance.getFundingStatus();
  }).then(result => {
    console.log(result[0])
    return result
  }).catch(err => {
    console.error(err)
  })
}

function getProjectInfo(address) {
  return ProjectContract.at(address).then(instance => {
    return instance.getProjectInfo();
  }).then(result => {
    let i = 0
    console.log('creator:', result[i++])
    console.log('title:', result[i++].toString())
    console.log('description:', result[i++].toString())
    console.log('fundingAmount:', result[i++].toNumber())
    console.log('fundingGoal:', result[i++].toNumber())
    console.log('fundingStart:', result[i++].toNumber())
    console.log('fundingEnd:', result[i++].toNumber())
    console.log('fundings count:', result[i++].toNumber())
    console.log('shares count:', result[i++].toNumber())
    console.log('balance:', result[i++].toNumber())
    return result
  }).catch(err => {
    console.error(err)
  })
}

function randomFund(address) {
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  const account = web3.eth.accounts[getRandomInt(0, 9)]
  const balanceBefore = web3.eth.getBalance(account).toNumber()
  return ProjectContract.at(address).then(instance => {
    return instance.fund({
      from: account,
      gas: 4712388,
      gasPrice: 100000000000,
      value: getRandomInt(10000, 20000)
    });
  }).then(result => {
    const balanceAfter = web3.eth.getBalance(account).toNumber()
    console.log('randomFund:', balanceBefore - balanceAfter)
    return result
  }).catch(err => console.error(err))
}

function withdrawProject(address) {
  return ProjectContract.at(address).then(instance => {
    return instance.withdraw({
      from: account,
      gas: 4712388,
      gasPrice: 100000000000
    });
  }).then(result => {
    console.log('project %s withdrawed', address)
    return result
  }).catch(err => console.error(err))
}

function remove(address) {
  return ProjectContract.at(address).then(instance => {
    return instance.remove({
      from: account,
      gas: 4712388,
      gasPrice: 100000000000
    });
  }).then(result => {
    console.log('project %s removed', address)
    return result
  }).catch(err => console.error(err))
}

//  node cli.js create "Test title" "My description" 1000000 "2017-06-27T15:00:00"
commander.command('create')
  .description('adds a new project')
  .arguments('[title] [description] [fundingGoal] [fundingEnd]')
  .action((title, description, fundingGoal, fundingEnd) => {
    createNewProject(title, description, fundingGoal, Date.parse(fundingEnd))
  })

//  node cli.js withdraw 0x....0
commander.command('withdraw')
  .description('withdraw a project')
  .arguments('[address]')
  .action(address => {
    withdrawProject(address)
  })

//  node cli.js status 0x....0
commander.command('status')
  .description('get the funding status of a project')
  .arguments('[address]')
  .action(address => {
    getFundingStatus(address)
  })
  
//  node cli.js info 0x....0
commander.command('info')
  .description('debug a project')
  .arguments('[address]')
  .action(address => {
    getProjectInfo(address)
  })
  
//  node cli.js fund 0x....0
commander.command('fund')
  .description('fund a project randomly')
  .arguments('[address]')
  .action(address => {
    for (let i = 0; i < 50; i++) {
      randomFund(address)
    }
  })
  
//  node cli.js remove 0x....0
commander.command('remove')
  .description('remove a project')
  .arguments('[address]')
  .action(address => {
    remove(address)
  })

commander.parse(process.argv)
