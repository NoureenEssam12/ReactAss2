import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading'; // Ensure Loading component exists

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCategoryName, setSelectedCategoryName] = useState(''); // Add state for category name
    const [subcategoriesLoading, setSubcategoriesLoading] = useState(false);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
                setCategories(data?.data || []);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchCategories();
    }, []);

    const fetchSubcategories = async (categoryId, categoryName) => {
        setSubcategoriesLoading(true);
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`);
            setSubcategories(data?.data || []);
            setSelectedCategory(categoryId);
            setSelectedCategoryName(categoryName); // Set the category name
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        } finally {
            setSubcategoriesLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="m-10">
         
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-9 ">
                {categories.map(category => (
                    <div key={category._id} className="   hover:shadow-green-600 w-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-64 object-cover rounded-t-lg cursor-pointer"
                            onClick={() => fetchSubcategories(category._id, category.name)} // Pass category name
                        />
                        <div className="p-5">
                            <p className="text-lg font-semibold">{category.name}</p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedCategory && (
                <div className="mt-10">
                    <h3 className="text-2xl font-semibold mb-4 text-center">
                       <span className="text-green-600">{selectedCategoryName} Subcategories </span>
                    </h3>
                    {subcategoriesLoading ? (
                        <Loading />
                    ) : (
                        <div>
                            {subcategories.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {subcategories.map(subcategory => (
                                        <div key={subcategory._id} className="hover:shadow-green-600 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                            <div className="p-5">
                                                <p className="text-2xl text-center font-semibold">{subcategory.name}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No subcategories available.</p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
