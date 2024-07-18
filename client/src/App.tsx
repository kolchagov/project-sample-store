import './App.css'
import React from 'react'
import { useState } from 'react'
import Navbar from './components/navigation/navbar/Navbar'
import Categories from './components/navigation/categories/Categories';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Home'
import About from './components/about/About'
import Login from './components/user/Login';
import RegisterUser from './components/user/RegisterUser';

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <Navbar />
      <Categories />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/register' element={<RegisterUser />} />
          <Route path='/login' element={<Login />} />
          {/* <Route path='/contact' element={<ContactForm />} /> */}

        </Routes>
      </div>
    </>
  )
}

export default App
