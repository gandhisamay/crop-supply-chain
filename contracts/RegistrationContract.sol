//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;
import "hardhat/console.sol";
import "./SupplyChainStructs.sol";
import "./Constants.sol";

contract RegistrationContract{

    mapping(string => Farmer) public farmers;
    mapping(uint => Seed) public seeds;
    uint seeds_size;
    mapping(string => SeedCertificationAgency) public seed_certification_agencies;
    mapping(string => SeedProducer) public seed_producers;
    mapping(string => Wholesaler) public wholesalers;
    mapping(string => Processor) public processors;
    mapping(string => Distributor) public distributors;
    mapping(string => Retailer) public retailers;
    mapping(string => LogisticsCompany) public logistics_companies;
    uint constant SALT = 12;

    constructor(){
      seeds_size = 0;
    }

    function compare(string memory s1, string memory s2) pure private returns(bool) {
      return keccak256(bytes(s1)) == keccak256(bytes(s2));
    }

    // function get_farmers() returns (mapping(string => Farmer))

    function generateRandomAddress(uint256 salt) public view returns (string memory) {
        bytes32 hash = keccak256(abi.encodePacked(block.timestamp, msg.sender, salt));
        bytes32 value = hash;
        bytes memory alphabet = "0123456789abcdef";
        bytes memory str = new bytes(42);
        str[0] = '0';
        str[1] = 'x';
        for (uint256 i = 0; i < 20; i++) {
            str[2+i*2] = alphabet[uint8(value[i + 12] >> 4)];
            str[3+i*2] = alphabet[uint8(value[i + 12] & 0x0f)];
        }
        return string(str);
    }

    function access_permission(string memory user_hash, string memory user_type) view public returns(bool)  {
      string memory blockchain_address;
      if(compare(user_type, SEEDPRODUCER)){
        blockchain_address = seed_producers[user_hash].blockchain_address;
      }
      else if(compare(user_type, FARMER)){
        blockchain_address = farmers[user_hash].blockchain_address;
      }
      else if(compare(user_type, WHOLESALER)){
        blockchain_address = wholesalers[user_hash].blockchain_address;
      }
      else if(compare(user_type, LOGISTICSCOMPANY)){
        blockchain_address = logistics_companies[user_hash].owner_blockchain_address;
      }
      else if(compare(user_type, PROCESSOR)){
        blockchain_address = processors[user_hash].blockchain_address;
      }
      else if(compare(user_type, DISTRIBUTOR)){
        blockchain_address = distributors[user_hash].blockchain_address;
      }
      else if(compare(user_type, RETAILER)){
        blockchain_address = retailers[user_hash].blockchain_address;
      }
      else if(compare(user_type, SEEDCERTIFICATIONAGENCY)){
        blockchain_address = seed_certification_agencies[user_hash].lab_uid;
      }

      return !compare(blockchain_address, "");
    }

    function register_farmer(string memory name, string memory bc_add, string memory location) payable public{
      Farmer storage f = farmers[bc_add]; 
      f.name = name;
      f.blockchain_address = bc_add;
      f.location = location;
    }

    //register farm function completed
    function register_farm(string memory farmer_bc_add, string memory location, uint field_area)payable public returns(string memory){
      if(!access_permission(farmer_bc_add, FARMER)) return "ERROR";
      Farmer storage f = farmers[farmer_bc_add];

      //generate a random based on timestamp
      string memory add = generateRandomAddress(SALT);
      console.log("Address: %s", add);
      Farm storage farm = f.farms[add];
      farm.location = location;
      farm.field_area = field_area;
      return add;
    }

    function register_seed(string memory name, string memory seed_producer_bc_add, string memory certification_agency_address)payable public{
      if(!access_permission(certification_agency_address, SEEDCERTIFICATIONAGENCY)) return;
      Seed storage s = seeds[seeds_size++];
      s.name = name;
      s.seed_producer_bc_add = seed_producer_bc_add;
    }

    function register_seed_producer(string memory name, string memory location, string memory blockchain_address) payable public{
      SeedProducer storage sp = seed_producers[blockchain_address];
      sp.name = name;
      sp.location = location;
      sp.blockchain_address = blockchain_address;
    }

    function register_seed_certification_agency(string memory lab_uid, string memory lab_name, string memory location)payable public{
      SeedCertificationAgency storage sca = seed_certification_agencies[lab_uid];
      sca.lab_uid = lab_uid;
      sca.lab_name = lab_name;
      sca.lab_location = location;
    }

    function register_processor(string memory blockchain_address, string memory name) payable public{
      Processor storage p = processors[blockchain_address];
      p.name = name;
      p.blockchain_address = blockchain_address;
    }

    function register_factory(string memory processor_bc_add, string memory name, string memory location) payable public returns(string memory){
      if(!access_permission(processor_bc_add, PROCESSOR)) return "ERROR";
      Processor storage p = processors[processor_bc_add];
      string memory add = generateRandomAddress(SALT);
      Factory storage f = p.factories[add];
      f.name = name;
      f.location = location;
      return add;
    }


    function register_iot_device(string memory owner_identity, string memory mac_address, string memory did_address, string memory device_location, string memory device_location_address) payable public{
      if(compare(device_location, FACTORY)){
        Processor storage p = processors[owner_identity];
        Factory storage f = p.factories[device_location_address];
        IoTDevice storage iot = f.iot_devices[mac_address];
        iot.mac_address = mac_address;
        iot.did_address = did_address;
      }
      // else if()
    }

    function register_logistics_company(string memory name, string memory head_office_location, string memory owner_bc_add) payable public{
      LogisticsCompany storage lc = logistics_companies[owner_bc_add];
      lc.owner_blockchain_address = owner_bc_add;
      lc.name = name;
      lc.head_office_location =  head_office_location;
    }

    function register_logistics_vehicle(string memory vehicle_no, string memory owner_bc_add, string memory logistics_company_owner_bc_add) payable public {
      if(!access_permission(logistics_company_owner_bc_add, LOGISTICSCOMPANY)) return;
      Vehicle storage v = logistics_companies[logistics_company_owner_bc_add].vehicles[vehicle_no];
      v.vehicle_number = vehicle_no;
      v.owner_bc_add = owner_bc_add;
    }
}