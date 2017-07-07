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

	// To store the voter information.
  struct voter {
		address voterAddress; // The address of the voter
    uint tokensBought;    // The total no. of tokens this voter owns
    uint[] tokensUsedPerTopic; // Array to keep track of votes per topic.
    /* We have an array of topics initialized below. Every time this voter votes with her tokens, the value at that index is incremented. Example, if topicList array declared below has ["Topic A", "Topic B", "Topic C" and this voter votes 10 tokens to 'Topic B', the tokensUsedPerTopic[1] will be incremented by 10.
    */
  }

	// The creator's address.
	address creator;
	string public title;
	string public description;
	uint public fundingAmount; // in wei
	uint fundingGoal = 0;
	uint fundingStart; // timestamp
	uint fundingEnd = 0; // timestamp

	// For voting functionality.
	mapping (address => voter) public voterInfo;
	mapping (bytes32 => uint) public votesReceived;
  bytes32[] public topicList;
	// totalTokens and balanceTokens should be same at start as no voting or buying has been done
  uint public totalTokens = 1000; // Total no. of tokens available for this election
  uint public balanceTokens = 1000; // Total no. of tokens still available for purchase
  uint public tokenPrice; // Price per token (in wei)

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
		// Linking the creator to this project.
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

			// Decrease the actual funding amount of this project in case something odd happens.
			fundingAmount = fundingAmount - funding.fundingAmount;
		}

		/*
		If the funding amount of this project is not yet 0, something unusual happend and the remove process should not get finalized. As error handling purposes all state changes will be reverted.
		*/
		if (fundingAmount != 0) {
			revert();
			throw;
		}

		selfdestruct(creator);
	}

	/*
	The fallback function does not throw an exception, but will use the transfered Ether ('msg.value') to back this project.
	*/
	function() payable {
		fund();
	}

	// Backing the project with the passed amount of Ether (wei). 'msg.value' will be ignored.
	function fund() public payable returns (uint) {
		if (fundingEnd <= now) {
			throw;
		}

		fundings.push(Funding(msg.sender, now, msg.value));

    var sharesCount = msg.value / (fundingGoal / totalTokens) ;
    sharesCount = sharesCount - sharesCount % 1;
    for (uint i = 0; i < sharesCount && shares.length < totalTokens; i++) {
      shares.push(Share(msg.sender));
    }

		fundingAmount = fundingAmount + msg.value;
		return fundingAmount;
	}

  function withdraw() public onlyCreator onlyGoalReached {
    if (this.balance != fundingAmount) throw;
    if (!creator.send(fundingAmount)) {
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

  function isBackedBy(address addr) public constant returns (bool) {
    for (var i = 0; i < fundings.length; i++) {
			Funding funding = fundings[i];
      if (funding.backer == addr) return true;
    }
    return false;
  }

	function getProjectInfo() public constant returns (address, string, string, uint, uint, uint, uint, uint, uint, uint) {
		return (creator, title, description, fundingAmount, fundingGoal, fundingStart, fundingEnd, fundings.length, shares.length, this.balance);
	}
	function getcreator() public constant returns(address)
	{
		return(creator);
	}

	// Voting functions.
	function setVoting(bytes32[] topicNames, uint pricePerToken) {
    topicList = topicNames;
		tokenPrice = pricePerToken;
  }

  function totalVotesFor(bytes32 topic) constant returns (uint) {
		return votesReceived[topic];
  }

  /*
	Instead of just taking the topic name as an argument, we also require the no. of tokens this voter wants to vote for the topic.
	*/
  function voteForTopic(bytes32 topic, uint votesInTokens) {
		uint index = indexOfTopic(topic);
    if (index == uint(-1)) throw;

    // msg.sender gives us the address of the account/voter who is trying to call this function.
    if (voterInfo[msg.sender].tokensUsedPerTopic.length == 0) {
    	for(uint i = 0; i < topicList.length; i++) {
          voterInfo[msg.sender].tokensUsedPerTopic.push(0);
      }
    }

    // Make sure this voter has enough tokens to cast the vote.
    uint availableTokens = voterInfo[msg.sender].tokensBought - totalTokensUsed(voterInfo[msg.sender].tokensUsedPerTopic);
    if (availableTokens < votesInTokens) throw;
		votesReceived[topic] += votesInTokens;

    // Store how many tokens were used for this topic.
    voterInfo[msg.sender].tokensUsedPerTopic[index] += votesInTokens;
  }

  // Return the sum of all the tokens used by this voter.
  function totalTokensUsed(uint[] _tokensUsedPerTopic) private constant returns (uint) {
		uint totalUsedTokens = 0;
    for(uint i = 0; i < _tokensUsedPerTopic.length; i++) {
      totalUsedTokens += _tokensUsedPerTopic[i];
    }
    return totalUsedTokens;
  }

  function indexOfTopic(bytes32 topic) constant returns (uint) {
		for(uint i = 0; i < topicList.length; i++) {
      if (topicList[i] == topic) {
        return i;
      }
    }
    return uint(-1);
  }

  /*
	Function to purchase the tokens. Note the keyword 'payable' below, now our contract can accept Ether from anyone who calls this function.
	*/
  function buyToken() public payable returns (uint) {
    var tokensToBuy = msg.value / tokenPrice;

    if (tokensToBuy > balanceTokens) throw;
    voterInfo[msg.sender].voterAddress = msg.sender;
    voterInfo[msg.sender].tokensBought += tokensToBuy;
    balanceTokens -= tokensToBuy;
    return uint(tokensToBuy);
  }

  function tokensSold() constant returns (uint) {
    return totalTokens - balanceTokens;
  }

	function voterDetails(address user) constant returns (uint, uint[]) {
  	return (voterInfo[user].tokensBought, voterInfo[user].tokensUsedPerTopic);
	}

  /*
  All the ether sent by voters who purchased the tokens is in this contract's account. This method will be used to transfer out all those ethers in to another account. *** The way this function is written currently,anyone can call this method and transfer the balance in to their account. We should add check to make sure only the owner of this contract can cash out.
  */

	function transferTo(address account) {
		account.transfer(this.balance);
  }

  function allTopics() constant returns (bytes32[]) {
    return topicList;
  }

}
