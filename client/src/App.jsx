import { BrowserRouter, Routes, Route } from "react-router-dom";
import MetaMaskLogin from "./MetaMaskLogin";
import Registration from "./Registration";
import Forms from './Forms';
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<MetaMaskLogin />} />
        <Route path="/seedcertificationportal" element={< Forms.SeedCertificatonTestResults />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/register/farmer" element={<Forms.FarmerForm />} />
        <Route path="/register/seedproducer" element={<Forms.SeedProducerForm />} />
        <Route path="/register/governmentcertificationagency" element={<Forms.GovernmentCertificationAgencyForm />} />
        <Route path="/register/wholesaler" element={<Forms.FarmerForm />} />
        <Route path="/register/distributor" element={<Forms.FarmerForm />} />
        <Route path="/register/retailer" element={<Forms.FarmerForm />} />
        <Route path="/register/logistics" element={<Forms.FarmerForm />} />
        <Route path="/register/seed" element={<Forms.SeedForm />} />
        <Route path="/deregister" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
