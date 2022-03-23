// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Streamlive {
    uint public maxCreatorCount;
    
    struct Creator {
        string metadata;
        address addr;
    }

    event creatorEdited(string metadata, address addr);
    
    mapping (address => uint) public creatorAddrToId;
    mapping (uint => address) public idToCreatorAddr;
    
    
    Creator[] creators;
    
    constructor () {
        creators.push(Creator("genesis", address(0)));
        
    }
  
    function addCreator(string memory _metadata) public {
        require(creatorAddrToId[msg.sender] == 0, "creator already exists");
        Creator memory creator = Creator(_metadata, msg.sender);
        creators.push(creator);
        creatorAddrToId[msg.sender] = creators.length - 1;
        idToCreatorAddr[creators.length - 1] = msg.sender;
        maxCreatorCount++;
    }

    function getCreator(uint _id) public view returns (string memory) {
        require(_id <= maxCreatorCount, "creator does not exist");
        return creators[_id].metadata;
    }
        
    function editCreator(string memory _metadata) public {
        require(creatorAddrToId[msg.sender] != 0, "creator does not exist");
        creators[creatorAddrToId[msg.sender]].metadata = _metadata;
        emit creatorEdited(_metadata, msg.sender);
    }
        
    function getCreators(uint _startCreatorId, uint _numberOfCreators) public view returns (string[] memory) {
        string[] memory result = new string[](_numberOfCreators);
        for (uint i = 0; i < _numberOfCreators; i++) {
            if ((_startCreatorId + i) < maxCreatorCount) {
                result[i] = creators[_startCreatorId + i].metadata;
            }
        }
        return result;
    }
        

}
