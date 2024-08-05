import './App.css'
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import AuthContextProvider from './contexts/AuthContextProvider';
import { CategoryConextProvider } from './contexts/CategoryContext';
import { ShoppingCartContextProvider } from './contexts/ShoppingCartContext';

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
import CreateProduct from './components/products/create-product/CreateProduct';
import AdminGuard from './components/common/AdminGuard';
import PrivateGuard from './components/common/PrivateGuard';
import ShoppingCart from './components/shopping-cart/ShoppingCart';
import EditAccount from './components/user/edit-account/EditAccount';

function App() {
  return (
    <>
      <ShoppingCartContextProvider>
        <AuthContextProvider>
          <Navbar />
          <CategoryConextProvider>
            <Categories />
            <div className='container'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register-user' element={<RegisterUser />} />
                <Route path='/catalog' element={<ProductTable />} />
                <Route path='/cart' element={<ShoppingCart />} />
                <Route element={<PrivateGuard />}>
                  <Route path='/account' element={<EditAccount />} />
                  <Route path='/logout' element={<Logout />} />
                  <Route path='/edit-user/:userId' element={<EditUser />} />
                </Route>
                <Route element={<AdminGuard />}>
                  <Route path='/users' element={<UserTable />} />
                  <Route path='/categories' element={<CategoryTable />} />
                  <Route path='/edit-category/:categoryId' element={<EditCategory />} />
                  <Route path='/add-category' element={<CreateCategory />} />
                  <Route path='/create-product' element={<CreateProduct />} />
                  <Route path='/edit-product/:productId' element={<EditProduct />} />
                </Route>
              </Routes>
            </div>
          </CategoryConextProvider>
        </AuthContextProvider>
      </ShoppingCartContextProvider>
    </>
  )
}

export default App
