import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { cartService, discountService, paymentService } from '../../apiServices/cartSerivce';

import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
    const [cartDetails, setCartDetails] = useState([]);
    const [discounts, setDiscounts] = useState([]);
  
    const { id } = useParams();
    const navigate = useNavigate();
    
  
    const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : null;
  
    const fetchCartDetails = async () => {
      try {
        const data = await cartService(id);
        setCartDetails(data);
      } catch (error) {
        console.error("Error fetching cart details:", error);
      }
    };
  
    const fetchDiscounts = async () => {
      try {
        const disc = await discountService(id);
        setDiscounts(disc);
      } catch (error) {
        console.error("Error fetching discounts:", error);
      }
    };
  
    const updateQuantity = async (cartId, cartItemId, newQuantity) => {
      try {
        await fetch(`http://localhost:8080/api/cart/update-quantity/${cartId}/${cartItemId}/${newQuantity}`, {
          method: 'POST',
        });
        fetchCartDetails();
        fetchDiscounts();
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    };
  
    const handleDeleteCartItem = async (cartItemId) => {
      try {
        await fetch(`http://localhost:8080/api/cart/delete-cartitem/${cartItemId}`, {
          method: 'DELETE',
        });
        fetchCartDetails();
        fetchDiscounts();
      } catch (error) {
        console.error('Error deleting cart item:', error);
      }
    };
  
    const handlePayment = async () => {
      try {
        await fetchPayment();
        fetchCartDetails();
        setTimeout(() => {
          toast.success("Order Success");
        }, 10);
        setTimeout(() => {
          navigate(`/my-order/${id}`);
        }, 2000);
       
      } catch (error) {
        console.error("Error handling payment:", error);
      }
    };

    const fetchPayment = async () => {
        try {
            const pay = await paymentService(id);
          } catch (error) {
            console.error("Error fetching discounts:", error);
          }
    }

    
  
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        navigate('/login');
      } else {
        fetchCartDetails();
        fetchDiscounts();
      }
    }, [id, navigate]);
  


  return (
    <div>
       <section className="py-24 bg-gray-100 font-poppins dark:bg-gray-700">
        <div className="px-4 py-6 mx-auto max-w-7xl lg:py-4 md:px-6">
            <div>
                <h2 className="mb-8 text-4xl font-bold dark:text-gray-400">Your Cart</h2>
                <div className="p-6 mb-8 border bg-gray-50 dark:bg-gray-800 dark:border-gray-800">
                    <div className="flex-wrap items-center hidden mb-6 -mx-4 md:flex md:mb-8">
                        <div className="w-full px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0">
                            <h2 className="font-bold text-gray-500 dark:text-gray-400">Product name</h2>
                        </div>
                        <div className="hidden px-4 lg:block lg:w-2/12">
                            <h2 className="font-bold text-gray-500 dark:text-gray-400">Price</h2>
                        </div>
                        <div className="w-auto px-4 md:w-1/6 lg:w-2/12 ">
                            <h2 className="font-bold text-gray-500 dark:text-gray-400">Quantity</h2>
                        </div>
                        <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12 ">
                            <h2 className="font-bold text-gray-500 dark:text-gray-400"> Subtotal</h2>
                        </div>
                    </div>
                    <div className="py-4 mb-8 border-t border-b border-gray-200 dark:border-gray-700">
                        {
                            cartDetails?.map((cartItem, index) => (
                                <div className="flex flex-wrap items-center mb-6 -mx-4 md:mb-8" key={cartItem.id}>
                                    <div className="w-full px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0">
                                        <div className="flex flex-wrap items-center -mx-4">
                                            <div className="w-full px-4 mb-3 md:w-1/3">
                                                <div className="w-full h-96 md:h-24 md:w-24">
                                                    <img src={cartItem.image} alt=""
                                                        className="object-cover w-full h-full"/>
                                                </div>
                                            </div>
                                            <div className="w-2/3 px-4">
                                                <h2 className="mb-2 text-xl font-bold dark:text-gray-400">{cartItem.name}</h2>
                                                <p className="text-gray-500 dark:text-gray-400 ">{cartItem.trademark}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden px-4 lg:block lg:w-2/12">
                                        <p className="text-lg font-bold text-blue-500 dark:text-gray-400">
                                        {cartItem?.newPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                        </p>
                                        <span className="text-xs text-gray-500 line-through dark:text-gray-400">
                                        {cartItem?.oldPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                        </span>
                                    </div>
                                    <div className="w-auto px-4 md:w-1/6 lg:w-2/12">
                                        <div className="inline-flex items-center px-4 font-semibold text-gray-500 border border-gray-200 rounded-md dark:border-gray-700">
                                        <button
                                            className="py-2 hover:text-gray-700 dark:text-gray-400"
                                            onClick={() => {
                                            // Handle decrement button click and call the updateQuantity function
                                            const newQuantity = Math.max(cartItem.quantity - 1, 1);
                                            updateQuantity(userId, cartItem.id, newQuantity);
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                            </svg>
                                        </button>
                                        <input
                                            type="number"
                                            className="w-12 px-2 py-4 text-center border-0 rounded-md dark:bg-gray-800 bg-gray-50 dark:text-gray-400 md:text-right"
                                            placeholder={cartItem.quantity} 
                                            onChange={(e) => {
                                            // Handle quantity change (optional: you can include validation here)
                                            }}
                                        />
                                        <button
                                            className="py-2 hover:text-gray-700 dark:text-gray-400"
                                            onClick={() => {
                                            // Handle increment button click and call the updateQuantity function
                                            const newQuantity = Math.min(cartItem.quantity + 1, cartItem.quantityProduct);
                                            updateQuantity(userId, cartItem.id, newQuantity);
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                            </svg>
                                        </button>
                                        </div>
                                        <span className="text-gray-500 font-bold ml-2">{`/${cartItem.quantityProduct}`}</span>
                                       
                                    </div>
                                    <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12">
                                        <p className="text-lg font-bold text-blue-500 dark:text-gray-400">
                                            {(cartItem?.subtotal).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                        </p>
                                        <DeleteIcon
                                            style={{ cursor: 'pointer', color: 'red' }}
                                            onClick={() => handleDeleteCartItem(cartItem?.id)}
                                        />
                                    </div>
                                </div>
                            ))
                        }
                        
                    </div>
                </div>
                <div className="flex flex-wrap justify-between">
                <div className="flex flex-col gap-4">
                        {discounts?.map((discount) => (
                            <div key={discount.id} className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-md shadow-md">
                                <div>
                                    <span className="text-gray-700 dark:text-gray-400">{discount.name}</span>
                                    <span className="text-xl ml-3 mr-3 font-bold text-red-700 dark:text-gray-400">
                                        -{discount.percent} % OF {discount.nameProduct}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="w-full px-4 mb-4 lg:w-1/2 ">
                        <div className="p-6 border border-blue-100 dark:bg-gray-900 dark:border-gray-900 bg-gray-50 md:p-8">
                            <h2 className="mb-8 text-3xl font-bold text-gray-700 dark:text-gray-400">Order Summary</h2>
                            <div
                                className="flex items-center justify-between pb-4 mb-4 border-b border-gray-300 dark:border-gray-700 ">
                                <span className="text-gray-700 dark:text-gray-400">Subtotal</span>
                                <span className="text-xl font-bold text-gray-700 dark:text-gray-400 ">
                                    {
                                        cartDetails?.reduce((total, item) => total + item.subtotal, 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                                    }
                                </span>
                            </div>
                            <div className="flex items-center justify-between pb-4 mb-4 ">
                                <span className="text-gray-700 dark:text-gray-400 ">Shipping</span>
                                <span className="text-xl font-bold text-gray-700 dark:text-gray-400 ">Free</span>
                            </div>
                            <div className="flex items-center justify-between pb-4 mb-4 ">
                                <span className="text-gray-700 dark:text-gray-400">Order Total</span>
                                <span className="text-xl font-bold text-gray-700 dark:text-gray-400">
                                {
                                        cartDetails?.reduce((total, item) => total + item.subtotal, 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                                    }
                                </span>
                            </div>

                            <div className="flex items-center justify-between ">
                                <button
                                    className="block w-full ml-2
                                    py-4 font-bold text-center
                                    text-gray-100 uppercase
                                    bg-green-500 rounded-md
                                    hover:bg-green-600"
                                    onClick={(e) => {e.preventDefault();handlePayment();}}>Payment
                                </button>
                                <ToastContainer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
    </div>
  )
}

export default Cart
