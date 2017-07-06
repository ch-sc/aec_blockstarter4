const Promise = require('promise')
const async = require('async')
const ProjectMappingInstance = require('../lib/project-mapping-instance.js');


class MappingCtrl {

  getProjectAddresses(creatorAddress) {
    return new Promise(function(resolve, reject) {
      let inst
      ProjectMappingInstance
        .then(instance => {
          inst = instance
          if (creatorAddress) {
            return instance.getProjectCountByCreator(creatorAddress)
          }
          return instance.getProjectCount()
        })
        .then(count => {
          const tasks = []
          for (let i = 0; i < count; i++) {
            tasks.push(callback => {
              let promise
              if (creatorAddress) {
                promise = inst.getProjectAddressByCreatorAtIndex(creatorAddress, i)
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
          return instance.addProject(options.projectAddr, options.creatorAddr, {
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


}

module.exports = MappingCtrl
