//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

enum Entity_Type{
    Seed_Producer,
    Farmer
}

struct Seed{
    //crop whose seed it is
    string crop_name;
    //store ipfs hash address of the seed producer details.
    address seed_producer;
    //ipfs address of the seed certificate.
    address seed_certificate;
    //ipfs address of the seed certification test results.
    address seed_certification_test_results;
}

struct SeedCertificationTests{
    string lab_name;
    string lab_location;

    //all test related relevant data goes here....
    string officer_for_field_inspection;
}

struct SeedProducer{
    string name;
    string location;
    //this field can be a enum as well if required
    address seed_produced;
    uint seed_quantity_produced_this_year;
    uint seed_quantity_sold_this_year;
}

struct Farmer{
    string name;
    string location;
    uint field_length; //(in acres)
    uint field_breadth; //(in acres)
    //ipfs hash address of the details of the seed bought
    address seed_bought;
    uint seed_quantity_bought; //(in appropriate units);
}

struct RFID_Package{
    string rfid_tag;
    uint box_weight;
    string packaging_date;
}

enum IoT_Device_Usage_Locations{
    Farmer_Field,
    Logistics_Vehicle
}

struct IoTDevice{
    //this has to be an enum.
    string type_of_device;
    
    //need to store the address as well regarding where it is being used.
    IoT_Device_Usage_Locations usage_location;

    //there need to be a entry for the data that it stores as well prolly a mapping will  do the job.
    //how this data will be stored on the ipfs so storing the address.
    address data;
}


struct Logistics_Vehicle{
    string driver_name;
    string vehicle_number;
    //this gps device will give the current location of the vehicle.
    address gps_device;
}

struct Logistics_Company{
    string name;

    //need to know which vehicles belong to this logistics service and store them.

    address[] vehicles;

}
