pragma solidity ^0.4.11;

import "../lib/strings.sol";

contract ProjectMapping {
  
  using strings for *;
  
  struct Project {
      address addr;
      address creatorAddr;
  }
  
  struct Backer {
    address addr;
    address projAddr;
  }
  
  address creator;
  Project[] projects;
  Backer[] backers;
  
  
  function addProject(address projAddr, address creatorAddr) public {
    projects.push(Project(projAddr, creatorAddr));
  }
  
  
  function getProjects(address creatorAddr) public constant returns (string) {
    var addresses = "";
    for (uint i = 0; i < projects.length; i++) {
      Project project = projects[i];
      if (creatorAddr != address(0) && project.creatorAddr != creatorAddr) {
        continue;
      }
      if (i > 0) {
        addresses.toSlice().concat(",".toSlice());
      }
      addresses.toSlice().concat(addressToString(project.addr).toSlice());
    }
    return string(addresses);
  }
  
  
  function removeProject(address projAddr) public {
    for (uint i = 0; i < projects.length; i++) {
      Project project = projects[i]; 
      if (project.addr == projAddr) {
        delete projects[i];
      }
    }
    for (uint y = 0; y < backers.length; y++) {
      Backer backer = backers[y];
      if (backer.projAddr == projAddr) {      
        delete backers[y];
      }
    }
  }
  
  
  function addBacker(address backerAddr, address projAddr) public {
    backers.push(Backer(backerAddr, projAddr));
  }
  
  
  function getProjectsByBacker(address backerAddr) public constant returns (string) {
    var addresses = "";
    for (uint i = 0; i < backers.length; i++) {
      Backer backer = backers[i];
      if (backer.addr != backerAddr) {
        continue;
      }
      if (i > 0) {
        addresses.toSlice().concat(",".toSlice());
      }
      addresses.toSlice().concat(addressToString(backer.projAddr).toSlice());
    }
    return string(addresses);
  }
  
  
  function removeBacker(address backerAddr) public {
    for (uint i = 0; i < backers.length; i++) {
      Backer backer = backers[i];      
      if (backer.addr == backerAddr) {      
        delete backers[i];
      }
    }
  }


  function addressToString(address x) returns (string) {
    bytes memory b = new bytes(20);
    for (uint i = 0; i < 20; i++) {
      b[i] = byte(uint8(uint(x) / (2**(8*(19 - i)))));
    }
    return string(b);
  }


}
