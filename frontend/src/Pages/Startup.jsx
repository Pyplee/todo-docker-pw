import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Components/Header';
import Information from '../Components/Information';
import About from '../Components/About';

const Startup = () => {
  return(
  <>
    <Header />
    <Information />
    <div className='gradient'></div>
    <About />
  </>
  );
}

export default Startup;
