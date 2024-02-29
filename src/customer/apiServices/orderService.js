import * as request from '../../utils/request';

export const OrderService = async (id) => {
    try {
        const endpoint =  `orders/${id}` 
        const res = await request.get(endpoint);
        return res;
    } catch (error) {
        throw error;
    }
};

export const cancelOrderService = async (id) => {
    try {
        const endpoint =  `order/cancelOrder/${id}` 
        const res = await request.post(endpoint);
        return res;
    } catch (error) {
        throw error;
    }
};


