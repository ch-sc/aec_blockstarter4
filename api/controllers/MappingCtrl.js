const async = require('async');
const fs = require('fs');
const Web3 = require('web3');
const project_mapping_istance=require('../lib/project-mapping-instance.js');
//const store = require('../lib/store')


class InvestmentCtrl{
	constructor(){}

	getProject(options, callback) {

	    project_mapping_istance.then(instance =>{
	    	return instance.getProjects()
	    }).then(addresses =>{
	    	callback(null,addresses.split(',') ) 
	    }).catch(callback);
	    
	}


	createProject(options, callback){

		project_mapping_istance.new({
			projectAddr: options.projectAddr,
			backer: options.backerAddr,
			creator: options.creatorAddr
		}).then(instance =>{
			callback(null, return (intance.addProject(instance.projectAddr, instance.creatorAddr)))
		}).catch(callback);
	}


     deletProject(options, callback){
	  	project_mapping_istance.at(options.projAddr).then(instance => {
	        return instance.remove({
	          from: options.creatorAddr,
	          projectAddr: options.projetAddr
	        });
	      })
	      .then(result => callback(null, result))
	      .catch(callback);  
  	}

     
}

  	
 
  
