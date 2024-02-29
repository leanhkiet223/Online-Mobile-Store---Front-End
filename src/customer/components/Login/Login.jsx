import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginByGoogle from "../LoginByGoogle/login";
import { gapi } from 'gapi-script'


const clientId = "1018686024516-ol8odmqsipcrjoddf224oi8hn5hav80m.apps.googleusercontent.com";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };
    gapi.load('client:auth2', start);
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        setError(null);

        setTimeout(() => {
          toast.success("Login successful");
        }, 10);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setError("Password or email is incorrect");
        toast.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }

  };




  return (
    <section className="font-poppins h-screen flex my-10">
      <div className="max-w-6xl px-1 mx-auto lg:px-6 ">
        <div className="flex flex-col items-center h-full justify-center md:flex-row">
          <div className="flex flex-wrap items-center  bg-gray-100 shadow-lg dark:bg-gray-900 my-7 ">
            <div className="relative hidden w-full mb-12 lg:block lg:w-2/4 lg:mb-0">
              <div className="absolute inset-0 z-10 bg-gray-700 opacity-50">
                {" "}
              </div>
              <img
                src="https://i.postimg.cc/XJBZvxHp/first.jpg"
                alt=""
                className="relative inset-0 object-cover w-full h-2/4"
              />
              <div className="absolute left-0 z-10 top-10 lg:top-40">
                <div className="p-14">
                  <h2 className="text-4xl font-bold text-gray-300 lg:text-5xl ">
                    <span className="text-yellow-300">Hello! </span>welcome
                    Online Mobile Store
                  </h2>
                  <p className="text-lg font-medium text-gray-300 py-7">
                    Make your dream comes true and achieve your success
                  </p>
                  <Link
                    to="/"
                    className="px-4 py-3 mt-4 font-semibold text-gray-700 bg-yellow-400 rounded-lg w-44 lg:w-80 hover:text-gray-600 "
                    type="submit"
                  >
                    Getting started
                  </Link>
                </div>
              </div>
            </div>

            <div className="w-full px-2 lg:px-4 lg:w-2/4 lg:mb-0 lg:py-0 py-7">
              <div className="px-6 text-left">
                <h2 className="text-3xl font-semibold leading-tight text-gray-700 my-7 md:text-4xl pb-7 dark:text-gray-400 ">
                  Login to your account
                </h2>
                <form onSubmit={handleLogin} className="mt-6">
                  <div>
                    <label
                      htmlFor="input-email"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Email:
                    </label>
                    <input
                      id="input-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 mt-2 bg-white rounded-lg dark:text-gray-100 dark:bg-gray-800 dark:border dark:border-gray-800"
                      name=""
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="mt-6">
                    <label
                      htmlFor="input-password"
                      className="pb-4 mb-2 text-gray-700 dark:text-gray-300"
                    >
                      Password:
                    </label>
                    <div className="relative flex items-center mt-2">
                      <input
                        id="input-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-white rounded-lg dark:text-gray-100 dark:bg-gray-800 dark:border dark:border-gray-800 "
                        name=""
                        placeholder="Enter password"
                      />
                    </div>
                  </div>
                  <div className="mt-4 text-right">
                    <a
                      href="/forgot-password"
                      className="text-sm font-semibold text-blue-700 dark:text-blue-300 hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <button
                    className="w-full px-4 py-3 mt-4 font-semibold text-gray-700 bg-yellow-400 rounded-lg hover:text-blue-600"
                    type="submit"
                  >
                    LOGIN
                  </button>
                  {error && (
                    <div className="mt-4 text-red-500 dark:text-red-400">
                      {error}
                    </div>
                  )}
                  <div>
                    <p style={{ marginBottom: '10px' }}>Or with:</p>

                    <LoginByGoogle />
                  </div>
                  <ToastContainer />
                  <p className="mt-8 text-gray-700 dark:text-gray-400">
                    Need an account?
                    <a
                      href="/register"
                      className="font-semibold text-blue-400 hover:text-blue-600"
                    >
                      Create an account
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
