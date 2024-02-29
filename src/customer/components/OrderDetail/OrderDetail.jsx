import React, { useEffect, useState } from "react";
import { orderDetailService } from "../../apiServices/orderDetailService";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";

const OrderDetail = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const { id, state } = useParams();
  const navigate = useNavigate();

  const fetchOrderDetails = async () => {
    try {
      const data = await orderDetailService(id);
      setOrderDetails(data);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };
  let amount = parseInt(
    orderDetails?.reduce(
      (total, item) => total + item?.newPrice * item.quantity,
      0
    ),
    10
  );

  const fetchCartCheckout = async () => {
    try {
      const formData = new FormData();
      formData.append("amount", amount);
      formData.append("orderId", id);
      const response = await axios.post(
        "http://localhost:8080/api/vnpayajax",
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error processing payment:", error);
      return { error: "Error processing payment" };
    }
  };

  const handlePay = async () => {
    try {
      const payResult = await fetchCartCheckout();
      window.location.href = payResult;
    } catch (error) {
      console.error("Error handling payment:", error);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    } else {
      fetchOrderDetails();
    }
  }, [id, navigate]);

  return (
    <section className="flex items-center bg-gray-50 xl:h-screen font-poppins dark:bg-gray-700 ">
      <div className="justify-center flex-1 px-1 py-6 mx-auto max-w-7xl lg:py-4 md:px-6">
        <h2 className="mb-10 text-4xl font-bold text-center dark:text-gray-400">
          ORDER-DETAIL
          <div
            className={`inline-flex items-center px-4 font-semibold rounded-md 
                                ${
                                  state == 1
                                    ? "text-yellow-500 border-yellow-500"
                                    : state == 2
                                    ? "text-blue-500 border-blue-500"
                                    : state == 3
                                    ? "text-green-500 border-green-500"
                                    : state == 4
                                    ? "text-gray-500 border-gray-500"
                                    : state == 0
                                    ? "text-red-500 border-red-500"
                                    : "text-gray-500 border-gray-200 dark:border-gray-700"
                                }`}
          >
            {state == 1
              ? "Đang xử lý"
              : state == 2
              ? "Chờ giao hàng"
              : state == 3
              ? "Hoàn thành"
              : state == 4
              ? "Hoàn hàng"
              : state == 0
              ? "Đã hủy"
              : state}
          </div>
        </h2>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-8/12">
            <div className="px-10">
              {orderDetails?.map((item, index) => (
                <div key={index} className="relative flex flex-wrap items-center pb-8 mb-8 -mx-4 border-b border-gray-200 dark:border-gray-700 xl:justify-between border-opacity-40">
                  <div className="w-full mb-2 lg:mb-0 h-96 md:h-44 md:w-44">
                    <img
                      src={item.image}
                      alt=""
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="w-full px-4 mb-6 md:w-auto xl:mb-0">
                    <Link
                      to={`/product-detail/${item.productId}`}
                      className="block mb-5 text-xl font-medium dark:text-gray-400 hover:underline"
                      href="#"
                    >
                      {item.name}
                    </Link>
                    <div className="flex flex-wrap">
                      <p className="mr-4 text-sm font-medium">
                        <span className="dark:text-gray-400">Color:</span>
                        <span className="ml-2 text-gray-400 dark:text-gray-400">
                          {item.color}
                        </span>
                      </p>
                      <p className="text-sm font-medium dark:text-gray-400">
                        <span>Ram:</span>
                        <span className="ml-2 text-gray-400">{item.ram}</span>
                      </p>
                    </div>
                  </div>
                  <div className="w-full px-4 mt-6 mb-6 xl:w-auto xl:mb-0 xl:mt-0">
                    <div className="flex items-center">
                      <h4 className="mr-4 font-medium dark:text-gray-400">
                        Qty:{item.quantity}
                      </h4>
                    </div>
                  </div>
                  <div className="w-full px-4 xl:w-auto">
                    <p className="text-lg font-bold text-blue-500 dark:text-gray-400">
                      {item?.newPrice?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                    <span className="text-xs text-gray-500 line-through dark:text-gray-400">
                      {(item?.oldPrice).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-4/12">
            <div className="px-6 mb-14">
              <div className="w-auto px-4 md:w-1/6 lg:w-2/12"></div>
              <div>
                <h2 className="mb-6 text-3xl font-bold dark:text-gray-400">
                  Cart totals
                </h2>
                <div className="flex items-center justify-between px-10 py-4 mb-3 font-medium leading-8 bg-gray-100 bg-opacity-50 border dark:text-gray-400 dark:bg-gray-800 dark:border-gray-800 rounded-xl">
                  <span>Subtotal</span>

                  <span className="mr-2 text-base line-through">
                    {orderDetails
                      ?.reduce(
                        (total, item) => total + item?.oldPrice * item.quantity,
                        0
                      )
                      .toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                  </span>
                </div>

                <div className="flex items-center justify-between px-10 py-4 mb-6 font-medium leading-8 bg-gray-100 border dark:text-gray-400 dark:bg-gray-800 dark:border-gray-800 rounded-xl">
                  <span>Total</span>
                  <span className="flex items-center text-xl text-blue-500 dark:text-blue-400">
                    <span className="mr-2 text-base">
                      {orderDetails
                        ?.reduce(
                          (total, item) =>
                            total + item?.newPrice * item.quantity,
                          0
                        )
                        .toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                    </span>
                  </span>
                </div>
                <div className="flex justify-center items-center space-x-4">
                  <Link
                    to="/"
                    className="inline-block px-6 py-4 text-lg font-medium leading-6 tracking-tighter text-center text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
                  >
                    Back Shop
                  </Link>
                  {state == 1 && (
                    <Button
                      className="inline-block px-6 py-4 text-lg font-medium leading-6 tracking-tighter text-center text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePay();
                      }}
                    >
                      Pay VNP
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetail;
