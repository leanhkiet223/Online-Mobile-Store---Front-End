import * as request from '../../utils/request';

export const cartService = async (id) => {
    try {
        const endpoint =  `cart/${id}` 
        const res = await request.get(endpoint);
        return res;
    } catch (error) {
        throw error;
    }
};

export const discountService = async (id) => {
    try {
        const endpoint =  `discount/${id}` 
        const res = await request.get(endpoint);
        return res;
    } catch (error) {
        throw error;
    }
};

export const paymentService = async (id) => {
    try {
        const endpoint =  `order/create/${id}` 
        const res = await request.post(endpoint);
        return res;
    } catch (error) {
        throw error;
    }
};


