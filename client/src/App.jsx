import { BrowserRouter, Routes, Router, Route } from "react-router-dom";
import MetaMaskLogin from "./MetaMaskLogin";
import Registration from "./Registration";
import Forms from './Forms';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<MetaMaskLogin />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/deregister" element={<Registration />} />
        <Route path="/register/farmer" element={<Forms.FarmerForm />} />
        <Route path="/register/seedproducer" element={<Forms.SeedProducerForm />} />
        <Route path="/register/governmentcertificationagency" element={<Forms.GovernmentCertificationAgencyForm />} />
        <Route path="/register/wholesaler" element={<Forms.FarmerForm />} />
        <Route path="/register/distributor" element={<Forms.FarmerForm />} />
        <Route path="/register/retailer" element={<Forms.FarmerForm />} />
        <Route path="/register/logistics" element={<Forms.FarmerForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
