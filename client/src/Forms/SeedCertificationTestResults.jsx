import { create } from "ipfs-http-client";
import { useState } from "react"
import Web3 from 'web3';
import Functions from "../Functions";
import { CropSupplyChain } from '../CropSupplyChain';
import Constants from "../Constants";

const web3 = new Web3(Web3.givenProvider);
const cropSupplyChainContract = new web3.eth.Contract(CropSupplyChain, Constants.contractAddress);

const SeedCertificatonTestResults = () => {

  //enter your seed address 
  let [seedAddress, setSeedAddress] = useState('');
  let [account, setAccount] = useState('');
  let [isValid, setIsValid] = useState(true);
  let [testType, setTestType] = useState('');
  let [testResults, setTestResults] = useState('NULL');


  //we may need to check whether the seed is valid or not.


  async function enterTestResults(event) {
    event.preventDefault();
    //once we know that the seed is valid we can go further to add the test results.
    const accounts = await window.ethereum.request(
      { method: "eth_requestAccounts" }
    );

    setAccount(accounts[0]);

    let isValidTemp = await cropSupplyChainContract.methods.is_object_valid(seedAddress, "Seed").call({});
    console.log(`ADDRESS VALID : ${isValidTemp}`);
    setIsValid(isValidTemp);


    //lmao ded
    //
    if (isValidTemp) {
      let ipfs = create("http://localhost:5001");
      let content = ipfs.cat(seedAddress);
      let data = await Functions.convertAsyncIterableToString(content);
      console.log(data);
      data = JSON.parse(data);

      data['seedCertificatonTestResults'] = { ...data['seedCertificatonTestResults'], testType: testResults };
      console.log(data);

      let update = await ipfs.add(JSON.stringify(data));

      console.log(update.path);

      let gas = await cropSupplyChainContract.methods.register(update.path, "Seed").estimateGas();
      console.log(`ESTIMATED GAS: ${gas}`);
      let post = await cropSupplyChainContract.methods.register(update.path, "Seed").send({
        from: account,
        gas,
      });
      console.log(post)

      gas = await cropSupplyChainContract.methods.deregister(seedAddress, "Seed").estimateGas();
      console.log(`ESTIMATED GAS: ${gas}`);
      post = await cropSupplyChainContract.methods.deregister(seedAddress, "Seed").send({
        from: account,
        gas,
      });
      console.log(post)
      //data convert hogaya na ab uske result.
    }
    else {
      console.log("THE ENTERED SEED HASH IS INVALID");
    }
  }

  return (
    <div className="container d-flex flex-column align-items-start" style={{ height: "100vh" }}>
      <h1 className="h3 mt-5">Seed Certification Test Results</h1>
      <form className="form-group">
        <input className={isValid ? "form-control" : "form-control is-invalid"} placeholder="Enter seed hash" style={{ width: "30rem" }} onChange={(e) => setSeedAddress(e.target.value)} />
        <div className="invalid-feedback">Please enter a valid seed hash</div>
        <div class="dropdown">
          <button class="btn btn-primary dropdown-toggle mt-4" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onChange={(e) => setTestType(e.target.value)}>
            Select Certification Test Type
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#">Evaluation Of Origin</a>
            <a class="dropdown-item" href="#">Field Inspectiion</a>
            <a class="dropdown-item" href="#">Sample Inspection</a>
            <a class="dropdown-item" href="#">Bulk Inspection</a>
            <a class="dropdown-item" href="#">Control Plot Testing</a>
            <a class="dropdown-item" href="#">Grow out test</a>
          </div>
        </div>

        <label for='test_result' className="h4 mt-4"> Test Result</label>
        <input type="text" id='test_result' className={testResults.length == 0 ? "form-control is-invalid" : "form-control"} style={{ width: "30rem" }} placeholder='Enter test results' onChange={(e) => setTestResults(e.target.value)} required />
        <div className="invalid-feedback">Please enter the test results!</div>
        <button type="submit" class="btn btn-primary mt-3" onClick={(e) => enterTestResults(e)}>Submit</button>
      </form>
    </div>
  );
}

export default SeedCertificatonTestResults;
