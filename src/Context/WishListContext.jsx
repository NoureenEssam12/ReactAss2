import React, { createContext, useState } from 'react';
import axios from 'axios';

export const WishListContext = createContext();

export default function WishListContextProvider({ children }) {
    const token = localStorage.getItem('token');
    const headers = { token };

    async function addToWishlist(pId) {
        return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', { productId: pId }, { headers })
            .then(data => data)
            .catch(err => err);
    }

    async function removeFromWishlist(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers })
            .then(data => data)
            .catch(err => err);
    }

    async function getWishlist() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', { headers })
            .then(data => data)
            .catch(err => err);
    }

    return (
        <WishListContext.Provider value={{ addToWishlist, removeFromWishlist, getWishlist }}>
            {children}
        </WishListContext.Provider>
    );
}
