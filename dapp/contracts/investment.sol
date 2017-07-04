pragma solidity ^0.4.11;
import "./project.sol";
contract investment{
    struct invest{
        address backer;
        address project;
        address creator;
    }
    invest[] invests;
    project public projects;

    function investment(address user)
    {
        project p=project(user);
        invests.push(invest(user,address(projects),p.getcreator()));
    }
          modifier onlyusers() {
    require(msg.sender == user);
    _;
  }
    function get_investment(address user) public constant onlyusers returns(address,address)
    {
        
      for (var i = 0; i < invests.length; i++) {
			invest investment = invests[i];
      if ( investment.backer == user ) return (investment.project,investment.creator);

    }
       return false;
    }
}