const fs = require('fs')
const commander = require('commander')
const Web3 = require('web3')
const TruffleContract = require('truffle-contract')

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider)

const account = web3.eth.accounts[0]

const projectData = JSON.parse(fs.readFileSync('../dapp/build/contracts/Project.json'))
const ProjectContract = new TruffleContract(projectData)
ProjectContract.setProvider(provider)

function createNewProject(title, description, projectStart, projectEnd, fundingGoal, fundingStart, fundingEnd) {
  let address
  ProjectContract
    .new({
      from: account,
      gas: 4712388,
      gasPrice: 100000000000
    })
    .then(instance => {
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
  ProjectContract.at(address)
    .then(instance => {
      return instance.getFundingStatus();
    }).then(result => {
      console.log(result[0])
      return result
    }).catch(err => console.error(err))
}

function getProjectInfo(address) {
  ProjectContract.at(address)
    .then(instance => {
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
    })
    .catch(err => console.error(err))
}

function randomFund(address) {
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  const account = web3.eth.accounts[getRandomInt(0, 9)]
  const balanceBefore = web3.eth.getBalance(account).toNumber()
  ProjectContract.at(address)
    .then(instance => {
      return instance.fund({
        from: account,
        gas: 4712388,
        gasPrice: 100000000000,
        value: getRandomInt(10000, 20000)
      });
    })
    .then(result => {
      const balanceAfter = web3.eth.getBalance(account).toNumber()
      console.log('randomFund:', balanceBefore - balanceAfter)
      return result
    })
    .catch(err => console.error(err))
}

function withdrawProject(address) {
  ProjectContract.at(address)
    .then(instance => {
      return instance.withdraw({
        from: account,
        gas: 4712388,
        gasPrice: 100000000000
      });
    })
    .then(result => {
      console.log('project %s withdrawed', address)
      return result
    })
    .catch(err => console.error(err))
}

function remove(address) {
  ProjectContract.at(address).then(instance => {
      return instance.remove({
        from: account,
        gas: 4712388,
        gasPrice: 100000000000
      });
    })
    .then(result => {
      console.log('project %s removed', address)
    })
    .catch(err => console.error(err))
}

// Voting functions
function setVoting(address, pricePerToken, topicNames) {
  ProjectContract.at(address)
    .then(instance => {
      return instance.setVoting(topicNames, web3.toWei(pricePerToken, 'ether'), {
        from: account,
        gas: 4712388,
        gasPrice: 100000000000
      });
    })
    .then(result => {
      console.log('project %s is setup for voting', address)
    })
    .catch(err => console.error(err))
}

function buyTokens(address, numtokens) {
  let projInstance;
  return ProjectContract.at(address)
    .then(instance => {
      projInstance = instance
      return instance.tokenPrice()
    })
    .then(price => {
      return numtokens * parseFloat(web3.fromWei(price.toString()))
    })
    .then(price => {
      return projInstance.buyToken({
        from: account,
        gas: 4712388,
        gasPrice: 100000000000,
        value: web3.toWei(price, 'ether')
      })
      .then(result => {
        //console.log(result);
        web3.eth.getBalance(account, function (error, balance) {
          console.log("Bought " + numtokens + " token(s)")
          console.log("Balance: " + web3.fromWei(balance.toString()) + " Ether")
        })
      })
      .catch(err => console.error(err))
    })
}

function voteForTopic(address, topic, tokens) {
  let projInstance
  ProjectContract.at(address)
    .then(instance => {
      projInstance = instance
      return instance.voteForTopic(topic, parseInt(tokens), {
        from: account,
        gas: 4712388,
        gasPrice: 100000000000
      });
    })
    .then(result => {
      return projInstance.totalVotesFor(topic, {
        from: account,
        gas: 4712388,
        gasPrice: 100000000000
      })
    })
    .then(result => {
      console.log('Votes for ' + topic + ': %s', result.toString())
    })
    .catch(err => console.error(err))
}

function allTopics(address) {
  ProjectContract.at(address)
    .then(instance => {
      return instance.allTopics();
    })
    .then(result => {
      for (let i = 0; i < result.length; i++) {
        console.log('%s', web3.toUtf8(result[i]))
      }
      return result
    })
    .catch(err => console.error(err))
}

function totalVotesForTopics(address) {
  let projInstance
  ProjectContract.at(address)
    .then(instance => {
      projInstance = instance
      return instance.allTopics();
    })
    .then(result => {
      for (let i = 0; i < result.length; i++) {
        projInstance.totalVotesFor(result[i])
          .then(result2 => {
            console.log('Votes for ' + web3.toUtf8(result[i]) + ': %s', result2.toString())
            return result2
          })
          .catch(err => console.error(err))
      }
    })
    .catch(err => console.error(err))
}

function voterDetails(address) {
  ProjectContract.at(address)
    .then(instance => {
      return instance.voterDetails(address)
    })
    .then(result => {
      //console.log(result)
      console.log("Tokens Bought: " + result[0].toString())
    })
    .catch(err => console.error(err))
}

function tokenDetails(address) {
  ProjectContract.at(address)
    .then(instance => {
      instance.totalTokens().then(function(value) {
        console.log("Total Tokens: %s", value.toString())
      })
      instance.tokensSold.call().then(function(value) {
        console.log("Tokens Sold: %s", value.toString())
      })
      instance.balanceTokens().then(function(value) {
        console.log("Tokens in Balance: %s", value.toString())
      })
      instance.tokenPrice().then(function(value) {
        console.log("Price per Token: %s", parseFloat(web3.fromWei(value.toString())))
      })
    })
    .catch(err => console.error(err))
}

//  node cli.js create "Test title" "My description" 1000000 "2017-06-30T15:00:00"
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

// node cli.js setvoting 0x....0 "0.1" "Topic A" "Topic B" "Topic C"
commander.command('setvoting')
  .description('sets voting functionality')
  .arguments('[address] [pricePerToken] [topicNames...]')
  .action((address, pricePerToken, topicNames) => {
    setVoting(address, pricePerToken, topicNames)
  })

// node cli.js buytokens 0x....0 25
commander.command('buytokens')
  .description('buy tokens')
  .arguments('[address] [numtokens]')
  .action((address, numtokens) => {
    buyTokens(address, numtokens)
  })

// node cli.js vote 0x....0 "Topic A" 10
commander.command('vote')
  .description('vote for a topic')
  .arguments('[address] [topic] [tokens]')
  .action((address, topic, tokens) => {
    voteForTopic(address, topic, tokens)
  })

// node cli.js topiclist 0x....0
commander.command('topiclist')
  .description('get list of all topics')
  .arguments('[address]')
  .action((address) => {
    allTopics(address)
  })

// node cli.js votesfortopics 0x....0
commander.command('votesfortopics')
  .description('get vote information for all topics')
  .arguments('[address]')
  .action((address) => {
    totalVotesForTopics(address)
  })

// node cli.js voterdetails 0x....0
commander.command('voterdetails')
  .description('get voter information')
  .arguments('[address]')
  .action((address) => {
    voterDetails(address)
  })

// node cli.js tokendetails 0x....0
commander.command('tokendetails')
  .description('get token information')
  .arguments('[address]')
  .action((address) => {
    tokenDetails(address)
  })

commander.parse(process.argv)
