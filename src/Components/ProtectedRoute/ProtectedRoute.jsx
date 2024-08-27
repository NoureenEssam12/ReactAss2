import React, { useContext } from 'react'
import { useState } from 'react'
import Style from "./ProtectedRoute.module.css"
import { useEffect } from 'react'
import { UserContext } from '../../Context/UserContext'
import { Navigate } from 'react-router-dom'
export default function (props) {
  
const {token}=useContext(UserContext)
if(token){
    return props.children
}
else{
    alert('please login first')
   return <Navigate to={'/login'}></Navigate>
}




    
}
