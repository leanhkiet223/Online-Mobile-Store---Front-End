import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const ForgotPasswordEmail = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    const fetchChangePass = async (e) => {
        try {
            const response = await fetch(`http://localhost:8080/forgot-password?email=${email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                }),
            });

            if (response.ok) {
                setError(null);

                setTimeout(() => {
                    toast.success('Check captcha in your email');
                }, 2000);
                navigate('/reset-password');


            } else {
                setError('Email is incorrect');
                toast.error('failed');
            }
        } catch (error) {
            console.error('Error during send:', error);
        }
    };

    const handleSubmitEmail = (e) => {
        e.preventDefault();

        fetchChangePass();

    };

    return (
        <section className="font-poppins h-screen flex ">
            <div className="max-w-6xl px-1 mx-auto lg:px-6 ">
                <div className="flex flex-col items-center h-full justify-center md:flex-row">
                    <div className="flex flex-wrap items-center  bg-gray-100 shadow-lg dark:bg-gray-900 my-7 ">
                        <div className="relative hidden w-full mb-12 lg:block lg:w-2/4 lg:mb-0">
                            <div className="absolute inset-0 z-10 bg-gray-700 opacity-50"> </div>
                            <img src="https://i.postimg.cc/XJBZvxHp/first.jpg" alt=""
                                className="relative inset-0 object-cover w-full h-2/4" />
                            <div className="absolute left-0 z-10 top-10 lg:top-40">
                                <div className="p-14">
                                    <h2 className="text-4xl font-bold text-gray-300 lg:text-5xl "><span className="text-yellow-300">
                                        Hello! </span>welcome Online Mobile Store</h2>
                                    <p className="text-lg font-medium text-gray-300 py-7">
                                        Make your dream comes true and achieve your success</p>
                                    <Link to='/'
                                        className="px-4 py-3 mt-4 font-semibold text-gray-700 bg-yellow-400 rounded-lg w-44 lg:w-80 hover:text-gray-600 "
                                        type="submit">Getting started</Link>
                                </div>
                            </div>
                        </div>

                        <div className="w-full px-2 lg:px-4 lg:w-2/4 lg:mb-0 lg:py-0 py-7">
                            <div className="px-6 text-left">
                                <h2
                                    className="text-3xl font-semibold leading-tight text-gray-700 my-7 md:text-4xl pb-7 dark:text-gray-400 ">
                                    Forgot Password
                                </h2>
                                <form onSubmit={handleSubmitEmail} className="mt-6">
                                    <div>
                                        <label htmlFor="" className="text-gray-700 dark:text-gray-300">
                                            Email:
                                        </label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-3 mt-2 bg-white rounded-lg dark:text-gray-100 dark:bg-gray-800 dark:border dark:border-gray-800"
                                            name=""
                                            placeholder="Enter your email"
                                        />
                                    </div>

                                    <button
                                        className="w-full px-4 py-3 mt-4 font-semibold text-gray-700 bg-yellow-400 rounded-lg hover:text-blue-600"
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                    {error && (
                                        <div className="mt-4 text-red-500 dark:text-red-400">
                                            {error}
                                        </div>
                                    )}

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default ForgotPasswordEmail;
