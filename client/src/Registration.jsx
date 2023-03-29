import React, { useEffect } from 'react';
import { Routes, useNavigate, Route } from 'react-router-dom';
import Forms from './Forms';

const Registration = () => {
  const navigate = useNavigate();
  useEffect(() => {
    async function checkIfMetaMaskLoggedIn() {
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });

      console.log("INSIDE USE EFFECT AFTER CHECKING IF THE USER IS LOGGED IN OR NOT");
      console.log(accounts);

      if (accounts.length == 0) {
        navigate('/login');
      }
    }

    checkIfMetaMaskLoggedIn();
  });


  return (
    < div className="container d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
      <h1 className="h1">Registration Page</h1>
      <button className="btn btn-outline-primary mt-2" style={{ width: "8rem" }} onClick={() => navigate('/register/seedproducer')}>Seed Producer</button>
      <button className="btn btn-outline-primary mt-2" style={{ width: "18rem" }} onClick={() => navigate('/register/governmentcertificationagency')}>Government Certification Agency</button>
      <button className="btn btn-outline-primary mt-2" style={{ width: "8rem" }} onClick={() => navigate('/register/farmer')}>Farmer </button>
      <button className="btn btn-outline-primary mt-2" style={{ width: "8rem" }} onClick={() => navigate('/register/wholesaler')}>Wholesaler </button>
      <button className="btn btn-outline-primary mt-2" style={{ width: "8rem" }} onClick={() => navigate('/register/distributor')}>Distributor</button>
      <button className="btn btn-outline-primary mt-2" style={{ width: "8rem" }} onClick={() => navigate('/register/retailer')}>Retailer</button>
      <button className="btn btn-outline-primary mt-2" style={{ width: "8rem" }} onClick={() => navigate('/register/logistics')}>Logistics</button>
      <button className="btn btn-outline-primary mt-2" style={{ width: "8rem" }} onClick={() => navigate('/register/seed')}>Seed</button>
    </div >
  );
};

export default Registration;
