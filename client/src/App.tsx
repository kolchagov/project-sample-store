import './App.css'
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react'

import CategoryService from './services/CategoryService';
import EventService from './services/EventService';

import Navbar from './components/navigation/navbar/Navbar'
import Categories from './components/navigation/categories/Categories';
import Home from './components/home/Home'
import About from './components/about/About'
import Login from './components/user/Login';
import RegisterUser from './components/user/RegisterUser';
import Logout from './components/user/Logout';
import CategoryContext from './contexts/CategoryContext';

function App() {
  const [login, setLogin] = useState(false)
  const [categoryMap, setCategoryMap] = useState({})
  const uuid = document.body.dataset.projectId as string

  useEffect(() => {
    CategoryService.getCategoryMap().then(categories => {
      setCategoryMap(() => categories)
      console.log("debug me", categories);

    })
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
      <CategoryContext.Provider value={categoryMap}>
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
      </CategoryContext.Provider>
    </>
  )
}

export default App
