import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function useProducts() {
    const response=useQuery({
        queryKey:['products'],
        queryFn:()=> axios.get('https://ecommerce.routemisr.com/api/v1/products'),
      select:(data)=> data.data.data ,// el data de eli ht7rk beha
    //   refetchOnMount:true,
    //   refetchOnReconnect:false,
    //   refetchOnWindowFocus:false,
    //   staleTime:20*1000
    
      })
  return response
}
