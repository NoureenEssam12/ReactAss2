import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import Cart from '../Components/Cart/Cart';

export const CartContext=createContext();

export default function CartContextProvider({children}) {

const token=localStorage.getItem('token');
const headers={
    token
}

 function getUserCart(){
   return axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
        headers
    })
    .then(data=>data)//lw e7na 7lween hy3ml return ll data
    .catch(err=>err) //lw e7na w7shen yb2a wsl error
 }

// el post lazem body
 function addItemToCart(pId){
    return axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
        productId:pId
    },{
         headers
     })
     .then(data=>data)//lw e7na 7lween hy3ml return ll data
     .catch(err=>err) //lw e7na w7shen yb2a wsl error
  }


  function updateCountItem(id,count){
    return axios.put('https://ecommerce.routemisr.com/api/v1/cart/'+id,{
        count:count
    },{
         headers
     })
     .then(data=>data)//lw e7na 7lween hy3ml return ll data
     .catch(err=>err) //lw e7na w7shen yb2a wsl error
  }


  function deleteItem(id){
    return axios.delete('https://ecommerce.routemisr.com/api/v1/cart/'+id,
       {
         headers
     })
     .then(data=>data)//lw e7na 7lween hy3ml return ll data
     .catch(err=>err) //lw e7na w7shen yb2a wsl error
  }
 

  
  function clearCart(){
    return axios.delete('https://ecommerce.routemisr.com/api/v1/cart/',
       {
         headers
     })
     .then(data=>data)//lw e7na 7lween hy3ml return ll data
     .catch(err=>err) //lw e7na w7shen yb2a wsl error
  }









function CheckOutSession(cartId,shippingAddress){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://http://localhost:5173`,{
        "shippingAddress":shippingAddress
    },{
        headers
    })

    .then(data=>data)
    .catch(err=>err)
}

 
 //3yza y3rd el icon bta3t el cart mn awl el mounting fh3ml use effect w fn btnadi 3la getUserCart
 const [cartItems, setCartItems] = useState(0);
 async function getCart(){
    const response=await  getUserCart();
    if(response.data.status=="success"){
        setCartItems(response.data.numOfCartItems)

    }
  }
 useEffect(()=>{
   getCart()
  },[])



return <CartContext.Provider value={{getUserCart,addItemToCart,updateCountItem,deleteItem,cartItems,clearCart,setCartItems,CheckOutSession}}>
    {children}
</CartContext.Provider>


}
