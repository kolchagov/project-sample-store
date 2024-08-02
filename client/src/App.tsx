import './App.css'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';

import AuthContextProvider from './contexts/AuthContextProvider';
import { CategoryConextProvider } from './contexts/CategoryContext';
import useAccount from './hooks/useAccount';

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
import ProductTable from './components/products/product-table/ProductTable';
import EditProduct from './components/products/edit-product/EditProduct';

function App() {
  const { user } = useAccount()

  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <CategoryConextProvider>
          <Categories />
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={<Login />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='/register-user' element={<RegisterUser />} />
              <Route path='/edit-user/:userId' element={<EditUser />} />
              <Route path='/account' element={<Navigate to={`/edit-user/${user._id}`} />} />
              <Route path='/users' element={<UserTable />} />
              <Route path='/categories' element={<CategoryTable />} />
              <Route path='/edit-category/:categoryId' element={<EditCategory />} />
              <Route path='/add-category' element={<CreateCategory />} />
              <Route path='/catalog' element={<ProductTable />} />
              <Route path='/edit-product/:productId' element={<EditProduct />} />
            </Routes>
          </div>
        </CategoryConextProvider>
      </AuthContextProvider>
    </>
  )
}

export default App
