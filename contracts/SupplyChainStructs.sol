//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

struct IoTDevice{
    string mac_address;
    string did_address;
}

//where to store this data that will be done later.
struct Inspection{
    string ds_hash;
    //string inspection_type;
    //string officer_address;

    uint application_timestamp;
    uint scheduled_inspection_timestamp;
    //string certification_agency_address;
}

struct SeedCertificationAgency{
    string lab_name;
    string lab_location;
    string lab_uid;
}

struct SeedCertificationResults{
    string sca_uid;
    string field_inspection;
    string bulk_inspection;
    string eval_of_orign;
    string sample_inspection;
    string control_plot_testing;
    string grow_out_test;
}

struct Seed{
    //crop whose seed it is
    string name;
    //store ipfs hash address of the seed producer details.
    string seed_producer_bc_add; 
}


struct SeedProducer{
    string name;
    string location;
    string blockchain_address;
    //the weighing scales are the iot devices which are present at the seed producer.
    mapping(string => IoTDevice) iot_devices;
}

struct Farm{
    string location;
    uint field_area;
    //here the key is the did address of the iot device...this can be changed to the mac address as well
    //or to any other field
    mapping(string => IoTDevice) iot_devices;}

struct Farmer{
    string blockchain_address;
    string name;
    string location;
    mapping(string => Farm) farms;
}

struct Package{
    //all this is stored in ipfs.
    // uint box_weight;
    // string source_add;
    //I'm thinking adding the logistics vehicle owner address who owns the vehicle.
    uint256 packaging_date;
    uint256 delivery_date;
    string uid;
}

struct Vehicle{
    string owner_bc_add;
    string vehicle_number;
    //this gps device will give the current location of the vehicle.
    IoTDevice iot_device;
}

struct LogisticsCompany{
    string name;
    string head_office_location;
    string owner_blockchain_address;
    mapping(string => Vehicle) vehicles;
}

struct Wholesaler{
    string blockchain_address;
    string name;
    string location;
}

struct Factory{
    string name;
    string location;
    mapping(string => IoTDevice) iot_devices;
}

struct Processor{
    string blockchain_address;
    string name;
    mapping(string => Factory) factories;
}

struct Distributor{
    string name;
}
struct Retailer{
    string name;
}