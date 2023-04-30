//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "./Constants.sol";
import "./SupplyChainStructs.sol";
import "hardhat/console.sol";

contract PackageContract{
    mapping(string => Package) public seed_packages;
    mapping(string => Package) public crop_packages;
    mapping(string => Package) public processor_packages;
    mapping(string => Package) public distributor_packages;
    mapping(string => Package) public retailer_packages;

    function compare(string memory s1, string memory s2) pure private returns(bool) {
      return keccak256(bytes(s1)) == keccak256(bytes(s2));
    } 

    function get_package(string memory ds_hash, string memory source) view private returns(Package storage){
        Package storage p = crop_packages[ds_hash];
        if(compare(source, FARM)){
            p = crop_packages[ds_hash];
        }
        else if(compare(source, SEEDPRODUCER)){
            p = seed_packages[ds_hash];
        }
        else if(compare(source, PROCESSOR)){
            p = processor_packages[ds_hash];
        }
        else if(compare(source, DISTRIBUTOR)){
            p = distributor_packages[ds_hash];
        }
        else if(compare(source, RETAILER)){
            p = retailer_packages[ds_hash];
        }
        return p;
    }

    function add_package(string memory ds_hash, string memory source) public{
        Package memory p = Package({packaging_date: block.timestamp, delivery_date: 0, uid : ds_hash});
        
        if(compare(source, FARM)){
            crop_packages[ds_hash] = p;
        }
        else if(compare(source, SEEDPRODUCER)){
            seed_packages[ds_hash] = p;
        }
        else if(compare(source, PROCESSOR)){
            processor_packages[ds_hash] = p;
        }
        else if(compare(source, DISTRIBUTOR)){
            distributor_packages[ds_hash] = p;
        }
        else if(compare(source, RETAILER)){
            retailer_packages[ds_hash] = p;
        }
    }

    function verify_package(string memory ds_hash, string memory source) view public returns (bool){
        Package storage p = get_package(ds_hash, source);
        return (p.packaging_date > 0  && !compare(p.uid, ""));
    }

    //here the source role is the role or the struct type of the person whose material actually it is
    function accept_package_delivery(string memory ds_hash, string memory source) public{
        //accept package delivery.
        Package storage p = get_package(ds_hash, source);
        p.delivery_date = block.timestamp;
    }

}