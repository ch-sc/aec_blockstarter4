pragma solidity ^0.4.11;

contract ProjectMapping {
  
  struct Project {
      address addr;
      address creatorAddr;
      bool deleted;
  }
  
  struct Backer {
    address addr;
    address projAddr;
    bool deleted;
  }
  
  address creator;
  Project[] projects;
  Backer[] backers;

  
  function addProjectMapping(address projAddr, address creatorAddr) public {
    projects.push(Project(projAddr, creatorAddr, false));
  }
  
  
  function getProjectCount() public constant returns (uint) {
    var count = 0;
    for (uint i = 0; i < projects.length; i++) {
      Project project = projects[i];
      if (!project.deleted) {
        count++;
      }
    }
    return count;
  }  
  
  
  function getProjectAddressAtIndex(uint index) public constant returns (address) {
    for (uint i = 0; i <= index; i++) {
      Project project = projects[index];
      if (project.deleted) {
        index++;
      }
      if (i == index) {
        return project.addr;
      }
    }
    return address(0);
  }
  
  
  function getProjectCountByCreator(address creatorAddr) public constant returns (uint) {
    var count = 0;
    for (uint i = 0; i < projects.length; i++) {
      Project project = projects[i];
      if (!project.deleted && project.creatorAddr == creatorAddr) {
        count++;
      }
    }
    return count;
  }  
  
  
  function getProjectAddressByCreatorAtIndex(address creatorAddr, uint index) public constant returns (address) {
    for (uint i = 0; i <= index; i++) {
      Project project = projects[index];
      if (project.deleted || project.creatorAddr != creatorAddr) {
        index++;
      }
      if (i == index) {
        return project.addr;
      }
    }
    return address(0);
  }
  
  
  function removeProject(address projAddr) public {
    for (uint i = 0; i < projects.length; i++) {
      Project project = projects[i]; 
      if (project.addr == projAddr) {
        project.deleted = true;
      }
    }
    for (uint y = 0; y < backers.length; y++) {
      Backer backer = backers[y];
      if (backer.projAddr == projAddr) {      
        backer.deleted = true;
      }
    }
  }
  
  
  function addBackerMapping(address projAddr, address backerAddr) public {
    backers.push(Backer(backerAddr, projAddr, false));
  }
  
  function getProjectCountByBacker(address backerAddr) public constant returns (uint) {
    var count = 0;
    for (uint i = 0; i < backers.length; i++) {
      Backer backer = backers[i];
      if (!backer.deleted && backer.addr == backerAddr) {
        count++;
      }
    }
    return count;
  }  
  
  
  function getProjectAddressByBackerAtIndex(address backerAddr, uint index) public constant returns (address) {
    for (uint i = 0; i <= index; i++) {
      Backer backer = backers[index];
      if (backer.deleted || backer.addr != backerAddr) {
        index++;
      }
      if (i == index) {
        return backer.projAddr;
      }
    }
    return address(0);
  }
  
  
  function removeBacker(address backerAddr) public {
    for (uint i = 0; i < backers.length; i++) {
      Backer backer = backers[i];      
      if (backer.addr == backerAddr) {      
        backer.deleted = true;
      }
    }
  }


}
