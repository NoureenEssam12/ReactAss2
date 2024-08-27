import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaPlus, FaStar } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';

export default function ProductItem({ Products }) {
    const { addItemToCart, setCartItems } = useContext(CartContext);
    const { addToWishlist, removeFromWishlist, getWishlist } = useContext(WishListContext);
    const [isInWishlist, setIsInWishlist] = useState(false);

    useEffect(() => {
        async function checkWishlist() {
            try {
                const response = await getWishlist();
                setIsInWishlist(response.data.data.some(item => item._id === Products._id));
            } catch (error) {
                console.error("Error checking wishlist:", error);
            }
        }
        checkWishlist();
    }, [Products._id, getWishlist]);

    async function handleWishlist() {
        try {
            if (isInWishlist) {
                await removeFromWishlist(Products._id);
                setIsInWishlist(false);
                toast.success("Removed from wishlist", {
                    duration: 1000,
                    style: { backgroundColor: "red", color: "white" },
                });
            } else {
                await addToWishlist(Products._id);
                setIsInWishlist(true);
                toast.success("Added to wishlist", {
                    duration: 1000,
                    style: { backgroundColor: "green", color: "white" },
                });
            }
        } catch (error) {
            console.error("Error updating wishlist:", error);
        }
    }

    async function addItem(id) {
        const response = await addItemToCart(id);
        if (response.data.status === "success") {
            setCartItems(response.data.numOfCartItems);
            toast.success("Added to cart", {
                duration: 1000,
                style: { backgroundColor: "green", color: "white" },
            });
        }
    }

    return (
        <div className='group'>
            <div className="group-hover:border-2 group-hover:border-green-300 group-hover:shadow-lg p-4 m-5 rounded-md relative">
                <Link to={`/ProductDetails/${Products._id}`}>
                    <div>
                        <img src={Products.imageCover} className='w-full object-cover' alt={Products.title} />
                        <p className='text-sm text-green-600 my-2'>{Products.category.name}</p>
                        <h3 className='truncate text-xl font-bold mb-2'>{Products.title.split(' ').slice(0, 2).join(' ')}</h3>
                        <div className='flex justify-between'>
                            <p>{Products.price} EGY</p>
                            <p>{Products.ratingsAverage}<FaStar className="text-yellow-400 inline-block mb-1 ms-1" /></p>
                        </div>
                    </div>
                </Link>
                <button onClick={handleWishlist} className='absolute end-5 text-2xl'>
                    <FaHeart className={`transition-colors duration-300 ${isInWishlist ? 'text-red-600' : 'text-gray-500'}`} />
                </button>
                <button onClick={() => addItem(Products._id)} className='w-full mt-10 group-hover:opacity-100 group-hover:translate-y-0 translate-y-full transition-all duration-500 bg-green-600 text-white py-2 rounded-md opacity-0'>
                    <FaPlus className='inline-block' /> Add
                </button>
            </div>
        </div>
    );
}
