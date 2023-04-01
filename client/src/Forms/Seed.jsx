import React, { useEffect, useState } from 'react'
import { create } from 'ipfs-http-client'
import Web3 from 'web3';
import { CropSupplyChain } from '../CropSupplyChain';
import Constants from '../Constants';


// struct Farmer{
//     string name;
//     string location;
//     uint field_length; //(in acres)
//     uint field_breadth; //(in acres)
//     //ipfs hash address of the details of the seed bought
//     address seed_bought;
//     uint seed_quantity_bought; //(in appropriate units);
// }
//
const web3 = new Web3(Web3.givenProvider);
const contractAddress = Constants.contractAddress;
const cropSupplyChainContract = new web3.eth.Contract(CropSupplyChain, contractAddress);


const SeedForm = () => {
  let [name, setName] = useState('');
  let [location, setLocation] = useState('');
  let [seedAddress, setSeedAddress] = useState('');
  let [fieldLength, setFieldLength] = useState(0);
  let [fieldBreadth, setFieldBreadth] = useState(0);
  let [seedQuantity, setSeedQuantity] = useState(0);
  let [account, setAccount] = useState('');
  let [farmerList, setFarmerList] = useState([]);

  useEffect(() => {
    async function getMetaMaskAccount() {
      const accounts = await window.ethereum.request(
        { method: "eth_requestAccounts" }
      );
      console.log(accounts);
      setAccount(accounts[0]);
    }

    getMetaMaskAccount();
    getAllFarmerHashes();
  }, []);

  async function getAllFarmerHashes() {
    const post = await cropSupplyChainContract.methods.get_seeds().call({});
    const list = post.map((item, index) => {
      return <li className='list-group-item' key={index}> {item}</li>
    });
    console.log(`Seed List: ${post}`)
    setFarmerList(list);
    // const post = await cropSupplyChainContract.methods.farmers(0).call({});
    // console.log(post);
  }

  async function registerFarmer(event) {
    event.preventDefault();
    const farmer = {
      name,
      location,
      fieldLength: parseInt(fieldLength),
      fieldBreadth: parseInt(fieldBreadth),
      seedAddress,
      seedQuantity: parseInt(seedQuantity),
      seedCertificationTestResults: {},
    }

    let ipfs = create("http://localhost:5001");
    let result = await ipfs.add(JSON.stringify(farmer));
    console.log(result.path);

    const gas = await cropSupplyChainContract.methods.register(result.path, "Seed").estimateGas();
    console.log(`ESTIMATED GAS: ${gas}`);
    const post = await cropSupplyChainContract.methods.register(result.path, "Seed").send({
      from: account,
      gas,
    });
    console.log(post)
    getAllFarmerHashes();
  }

  return (
    < div className="container d-flex flex-row" style={{ height: "100vh" }}>
      <form className='mr-5' style={{ width: "20rem" }}>
        <div class="form-group mt-5">
          <label for='name'> Name </label>
          <input type="text" id='name' className='form-control' placeholder='Enter name' onChange={(e) => setName(e.target.value)} />
        </div>
        <div class="form-group">
          <label for='location'> Location </label>
          <input type="text" id='location' className='form-control' placeholder='Enter location' onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div class="form-group">
          <label for='field_length'> Field Length</label>
          <input type="number" id='field_length' className='form-control' placeholder='Enter field length' onChange={(e) => setFieldLength(e.target.value)} />
        </div>
        <div class="form-group">
          <label for='field_breadth'> Field Breadth </label>
          <input type="number" id='field_breadth' className='form-control' placeholder='Enter field breadth' onChange={(e) => setFieldBreadth(e.target.value)} />
        </div>
        <div class="form-group">
          <label for='seed_address'> Seed Address</label>
          <input type="text" id='seed_address' className='form-control' placeholder='Enter seed address' onChange={(e) => setSeedAddress(e.target.value)} />
        </div>
        <div class="form-group">
          <label for='seed_quantity'> Seed quantity</label>
          <input type="number" id='seed_quantity' className='form-control' placeholder='Enter seed quantity' onChange={(e) => setSeedQuantity(e.target.value)} />
        </div>

        <button type="submit" class="btn btn-primary" onClick={(e) => registerFarmer(e)}>Submit</button>
      </form>
      <div>
        <h2 className='h2 mt-5'>Registered Seeds Hash List</h2>
        <ul className='list-group'>{farmerList}</ul>
      </div>
    </div>
  );
}

export default SeedForm;
