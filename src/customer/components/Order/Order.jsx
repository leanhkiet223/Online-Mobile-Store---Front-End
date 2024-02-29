import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { OrderService, cancelOrderService } from '../../apiServices/orderService';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { format, parseISO } from 'date-fns';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState(null);

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };


  

  const fetchOrder = async () => {
    try {
      const data = await OrderService(id);
      if (data) {
        setOrders(data);
      } else {
        console.error("Invalid data received from OrderService");
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };
  

  const fetchCancelOrder = async (idOrder) => {
    try {
      const data = await cancelOrderService(idOrder);
      if (data) {
        setOrders(data);
      } else {
        console.error("Invalid data received from cancelOrderService");
      }
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };
  

  const handleDeleteOrder = async (idOrder) => {
    try {
      await fetchCancelOrder(idOrder);
      fetchOrder();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };
  const filteredOrders = orders?.filter(order =>
    selectedState == null || order.state == selectedState
  );
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
    } else {
      fetchOrder();
    }
  }, [id, navigate]);

  return (
    <section className="py-24 bg-gray-100 font-poppins dark:bg-gray-700">
      <div className="px-4 py-6 mx-auto max-w-7xl lg:py-4 md:px-6">
        <div>
          <div className="p-6 mb-8 border bg-gray-50 dark:bg-gray-800 dark:border-gray-800">
            <div className="flex-wrap items-center hidden mb-6 -mx-4 md:flex md:mb-8">
              <div className="w-full px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0">
                <h2 className="font-bold text-gray-500 dark:text-gray-400">Address</h2>
              </div>
              <div className="hidden px-4 lg:block lg:w-2/12">
                <h2 className="font-bold text-gray-500 dark:text-gray-400">Date</h2>
              </div>
              <div className="w-auto px-4 md:w-1/6 lg:w-2/12 ">
                <select value={selectedState || undefined} onChange={handleStateChange}>
                  <option value={null}>All</option>
                  <option value={1}>Đang xử lý</option>
                  <option value={2}>Chờ giao hàng</option>
                  <option value={3}>Hoàn thành</option>
                  <option value={4}>Hoàn hàng</option>
                  <option value={0}>Đã hủy</option>
                </select>
              </div>
              <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12 ">
                <h2 className="font-bold text-gray-500 dark:text-gray-400"> Total</h2>
              </div>
            </div>
            <div className="py-4 mb-8 border-t border-b border-gray-200 dark:border-gray-700 max-h-[500px] overflow-y-auto">
              {filteredOrders?.length > 0 ? (
                filteredOrders.map((order) => (
                  <div key={order.id} className="flex flex-wrap items-center mb-6 -mx-4 md:mb-8">
                    <div className="w-full px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0">
                      <div className="flex flex-wrap items-center -mx-4">
                        <div className="w-full px-4 mb-3 md:w-1/3">
                          <Link to={`/order-detail/${order.id}/${order.state}`} className="w-full h-96 md:h-24 md:w-24">
                            <img src="https://png.pngtree.com/png-vector/20190725/ourlarge/pngtree-invoice-icon-design-vector-png-image_1586820.jpg" alt=""
                              className="object-cover w-full h-full" />
                          </Link>
                        </div>
                        <div className="w-2/3 px-4">
                          <p className="text-gray-500 dark:text-gray-400 ">{order.address}</p>
                        </div>
                      </div>
                    </div>
                    <div className="hidden px-4 lg:block lg:w-2/12">
                      <p className="text-lg font-bold text-blue-500 dark:text-gray-400">
                        {format(parseISO(order.createDate), 'dd/MM/yyyy HH:mm:ss')}</p>
                    </div>
                    <div className="w-auto px-4 md:w-1/6 lg:w-2/12">
                      <div className={`inline-flex items-center px-4 font-semibold rounded-md 
                                ${order.state === 1 ? 'text-yellow-500 border-yellow-500' :
                          order.state === 2 ? 'text-blue-500 border-blue-500' :
                            order.state === 3 ? 'text-green-500 border-green-500' :
                              order.state === 4 ? 'text-gray-500 border-gray-500' :
                                order.state === 0 ? 'text-red-500 border-red-500' :
                                  'text-gray-500 border-gray-200 dark:border-gray-700'}`}>
                        {order.state === 1 ? 'Đang xử lý' :
                          order.state === 2 ? 'Chờ giao hàng' :
                            order.state === 3 ? 'Hoàn thành' :
                              order.state === 4 ? 'Hoàn hàng' :
                                order.state === 0 ? 'Đã hủy' : order.state}
                      </div>
                    </div>

                    <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12 ">
                      <p className="text-lg font-bold text-blue-500 dark:text-gray-400">
                        {order?.total?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                      </p>
                      {order.state === 1 &&
                        <BackspaceIcon
                          style={{ cursor: 'pointer', color: 'red' }}
                          onClick={() => handleDeleteOrder(order?.id)}
                        />}
                    </div>
                  </div>

                ))
              ) : (
                <p>No orders available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;