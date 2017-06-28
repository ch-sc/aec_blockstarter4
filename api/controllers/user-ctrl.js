const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider);

class UserCtrl {

  constructor() {}

  get(options, callback) {
    callback(null, web3.eth.accounts)
  }
  
}

module.exports = UserCtrl
