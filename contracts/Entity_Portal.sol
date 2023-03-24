//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

//lets assume that the IPFS is not available for the moment then what shall we do.

contract Entity_Portal{
    address[] public entities;

    //entity registration and deregistration done.
    function add_entity(address add) public{
        entities.push(add);
    }

    function remove_entity(address add) public{
        for(uint i = 0; i < entities.length; i++){
            if(entities[i] == add){
                entities[i] = entities[entities.length-1];
                entities.pop();
                return;
            }
        }
    }

    function get_contract_address() public view returns(address){
        return address(this);
    }
}
