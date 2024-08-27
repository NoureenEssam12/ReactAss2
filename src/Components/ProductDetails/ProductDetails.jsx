import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { FaHeart, FaPlus, FaStar } from 'react-icons/fa';
import Loading from '../Loading/Loading';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import Slider from 'react-slick'; 
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { WishListContext } from '../../Context/WishListContext';

export default function ProductDetails() {
    const { addItemToCart, setCartItems } = useContext(CartContext);
    const { id } = useParams();  // Get the product ID from URL parameters
    const { addToWishlist, removeFromWishlist, getWishlist } = useContext(WishListContext);
    const [isInWishlist, setIsInWishlist] = useState(false);

    // Fetch product details
    const { isLoading, isError, error, data: productDetails } = useQuery({
        queryKey: ['productDetails', id],
        queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`),
        select: (data) => data.data.data,
    });

    // Add item to cart
    async function addItem(id) {
        const response = await addItemToCart(id);
        console.log(response);
        if (response.data.status === "success") {
            setCartItems(response.data.numOfCartItems);
            toast.success("Added to cart", {
                duration: 1000,
                style: { backgroundColor: "green", color: "white" },
            });
        }
    }

    // Check if product is in wishlist
    useEffect(() => {
        async function checkWishlist() {
            try {
                const response = await getWishlist();
                // Check if product is in the wishlist
                setIsInWishlist(response.data.data.some(item => item._id === id));
            } catch (error) {
                console.error("Error checking wishlist:", error);
            }
        }
        checkWishlist();
    }, [id, getWishlist]);

    // Handle wishlist actions
    async function handleWishlist() {
        try {
            if (isInWishlist) {
                await removeFromWishlist(id);
                setIsInWishlist(false);
                toast.success("Removed from wishlist", {
                    duration: 1000,
                    style: { backgroundColor: "red", color: "white" },
                });
            } else {
                await addToWishlist(id);
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

    // Slick Slider settings
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className='grid gap-4 sm:grid-cols-12 relative'>
            <div className='col-span-4 py-2'>
                {productDetails.images.length > 0 && (
                    <Slider {...sliderSettings}>
                        {productDetails.images.map((image, index) => (
                            <div key={index}>
                                <img src={image} alt={`Product image ${index + 1}`} className='w-full' />
                            </div>
                        ))}
                    </Slider>
                )}
            </div>
            <div className='col-span-8 self-center'>
                <h2 className='text-xl font-semibold'>{productDetails.title}</h2>
                <p className='my-3 font-light'>{productDetails.description}</p>
                <h3 className='mb-2 text-lg font-semibold'>{productDetails.category.name}</h3>
                <div className='flex mb-3 justify-between'>
                    <p>{productDetails.price} EGY</p>
                    <p>{productDetails.ratingsAverage} <FaStar className="text-yellow-400 inline-block mb-1 ms-1" /></p>
                </div>
                <button onClick={handleWishlist} className='absolute end-5 text-2xl'>
                    <FaHeart className={`transition-colors duration-300 ${isInWishlist ? 'text-red-600' : 'text-gray-500'}`} />
                </button>
                <button onClick={() => addItem(productDetails.id)} className='w-3/5 bg-green-500 py-2 text-white rounded-lg ms-20 mt-3'>
                    <FaPlus className='inline-block text-sm mb-1 me-1' /> Add
                </button>
            </div>
        </div>
    );
}
