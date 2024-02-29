import { Password } from "@mui/icons-material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/register",
        {
          email,
          phoneNumber,
          fullName,
          password,
          confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setError(null);
        setTimeout(() => {
          toast.success("Registration successful");
        }, 10);
        navigate("/login");
        console.log(email, phoneNumber, fullName, password);
      } else {
        setError("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
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
                    <span className="text-yellow-300">Hello! </span>welcome to
                    our community
                  </h2>
                  <p className="text-lg font-medium text-gray-300 py-7">
                    Make your dream comes true and achieve your success
                  </p>
                  <button
                    className="px-4 py-3 mt-4 font-semibold text-gray-700 bg-yellow-400 rounded-lg w-44 lg:w-80 hover:text-gray-600 "
                    type="submit"
                  >
                    Getting started
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full px-2 lg:px-4 lg:w-2/4 lg:mb-0 lg:py-0 py-7">
              <div className="px-6 text-left">
                <h2 className="text-3xl font-semibold leading-tight text-gray-700 my-7 md:text-4xl pb-7 dark:text-gray-400 ">
                  Create your account
                </h2>
                <form action="" onSubmit={handleRegister} className="mt-6">
                  <div>
                    <label
                      htmlFor=""
                      className="text-gray-700 dark:text-gray-300"
                    >
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
                  <div>
                    <label
                      htmlFor=""
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Phone number:
                    </label>
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-4 py-3 mt-2 bg-white rounded-lg dark:text-gray-100 dark:bg-gray-800 dark:border dark:border-gray-800"
                      name=""
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor=""
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Full name:
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 mt-2 bg-white rounded-lg dark:text-gray-100 dark:bg-gray-800 dark:border dark:border-gray-800"
                      name=""
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor=""
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Password:
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 mt-2 bg-white rounded-lg dark:text-gray-100 dark:bg-gray-800 dark:border dark:border-gray-800"
                      name=""
                      placeholder="Enter your password"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor=""
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Confirm Password:
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 mt-2 bg-white rounded-lg dark:text-gray-100 dark:bg-gray-800 dark:border dark:border-gray-800"
                      name=""
                      placeholder="Enter your confirm password"
                    />
                  </div>

                  <div className="mt-4 text-right">
                    <a
                      href="#"
                      className="text-sm font-semibold text-blue-700 dark:text-blue-300 hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <button
                    className="w-full px-4 py-3 mt-4 font-semibold text-gray-700 bg-yellow-400 rounded-lg hover:text-blue-600 "
                    type="submit"
                  >
                    Register
                  </button>
                  <p className="mt-8 text-gray-700 dark:text-gray-400">
                    Have a account
                    <a
                      href="#"
                      className="font-semibold text-blue-400 hover:text-blue-600"
                    >
                      Login?
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

export default Register;
