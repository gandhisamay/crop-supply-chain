import { useNavigate } from 'react-router-dom'

const MetaMaskLogin = () => {
  const navigate = useNavigate();

  async function metamaskLogin(event) {
    event.preventDefault();
    if (window.ethereum?.isMetaMask) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      }); console.log(accounts);

      navigate('/')
    }
  }


  return (
    <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh", width: "100vw" }}>
      <button className='btn btn-primary' onClick={(e) => metamaskLogin(e)} style={{
      }}>MetaMask Login</button>
    </div>
  )
}

export default MetaMaskLogin;
