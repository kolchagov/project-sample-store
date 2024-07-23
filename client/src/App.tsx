import './App.css'
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react'

import CategoryService from './services/CategoryService';

import Navbar from './components/navigation/navbar/Navbar'
import Categories from './components/navigation/categories/Categories';
import Home from './components/home/Home'
import About from './components/about/About'
import Login from './components/user/Login';
import RegisterUser from './components/user/RegisterUser';
import Logout from './components/user/Logout';
import CategoryContext from './contexts/CategoryContext';
import User from './model/User';
import UserContext from './contexts/UserContext';
import UserService from './services/UserService';

function App() {
  const [user, setUser] = useState(new User());
  const [categoryMap, setCategoryMap] = useState({})
  const uuid = document.body.dataset.projectId as string

  useEffect(() => {
    CategoryService.getCategoryMap().then(categories => {
      setCategoryMap(() => categories)
      console.log("debug me", categories);

    })
    const userJson = localStorage.getItem(`${uuid}/user`)
    if (userJson) {
      setUser(() => JSON.parse(userJson))
    }
  }, [])

  async function login(credentials: { email: string, password: string }) {
    const loggedUser = await UserService.login(credentials)
    localStorage.setItem(`${uuid}/user`, JSON.stringify(loggedUser))
    setUser(() => loggedUser)
  }

  async function logout() {
    await UserService.logout();
    setUser(() => new User())
    localStorage.removeItem(`${uuid}/user`)
  }

  return (

    <>
      <UserContext.Provider value={{ user, login, logout }}>
        <Navbar />
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
      </UserContext.Provider >
    </>
  )
}

export default App
