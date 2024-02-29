import *as request from '../../utils/request';

export const ProductService = {
    fetchDataForBrand: async (brandId) => {
      try {
        const response = await request.get(`products/brand/${brandId}`);
        return response;
      } catch (error) {
        console.error(`Error fetching data for brand ${brandId}:`, error);
        throw error;
      }
    },
  };

  
export const ProductFlashSaleService = async () => {
    try {
        const res = await request.get('products/sale')
        return res;
    } catch (error) {
        throw error;
    }
};