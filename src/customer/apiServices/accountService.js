import * as request from '../../utils/request';

export const accountService = async (id) => {
    try {
        const endpoint =  `account/${id}` 
        const res = await request.get(endpoint);
        return res;
    } catch (error) {
        throw error;
    }
};




