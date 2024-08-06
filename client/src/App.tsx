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
import LoggedUserGuard from './components/common/LoggedUserGuard';
import ShoppingCart from './components/shopping-cart/ShoppingCart';
import EditAccount from './components/user/edit-account/EditAccount';
import Checkout from './components/checkout/Checkout';
import NotFound from './components/not-found/NotFound';
import Comments from './components/comments/Comments';
import AddComment from './components/comments/add-comment/AddComment';
import EditComment from './components/comments/edit-comment/EditComment';

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
                <Route path='/category/:categoryId' element={<Home />} />
                <Route path='/comments/:productId' element={<Comments />} />
                <Route path='/about' element={<About />} />
                <Route path='/catalog' element={<ProductTable />} />
                <Route path='/cart' element={<ShoppingCart />} />
                <Route path='/logout' element={<Logout />} />
                <Route element={<LoggedUserGuard />}>
                  <Route path='/login' element={<Login />} />
                  <Route path='/register-user' element={<RegisterUser />} />
                </Route>
                <Route element={<PrivateGuard />}>
                  <Route path='/account' element={<EditAccount />} />
                  <Route path='/edit-user/:userId' element={<EditUser />} />
                  <Route path='/checkout' element={<Checkout />} />
                  <Route path='/add-comment/:productId' element={<AddComment />} />
                  <Route path='/edit-comment/:productId/:commentId' element={<EditComment />} />
                </Route>
                <Route element={<AdminGuard />}>
                  <Route path='/users' element={<UserTable />} />
                  <Route path='/categories' element={<CategoryTable />} />
                  <Route path='/edit-category/:categoryId' element={<EditCategory />} />
                  <Route path='/add-category' element={<CreateCategory />} />
                  <Route path='/create-product' element={<CreateProduct />} />
                  <Route path='/edit-product/:productId' element={<EditProduct />} />
                </Route>
                <Route path='*' element={<NotFound />} />
              </Routes>
            </div>
          </CategoryConextProvider>
        </AuthContextProvider>
      </ShoppingCartContextProvider>
    </>
  )
}

export default App
