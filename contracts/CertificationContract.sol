//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "./SupplyChainStructs.sol";

contract CertificationContract{

    mapping(string => SeedCertificationResults) public sc_results;
    mapping(string => Inspection) public inspections;

    function request_inspection(string memory ds_hash) payable public{
        Inspection storage inspection = inspections[ds_hash];
        inspection.application_timestamp = block.timestamp;
        inspection.scheduled_inspection_timestamp = block.timestamp;
    }

    function seed_certification_results(string memory seed_hash, string memory eval_of_orign, string memory field_inspection, string memory sample_inspection, string memory bulk_inspection, string memory control_plot_testing, string memory grow_out_test)payable public{
      SeedCertificationResults storage results = sc_results[seed_hash];
      results.eval_of_orign = eval_of_orign;
      results.field_inspection = field_inspection;
      results.sample_inspection = sample_inspection;
      results.bulk_inspection = bulk_inspection;
      results.control_plot_testing = control_plot_testing;
      results.grow_out_test = grow_out_test;
    }
}