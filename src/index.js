import React from 'react';
import ReactDOM from 'react-dom';
import Registration from "./Registration";
import { Router } from 'react-router-dom';
import FarmerForm from './Forms/Farmer';
// import './Styles/index.css';

const App = () => {
  return (
    <div className='container mt-4'>
      <FarmerForm />
    </div>
  );
}

// ReactDOM.render(<Router> <App /> </Router>, document.querySelector('#root'));
ReactDOM.render(<App />, document.querySelector('#root'));
