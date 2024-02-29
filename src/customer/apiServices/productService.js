import * as request from "../../utils/request";

export const productService = async (trademark) => {
  try {
    const endpoint1 = trademark ? `products/brand/${trademark}` : "products";
    const dataproduct = await request.get(endpoint1);
    return dataproduct;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const productAllService = async (trademark) => {
  try {
    const endpoint1 = "products";
    const dataproduct = await request.get(endpoint1);
    return dataproduct;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const productDetailService = async (id) => {
  try {
    const endpoint = `product-detail/${id}`;
    const res = await request.get(endpoint);
    return res;
  } catch (error) {
    throw error;
  }
};

export const productDetailCategoryService = async (idProduct) => {
  try {
    const endpoint = `product-detail/category/${idProduct}`;
    const res = await request.get(endpoint);
    return res;
  } catch (error) {
    throw error;
  }
};

export const productSearchService = async (searchKey) => {
  try {
    const endpoint1 = searchKey ? `products/search/${searchKey}` : "products";
    console.log(endpoint1);
    const dataproduct = await request.get(endpoint1);
    console.log(dataproduct);
    return dataproduct;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

    export const commentService = async (rate, content, idUser, idProduct) => {
      try {
          const endpoint = 'products/comment';
  
          const res = await request.post(endpoint, { rate, content, idUser, idProduct });
          return res;
      } catch (error) {
          throw error;
      }
  };