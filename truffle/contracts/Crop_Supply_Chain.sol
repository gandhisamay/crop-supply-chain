//SPDX-License-Identifier: MIT

pragma solidity ^0.8.14;

import "./Supply_Chain_Structs.sol";

//current address: 0x9Cc6F1A9f4D78376B73f617d5EABe83b5d74912e

contract Crop_Supply_Chain{

    address[] public farmers;
    address[] public seed_producers;

    //entity registration and deregistration done.
    
    function register(address add, Entity_Type entity_type) public{
      address[] storage entities;
      if(entity_type == Entity_Type.Farmer) entities = farmers;
      /* else if(entity_type == Entity_Type.Seed_Producer) entities = seed_producers; */
      else entities = seed_producers;

      entities.push(add);
    }

    function deregister(address add, Entity_Type entity_type) public{
      address[] storage entities;
      if(entity_type == Entity_Type.Farmer) entities = farmers;
      /* else if(entity_type == Entity_Type.Seed_Producer) entities = seed_producers; */
      else entities = seed_producers;

      for(uint i = 0; i < entities.length; i++){
          if(entities[i] == add){
              entities[i] = entities[entities.length-1];
              entities.pop();
              return;
          }
      }
    } 
}
