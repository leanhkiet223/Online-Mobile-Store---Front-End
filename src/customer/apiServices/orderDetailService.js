import * as request from '../../utils/request';

export const orderDetailService = async (id) => {
    try {
        const endpoint =  `order-details/${id}` 
        const res = await request.get(endpoint);
        return res;
    } catch (error) {
        throw error;
    }
};

