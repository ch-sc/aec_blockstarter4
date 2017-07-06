const Promise = require('promise')
const async = require('async')
const ProjectMappingInstance = require('../lib/project-mapping-instance.js');


class MappingCtrl {

  getProjectAddresses(options) {
    options = Object.assign({
      creatorAddress: null,
      backerAddress: null
    }, options || {})
    return new Promise(function(resolve, reject) {
      let inst
      ProjectMappingInstance
        .then(instance => {
          inst = instance
          if (options.creatorAddress) {
            return instance.getProjectCountByCreator(options.creatorAddress)
          } else if (options.backerAddress) {
            return instance.getProjectCountByBacker(options.backerAddress)
          }
          return instance.getProjectCount()
        })
        .then(count => {
          const tasks = []
          for (let i = 0; i < count; i++) {
            tasks.push(callback => {
              let promise
              if (options.creatorAddress) {
                promise = inst.getProjectAddressByCreatorAtIndex(options.creatorAddress, i)
              } else if (options.backerAddress) {
                promise = inst.getProjectAddressByBackerAtIndex(options.backerAddress, i)
              } else {
                promise = inst.getProjectAddressAtIndex(i)
              }
              promise
                .then(address => callback(null, address))
                .catch(callback)
            })
          }
          async.parallel(tasks, (err, addresses) => {
            if (err) return reject(err)
            resolve(addresses)
          })
        })
        .catch(reject)
    })
  }


  addProjectMapping(options) {
    return new Promise(function(resolve, reject) {
      ProjectMappingInstance
        .then(instance => {
          return instance.addProjectMapping(options.projectAddr, options.creatorAddr, {
            from: options.creatorAddr,
            gas: 4712388,
            gasPrice: 100000000000
          })
        })
        .then(resolve)
        .catch(reject)
    })
  }


  deleteProjectMapping(options) {
    return new Promise(function(resolve, reject) {
      ProjectMappingInstance
        .then(instance => {
          return instance.removeProject(options.projectAddr, {
            from: options.from,
            gas: 4712388,
            gasPrice: 100000000000
          });
        })
        .then(resolve)
        .catch(reject)
    })
  }


  addBackerMapping(options) {
    return new Promise(function(resolve, reject) {
      ProjectMappingInstance
        .then(instance => {
          return instance.addBackerMapping(options.projectAddr, options.backerAddr, {
            from: options.backerAddr,
            gas: 4712388,
            gasPrice: 100000000000
          })
        })
        .then(resolve)
        .catch(reject)
    })
  }

}

module.exports = MappingCtrl
