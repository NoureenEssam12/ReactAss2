import { useContext, useRef, useState } from 'react'
import React from 'react'
import logo from "../../assets/images/freshcart-logo.svg"
import Style from "./Navbar.module.css"
import { useEffect } from 'react'
import { FaFacebook, FaLinkedinIn, FaShoppingBasket, FaShoppingCart, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'
export default function () {
 const {cartItems}= useContext(CartContext)
const {token,setToken}= useContext(UserContext)
const navigate=useNavigate();
function logOut(){
  setToken(null);
  navigate('/login')
}



    return (
        <div>
  
<nav className=" bg-gray-50 border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl gap-4 flex flex-wrap items-center mx-auto p-4">
    <a className="flex items-center  space-x-3 rtl:space-x-reverse">
<p className='text-3xl '><FaShoppingCart className='inline-block mb-1 text-green-600'/> fresh cart</p>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" className="ms-auto inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
      </svg>
    </button>
    <div className="hidden w-full grow  lg:flex justify-evenly lg:w-auto " id="navbar-default">
      <ul className="font-medium flex items-center   flex-col p-4 lg:p-0 mt-4 border  border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700 ">
       
       {token&&(<>
        <li>
          <Link to="" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Home</Link>
        </li>  
        <li>
          <Link to="cart" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Cart</Link>
        </li>
        <li>
          <Link to="wishlist" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">wishlist</Link>
        </li>
       
        <li>
          <Link to="products" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Products</Link>
        </li>
        <li>
          <Link to="Categories" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Categories</Link>
        </li>
        <li>
          <Link to="brands" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Brands</Link>
        </li>
       
       
       </>)}
      </ul>
      <ul className="font-medium flex items-center  flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
     {!token && (<> <li>
      <Link to="register" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">register</Link>

        </li>  
        <li>
        <Link to="login" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">log in</Link>
        </li></>)}
      

       {token&&(<>
        <li>
          <Link to={'cart'}  className="block relative py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent cursor-pointer"><FaShoppingCart className='text-3xl text-gray-600'/>
          <span className='absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 text-white bg-green-600 rounded-md pr-2 pl-2 pt-0.5 pb-0.5 font-semibold '> {cartItems}</span>
           
          </Link>
        </li></>)}
        {token &&  ( 
          <li onClick={logOut}>
          <span  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent cursor-pointer">log out
           
          </span>
        </li>)}


        <li>
               <ToggleMode/>
        </li> 
         
     
      </ul>
    </div>
  </div>
</nav>
   </div>

    )
 
    function ToggleMode() {
      const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem('color-theme') === 'dark' || 
        (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    
      useEffect(() => {
        document.querySelector("html").classList.toggle("dark", isDarkMode);
        localStorage.setItem('color-theme', isDarkMode ? 'dark' : 'light');
      }, [isDarkMode]);
    
      return (
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)} 
          id="theme-toggle" 
          type="button" 
          className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
        >
          {isDarkMode ? (
            <svg id="theme-toggle-dark-icon" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            <svg id="theme-toggle-light-icon" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd" />
            </svg>
          )}
        </button>
      );
    }
    
}