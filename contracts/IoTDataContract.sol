//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;
import "hardhat/console.sol";
import "./RegistrationContract.sol";
import "./SupplyChainStructs.sol";

contract IoTDataContract{
    mapping(string => string[]) iot_data;

    function compare(string memory s1, string memory s2) pure private returns(bool) {
      return keccak256(bytes(s1)) == keccak256(bytes(s2));
    }

    function upload_iot_data_hash(string memory did_address, string memory ds_hash)payable public{
        iot_data[did_address].push(ds_hash);
    }

    function get_io_data(string memory did_address) view public returns (string[] memory) {
        return iot_data[did_address];
    }


    function verify_data_hash(string memory did_address, string memory ds_hash) view public returns(bool) {
        string[] memory data_arr = iot_data[did_address];

        for(uint i = 0; i < data_arr.length; i++) {
            if(compare(data_arr[i], ds_hash)) {
                return true;
            }
        }

        return false;
    }

}