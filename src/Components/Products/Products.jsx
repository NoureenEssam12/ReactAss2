import React, { useState } from 'react';
import Style from "./Products.module.css";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../Loading/Loading';
import ProductItem from '../ProductItem/ProductItem';
import useProducts from '../../Hooks/useProducts';

export default function Products() {
    const { data: products, isLoading, error, isError } = useProducts();
    const [searchQuery, setSearchQuery] = useState('');

    if (isLoading) {
        return <Loading />;
    }
    if (isError) {
        return <h3>{JSON.stringify(error)}</h3>;
    }

    // Filter products based on the search query
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="mb-5 mt-32">
                <label htmlFor="search" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    type="text"
                    id="search"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-300 focus:border-cyan-300 block w-2/3 mx-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search..."
                    required
                />
            </div>
            <div className='grid mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((p) => (
                        <ProductItem key={p._id} Products={p} />
                    ))
                ) : (
                    <p className="text-center col-span-full">No products found.</p>
                )}
            </div>
        </>
    );
}
