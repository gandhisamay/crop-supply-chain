pragma solidity ^0.8.14;

import "./Entity_Portal.sol";

contract Crop_Supply_Chain{

    //now here all the magic will happen
    //that's another doubt.
    Entity_Portal seed_producer_portal;
    Entity_Portal farmer_portal;

    constructor(address addr){
      seed_producer_portal = Entity_Portal(addr);
      farmer_portal = Entity_Portal(addr);
    }
}
