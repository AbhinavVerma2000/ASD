import React from 'react';
import './App.css';
import Counter from './components/Counter';
import Userdata from './components/Userdata';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="">
      <BrowserRouter>
      <div className=''>
          <ul className='list flex justify-evenly'>
            <li>
              <Link className='decoration-none' to="/">UserData</Link>
            </li>
            <li>
              <Link className='decoration-none' to="/counter">Counter</Link>
            </li>
          </ul>
        </div>
      <Routes>
        <Route path="/" element={<Userdata />} />
        <Route path="/counter" element={<Counter />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;