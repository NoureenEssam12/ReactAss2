import React from 'react'
import './App.css';
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react';
import Home from "./Components/Home/Home"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Products from './Components/Products/Products';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Cart from './Components/Cart/Cart';
import LayOut from './Components/LayOut/LayOut';
import NotFound from './Components/NotFound/NotFound';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CartContextProvider from './Context/CartContext';
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import toast,{Toaster} from 'react-hot-toast';
import CheckOut from './Components/CheckOut/CheckOut';
import Allorders from './Components/Allorders/Allorders';
import Wishlist from './Components/wishlist/wishlist';
import WishListContextProvider from './Context/WishListContext';
import ForgotPassword from './Components/forgotpassword/ForgotPassword';
import VerifyResetCode from './Components/VerifyResetCode/VerifyResetCode';
import ResetPassword from './Components/ResetPassword/ResetPassword';

const myClient = new QueryClient();


const x=createBrowserRouter([
{path:"",element:<LayOut/>,children:[
  {index:"true",element:<ProtectedRoute><Home/></ProtectedRoute>},
  {path:"products",element:<ProtectedRoute><Products/></ProtectedRoute>},
  {path:"ProductDetails/:id",element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},//el id dh 3bara 3n mt8yr 3la 7sb el haga eli hdos 3leha hywdeni leha
  {path:"checkout/:cartId",element:<ProtectedRoute><CheckOut/></ProtectedRoute>},
  {path:"allorders",element:<ProtectedRoute><Allorders/></ProtectedRoute>},
  {path:"wishlist",element:<ProtectedRoute><Wishlist/></ProtectedRoute>},
  {path:"ForgotPassword",element:<ForgotPassword/>},
  {path:"VerifyResetCode",element:<VerifyResetCode/>},
  {path:"ResetPassword",element:<ResetPassword/>},

  {path:"Categories",element:<ProtectedRoute><Categories/></ProtectedRoute>},
  {path:"brands",element:<ProtectedRoute><Brands/></ProtectedRoute>},
  {path:"login",element:<Login/>},
  {path:"register",element:<Register/>},
  {path:"cart",element:<ProtectedRoute><Cart/></ProtectedRoute>},
  {path:"*",element:<NotFound/>},

]}
  
])
export default function App() {
  return (
    <div>
      <QueryClientProvider client={myClient}>
        <UserContextProvider>
          <CartContextProvider>
            <WishListContextProvider> 
              <RouterProvider router={x} />
            </WishListContextProvider>
          </CartContextProvider>
        </UserContextProvider>
        <Toaster />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  )
}
