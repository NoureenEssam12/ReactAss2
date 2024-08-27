import React, { useState, useEffect, useContext } from 'react';
import { Table } from 'flowbite-react';
import { WishListContext } from '../../Context/WishListContext';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';
import { CartContext } from '../../Context/CartContext';

export default function Wishlist() {
    const { getWishlist, removeFromWishlist } = useContext(WishListContext);
    const [wishlistDetails, setWishlistDetails] = useState([]);
    const { addItemToCart, setCartItems } = useContext(CartContext);

    useEffect(() => {
        async function fetchWishlist() {
            try {
                const response = await getWishlist();
                if (response.data.status === "success") {
                    setWishlistDetails(response.data.data);
                } else {
                    toast.error("Failed to fetch wishlist");
                }
            } catch (error) {
                console.error("Error fetching wishlist:", error);
            }
        }
        fetchWishlist();
    }, [getWishlist]);

    async function handleDeleteItem(id) {
        try {
            const response = await removeFromWishlist(id);
            if (response.data.status === "success") {
                setWishlistDetails(prev => prev.filter(item => item._id !== id));
            } else {
                toast.error("Failed to delete item");
            }
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    }

    async function addItem(id) {
        try {
            const response = await addItemToCart(id);
            if (response.data.status === "success") {
                setCartItems(response.data.numOfCartItems);
                toast.success("Added to cart", {
                    duration: 1000,
                    style: { backgroundColor: "green", color: "white" },
                });
                handleDeleteItem(id);
            }
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    }

    return (
        <div className='container w-5/6 mx-auto mt-10'>
            <div className="relative overflow-x-auto bg-gray-50 shadow-md sm:rounded-lg dark:bg-gray-800">
                <p className='text-4xl m-6'>My Wishlist</p>
                <table className="w-full text-sm text-left rtl:text-right dark:text-gray-400">
                    <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-16 py-3">
                                <span className="sr-only">Image</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {wishlistDetails.map((item) => (
                            <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="p-4">
                                    <img src={item?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={item?.title} />
                                </td>
                                <td className="px-6 py-4 text-gray-900 dark:text-white">
                                    <p className='text-2xl'>{item?.title}</p> 
                                    <p className='text-lg text-green-600'>{item.price} EGY</p>
                                    <p
                                        onClick={() => handleDeleteItem(item._id)}
                                        className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline mt-3"
                                    >
                                        <FaTrash className='inline-block text-red-500 mb-1' /> Remove
                                    </p>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => addItem(item._id)} 
                                        className='dark:text-gray-400 border border-green-500 mt-4 rounded-lg py-2 px-2 text-xl text-black mb-4 mx-auto'
                                    >
                                        Add to Cart
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
