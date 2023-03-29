//SPDX-License-Identifier: MIT

pragma solidity ^0.8.14;
pragma abicoder v2;
import "./Supply_Chain_Structs.sol";
import "./Constants.sol";

//current address: 0x9Cc6F1A9f4D78376B73f617d5EABe83b5d74912e

contract Crop_Supply_Chain{

    string[] public farmers;
    string[] public seed_producers;
    string[] public seeds;

    //Helper functions
    function compare_strings(string memory s1, string memory s2) private returns(bool) {
      return keccak256(bytes(s1)) == keccak256(bytes(s2));
    } 

    function get_farmers() public returns(string[] memory) {
      return farmers;
    }

    function get_seed_producers() public returns(string[] memory) {
      return seed_producers;
    }

    function get_seeds() public returns(string[] memory) {
      return seeds;
    }
    //entity registration and deregistration done.
    
    function register(string memory add, string memory entity_type) public{
      string[] storage entities;
      if(compare_strings(entity_type, FARMER)) entities = farmers;
      /* else if(entity_type == Entity_Type.Seed_Producer) entities = seed_producers; */
      else entities = seeds;

      entities.push(add);
    }

    function deregister(string memory add, string memory entity_type) public{
     string[] storage entities;
      if(compare_strings(entity_type, FARMER)) entities = farmers;
      else entities = seeds;

      for(uint i = 0; i < entities.length; i++){
          if(compare_strings(entities[i], add)){
              entities[i] = entities[entities.length-1];
              entities.pop();
              return;
          }
      }
    } 

    function update(string memory old, string memory latest, string memory object_type) public {
      register(latest, object_type);
      deregister(old, object_type);
    }

    function is_object_valid(string memory add, string memory object_type) public returns(bool){
      if(compare_strings(object_type, SEED)){
        for(uint i = 0; i < seeds.length; i++){
          if(compare_strings(seeds[i], add)) 
            return true;
        }
      }

      return false;
    }


    //ab aur kya karna hai socho
    //1) Entity Registration done
    //2) Seed Certification Process results


    //Seed Certification Tests
    // function add_certification_test_results(string memory test_results, string memory test_type)public{
    //   //there are a compare things to be done here
    //   //1) ad
    //   if(compare_strings(test_type, EVAL_ORIGIN)){

    //   }
    //   else if(compare_strings(test_type, FIELD_INSPECTION)){

    //   }
    //   else if(compare_strings(test_type, SAMPLE_INSPECTION)){

    //   }
    //   else if(compare_strings(test_type, BULK_INSPECTION)){

    //   }
    //   else if(compare_strings(test_type, CONTROL_PLOT_TESTING)){

    //   }
    //   else if (compare_strings(test_type, GROW_OUT_TEST)){

    //   }
    // }
}

