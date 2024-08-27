import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading'; // Ensure Loading component exists

export default function Brands() {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBrand, setSelectedBrand] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false); 

    useEffect(() => {
        async function fetchBrands() {
            try {
                const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
                setBrands(data?.data || []);
            } catch (error) {
                console.error("Error fetching brands:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchBrands();
    }, []);

    const openModal = (brand) => {
        setSelectedBrand(brand);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBrand(null); 
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="m-16">
            <p className='text-center text-green-600 text-5xl mb-10'>All Brands</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9">
                {brands.map(brand => (
                    <div 
                        key={brand._id} 
                        className="w-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition-colors hover:shadow-green-600 cursor-pointer"
                        onClick={() => openModal(brand)} 
                    >
                        <img
                            src={brand.image}
                            alt={brand.name}
                            className="w-full h-64 object-cover rounded-t-lg"
                        />
                        <div className="p-5">
                            <p className="text-lg font-semibold text-center">{brand.name}</p>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && selectedBrand && (
                <div 
                    id="default-modal" 
                    tabIndex="-1" 
                    aria-hidden="true" 
                    className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
                >
                    <div className="relative w-full max-w-2xl bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                      
                            <button 
                                type="button" 
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={closeModal}
                            >
                                <svg 
                                    className="w-3 h-3" 
                                    aria-hidden="true" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 14 14"
                                >
                                    <path 
                                        stroke="currentColor" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth="2" 
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <div className="p-4 flex justify-between">
                            <div className='mt-16'><p className="text-3xl  text-green-600 dark:text-white">
                                {selectedBrand.name}
                            </p>
                            <p className="text-xl  text-gray-900 dark:text-white">
                                {selectedBrand.name}
                            </p></div>
                            <img
                                src={selectedBrand.image}
                                alt={selectedBrand.name}
                                className="w-1/2 h-auto object-cover rounded-lg"
                            />
                        </div>
                        {/* Modal footer */}
                        <div className="flex justify-end p-4 border-t border-gray-200 dark:border-gray-600">
                            <button 
                                type="button" 
                                className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
