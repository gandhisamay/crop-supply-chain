import React from 'react';
import { create } from 'ipfs-http-client';
import FarmerForm from './Forms/Farmer';

const Registration = () => {

  function ipfsTransfer(event) {
    event.preventDefault();
    console.log("BEGIN IPFS TRANSFER");
    const node = create("http://localhost:5001");

    //how to access eth provider now.
    //
    

    
  }
  return (
    < div className="container d-flex flex-column justify-content-center align-items-center" style={{ height: "100%" }}>
      <h1 className="h1">Registration Page</h1>
      <button className="btn btn-outline-primary mt-2" style={{ width: "8rem" }} onClick={(e) => ipfsTransfer(e)}> Seed Producer</button>
      <button className="btn btn-outline-primary mt-2" style={{ width: "18rem" }} onClick={(e) => ipfsTransfer(e)}> Government Certification Agency</button>
      <button className="btn btn-outline-primary mt-2" style={{ width: "8rem" }} onClick={(e) => ipfsTransfer(e)}> Farmer </button>
      <button className="btn btn-outline-primary mt-2" style={{ width: "8rem" }} onClick={(e) => ipfsTransfer(e)}> Wholesaler </button>
      <button className="btn btn-outline-primary mt-2" style={{ width: "8rem" }} onClick={(e) => ipfsTransfer(e)}> Distributor</button>
      <button className="btn btn-outline-primary mt-2" style={{ width: "8rem" }} onClick={(e) => ipfsTransfer(e)}> Retailer</button>
      <button className="btn btn-outline-primary mt-2" style={{ width: "8rem" }} onClick={(e) => ipfsTransfer(e)}> Logistics</button>

      <FarmerForm />
    </div >
  );
};

export default Registration;
