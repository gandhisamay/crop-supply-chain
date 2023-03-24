import React, { useState } from 'react'
import { create } from 'ipfs-http-client'


// struct Farmer{
//     string name;
//     string location;
//     uint field_length; //(in acres)
//     uint field_breadth; //(in acres)
//     //ipfs hash address of the details of the seed bought
//     address seed_bought;
//     uint seed_quantity_bought; //(in appropriate units);
// }

const FarmerForm = () => {
  let [name, setName] = useState('');
  let [location, setLocation] = useState('');
  let [seedAddress, setSeedAddress] = useState('');
  let [fieldLength, setFieldLength] = useState(0);
  let [fieldBreadth, setFieldBreadth] = useState(0);
  let [seedQuantity, setSeedQuantity] = useState(0);
  let [json, setJson] = useState({});

  async function convertAsyncIterableToString(asyncIterable) {
    const decoder = new TextDecoder();
    let result = '';
    for await (const chunk of asyncIterable) {
      result += decoder.decode(chunk, { stream: true });
    }
    result += decoder.decode();
    return result;
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
    }

    let ipfs = create("http://localhost:5001");
    let result = await ipfs.add(JSON.stringify(farmer));
    console.log(result.path);
    let res = await convertAsyncIterableToString(ipfs.cat(result.path));
    console.log(res);
    setJson(res);
  }

  return (
    <div>
      <form>
        <div class="form-group">
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
        <pre className='mt-4'>
          {JSON.stringify(json, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default FarmerForm;
