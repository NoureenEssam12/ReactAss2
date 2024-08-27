import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';
import CartItem from '../CartItem/CartItem';

export default function Cart() {
  const [cartDetails, setCartDetails] = useState(null);
  const { getUserCart, updateCountItem, deleteItem,cartItems,clearCart } = useContext(CartContext);

  async function getLoggedUserCart() {
    const response = await getUserCart();
    if (response.data.status === "success") {
      setCartDetails(response.data.data);
    }
  }

  async function updateQun(id, count) {
    const response = await updateCountItem(id, count);
    if (response.data.status === "success") {
      setCartDetails(response.data.data);
      toast.success("Updated");
    }
  }

  async function deleteItemFromCart(id) {
    const response = await deleteItem(id);
    if (response.data.status === "success") {
      setCartDetails(response.data.data);
      toast.success("Deleted");
    }
  }



  async function handleClearCart(){
    try{
      const response=await clearCart()
        if (response.data.message ==="success"){
          setCartDetails(null);
          toast.success("cart cleared")
        }
      }
    
    catch(error){
      toast.error("failed to clear cart")
    }
  }
 

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  return (
    <div className='container w-5/6 mx-auto '>
      <div className="relative overflow-x-auto p-8 sm:rounded-lg bg-gray-50 mt-16 dark:bg-gray-700">
        <div className='flex justify-between dark:bg-gray-700'>
          <div>
            <p className='text-3xl mb-4'>Cart Shop</p>
            <p className='text-lg'>
              Total price: <span className='text-green-500'>{cartDetails?.totalCartPrice}</span>
            </p>
          </div>
          <div>
            <Link to={'/checkout/' + cartDetails?._id}>
              <button className='bg-blue-500 rounded-lg py-2 px-2 text-white mb-4'>Check Out</button>
            </Link>
            <p className='text-lg'>
              Total number of items: <span className='text-green-500 text-lg'>{cartItems}</span>
            </p>
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs shadow-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          </thead>
          <tbody>
            {cartDetails?.products.map(p =>
              <CartItem
                deleteItemFromCart={deleteItemFromCart}
                updateQun={updateQun}
                count={p.count}
                price={p.price}
                product={p.product}
                key={p.product._id}
              />
            )}
          </tbody>
        </table>
        <div className='flex justify-center'>
          <button
          onClick={handleClearCart}
            className='dark:text-gray-400  border border-green-500 mt-4 rounded-lg py-2 px-2 text-xl text-black mb-4 mx-auto'
          >
            Clear Your Cart
          </button>
        </div>
      </div>
    </div>
  );
}
