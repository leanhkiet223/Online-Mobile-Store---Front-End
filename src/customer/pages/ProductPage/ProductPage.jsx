import React, { useEffect, useState } from "react";
import Product from "../../components/Product/Product";
import {
  productAllService,
  productSearchService,
  productService,
} from "../../apiServices/productService";
import { useParams } from "react-router-dom";
const ProductPage = () => {
  const [products, setProduct] = useState([]);
  const { trademark } = useParams();
  const { searchKey } = useParams();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        if (trademark) {
          const response = await productService(trademark);
          setProduct(response);
        } else if (searchKey) {
          const response = await productSearchService(searchKey);
          setProduct(response);
        } else {
          const response = await productAllService();
          setProduct(response);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchApi();
  }, [trademark, searchKey]);
  return (
    <div>
      <Product data={products} trademark={trademark} />
    </div>
  );
};

export default ProductPage;
