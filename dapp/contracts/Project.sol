pragma solidity ^0.4.11;

contract Project {
	
	struct Funding {
		address backer;
		uint date;
		uint fundingAmount;
	}
  
  struct Share {
    address backer;
  }

	// the creator's address
	address creator;
	string public title;
	string public description;
	uint public fundingAmount; // in wei
	uint fundingGoal = 0;
	uint fundingStart; // timestamp
	uint fundingEnd = 0; // timestamp
  
  uint sharesNumber = 100;
	Share[] shares;
	Funding[] fundings;
    
  modifier onlyCreator() {
    require(msg.sender == creator);
    _;
  }
  
  modifier onlyGoalReached() {
    require(fundingAmount > fundingGoal);
    _;
  }

	function Project() public {
		// linking the creator to this project
		creator = msg.sender;
	
	}
	
	function set(string newTitle, string newDescription, uint newFundingGoal, uint newFundingEnd) public {
		title = newTitle;
		description = newDescription;
		fundingStart = now;
		fundingGoal = newFundingGoal;
		fundingEnd = newFundingEnd;
	}
  
  function setTitle(string newTitle) public {
    title = newTitle;
  }
  
  function setDescription(string newDescription) public {
    description = newDescription;
  }
  
  function setFundingGoal(uint newFundingGoal) public {
    fundingGoal = newFundingGoal;
  }
  
  function setFundingStart(uint newFundingStart) public {
    fundingStart = newFundingStart;
  }
  
  function setFundingEnd(uint newFundingEnd) public {
    fundingEnd = newFundingEnd;
  }

	function remove() public payable onlyCreator {
    			
		for (uint i = 0; i < fundings.length; i++) {
			Funding funding = fundings[i];
			
			if (!funding.backer.send(funding.fundingAmount)){
				revert();
				throw;
			}
			
			// decrease the actual funding amount of this project in case something odd happens
			fundingAmount = fundingAmount - funding.fundingAmount;
		}

		// If the funding amount of this project is not yet 0, something unusual happend and the remove process should 
		// not get finalized. As error handling purposes all state changes will be reverted.
		if (fundingAmount != 0) {
			revert();
			throw;
		}

		selfdestruct(creator);
	}

	// The fallback function does not throw an exception, but will use the transfered Ether ('msg.value') to back this project.
	function() payable {
		fund();
	 }

	/*
	 * Backing the project with the passed amount of Ether (wei). 'msg.value' will be ignored.
	 */
	function fund() public payable returns (uint) {
		if (fundingEnd <= now) {
			throw;
		}

		fundings.push(Funding(msg.sender, now, msg.value));
    
    var sharesCount = msg.value / (fundingGoal / sharesNumber) ;
    sharesCount = sharesCount - sharesCount % 1;
    for (uint i = 0; i < sharesCount && shares.length < sharesNumber; i++) {
      shares.push(Share(msg.sender));
    }
		
		fundingAmount = fundingAmount + msg.value;
		return fundingAmount;
	}
  
  function withdraw() public onlyCreator onlyGoalReached {
    if (this.balance != fundingAmount) throw;
    if (!creator.send(fundingAmount)){
			throw;
		}  
  }

	function getFundingStatus() public constant returns (string, uint, uint) {
		var currentStatus = "Initialized";

		if (fundingEnd > now && fundingAmount < fundingGoal){
			currentStatus = "Ongoing";
		} else if (fundingEnd > now && fundingAmount > fundingGoal){
			currentStatus = "GoalReached";
		} else {
			currentStatus = "Closed";
		}

		return (currentStatus, fundings.length, fundingAmount);
	}

	function getProjectInfo() public constant returns (address, string, string, uint, uint, uint, uint, uint, uint, uint) {
		return (creator, title, description, fundingAmount, fundingGoal, fundingStart, fundingEnd, fundings.length, shares.length, this.balance);
	}
}
