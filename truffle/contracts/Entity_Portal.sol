//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "./Supply_Chain_Structs.sol";

contract Entity_Portal{
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
