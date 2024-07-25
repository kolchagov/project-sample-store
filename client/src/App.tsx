import './App.css'
import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react'

import UserService from './services/UserService';
import CategoryService from './services/CategoryService';
import User from './model/User';

import UserContext from './contexts/UserContext';
import CategoryContext from './contexts/CategoryContext';

import Navbar from './components/navigation/navbar/Navbar'
import Categories from './components/navigation/categories/Categories';
import Home from './components/home/Home'
import About from './components/about/About'
import Login from './components/user/Login';
import Logout from './components/user/Logout';
import RegisterUser from './components/user/register-user/RegisterUser';
import EditUser from './components/user/edit-user/EditUser';
import UserTable from './components/user/user-table/UserTable';
import CategoryTable from './components/categories/category-table/CategoryTable';
import EditCategory from './components/categories/edit-category/EditCategory';
import CreateCategory from './components/categories/create-category/CreateCategory';

function App() {
  const [user, setUser] = useState(new User());
  const [categoryMap, setCategoryMap] = useState({})
  const uuid = document.body.dataset.projectId as string
  let myAccount = `/edit-user/${user._id}`

  useEffect(() => {
    CategoryService.getCategoryMap().then(categories => {
      setCategoryMap(() => categories)
      // console.log("debug me", categories);
    })
    const userJson = localStorage.getItem(`${uuid}/user`)
    if (userJson) {
      const loggedInUser = JSON.parse(userJson);
      setUser(() => loggedInUser)
      UserService.loggedinUser = loggedInUser
      // console.log("debug me", loggedInUser);
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
              <Route path='/login' element={<Login />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='/register-user' element={<RegisterUser />} />
              <Route path='/edit-user/:userId' element={<EditUser />} />
              <Route path='/account' element={<Navigate to={myAccount} />} />
              <Route path='/users' element={<UserTable />} />
              <Route path='/categories' element={<CategoryTable />} />
              <Route path='/edit-category/:categoryId' element={<EditCategory />} />
              <Route path='/add-category' element={<CreateCategory />} />
            </Routes>
          </div>
        </CategoryContext.Provider>
      </UserContext.Provider >
    </>
  )
}

export default App
