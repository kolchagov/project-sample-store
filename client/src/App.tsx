import './App.css'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Navbar from './components/navigation/navbar/Navbar'
import Categories from './components/navigation/categories/Categories';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Home'
import About from './components/about/About'
import Login from './components/user/Login';
import RegisterUser from './components/user/RegisterUser';
import EventService from './services/EventService';
import Logout from './components/user/Logout';

function App() {
  const [login, setLogin] = useState(false)
  const uuid = document.body.dataset.projectId as string

  useEffect(() => {
    const userJson = localStorage.getItem(`${uuid}/user`)
    if (userJson) {
      EventService.publish('login', JSON.parse(userJson))
    }
  }, [])

  EventService.subscribe('login', (user) => {
    setLogin(true)
    localStorage.setItem(`${uuid}/user`, JSON.stringify(user))
  })

  EventService.subscribe('logout', () => {
    setLogin(false)
    localStorage.removeItem(`${uuid}/user`)
  })

  return (
    <>
      <Navbar isLogged={login} />
      <Categories />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/register' element={<RegisterUser />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          {/* <Route path='/contact' element={<ContactForm />} /> */}

        </Routes>
      </div>
    </>
  )
}

export default App
