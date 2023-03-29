import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
      <h1 className="h3">Crop Supply Chain Management</h1>
      <button className="btn btn-primary mt-2" onClick={() => navigate('/register')}>Registration Portal</button>
      <button className="btn btn-primary mt-2" onClick={() => navigate('/seedcertificationportal')}>Seed Certification Portal</button>
    </div>
  );
}

export default Home;
