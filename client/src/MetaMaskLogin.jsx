import react from 'react'
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
    <div>
      <button className='btn btn-primary' onClick={(e) => metamaskLogin(e)}>MetaMask Login</button>
    </div>
  )
}

export default MetaMaskLogin;
