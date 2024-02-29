import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  productDetailCategoryService,
  productDetailService,
} from "../../apiServices/productService";
import Review from "./Review";

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const [productToCategory, setProductToCategory] = useState([]);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const isProductAvailable = product.quantity > 0;
  const isProductState = product.state;
  const isDiscount = product?.discount;
  const [listColor, setListColor] = useState([]);
  const [uniqueRoms, setUniqueRoms] = useState([]);
  useEffect(() => {
    const uniqueRomsArray = [
      ...new Set(productToCategory?.map((item) => item?.rom)),
    ].map((rom) => {
      return productToCategory.find((item) => item.rom === rom);
    });
    setUniqueRoms(uniqueRomsArray);
  }, [productToCategory]);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const listCate = await productDetailCategoryService(id);
        setProductToCategory(listCate);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await productDetailService(id);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchApi();
  }, [id]);
  useEffect(() => {
    if (product?.images?.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);
  useEffect(() => {
    const lstMau = [];
    productToCategory.map((pro) => {
      if (product?.rom === pro?.rom) {
        lstMau.push({ color: pro?.color });
      }
    });
    setListColor(lstMau);
  }, [product, productToCategory]);

  const handleChooseROM = (rom) => {
    const lstMau = [];
    const lstPRO = [];
    productToCategory.map((pro) => {
      if (rom === pro?.rom) {
        lstMau.push({ color: pro?.color });
        lstPRO.push(pro);
      }
    });
    setListColor(lstMau);
    setProduct(lstPRO[0]);
  };
  const handleChooseColor = (color) => {
    if (!product) {
      return;
    }
    const productFind = productToCategory.find(
      (pro) => pro.color === color && pro.rom === product?.rom
    );
    if (productFind) {
      setProduct(productFind);
    } else {
      console.log(`Không tìm thấy sản phẩm với màu ${color}`);
    }
  };

  const handleImageClick = (img) => {
    setSelectedImage(img);
  };

  const addToCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).id
        : null;
      if (!user) {
        navigate("/login");
        return;
      }
      await fetch(
        `http://localhost:8080/api/cart/add-to-cart/${userId}/${product.id}`,
        {
          method: "POST",
        }
      );

      setIsAddedToCart(true);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  const buyNow = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).id
        : null;
      if (!user) {
        navigate("/login");
        return;
      }
      await fetch(
        `http://localhost:8080/api/cart/add-to-cart/${userId}/${product.id}`,
        {
          method: "POST",
        }
      );
      navigate(`/cart/${userId}`);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div>
      <section className="overflow-hidden bg-white py-11 font-poppins dark:bg-gray-800">
        <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full mb-8 md:w-1/2 md:mb-0">
              <div className="sticky top-0 z-50 overflow-hidden">
                <div className="relative mb-6 lg:mb-10 lg:h-2/4">
                  <img
                    src={
                      selectedImage ||
                      (product?.images?.length > 0 && product.images[0])
                    }
                    alt=""
                    className="object-cover w-full lg:h-full"
                  />
                </div>
                <div className="flex-wrap hidden md:flex">
                  {product?.images?.map((img, i) => (
                    <div
                      key={i}
                      className={`w-1/2 p-2 sm:w-1/4 ${
                        selectedImage === img
                          ? "border border-blue-300 hover:border-blue-300"
                          : ""
                      }`}
                      onClick={() => handleImageClick(img)}
                    >
                      <div className="block">
                        <img
                          src={img}
                          alt=""
                          className="object-cover w-full lg:h-20"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2">
              <div className="lg:pl-20">
                <div className="mb-8">
                  <h2 className="max-w-xl mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                    {product?.name}
                    {isProductState && isDiscount && (
                      <span className="ml-2 bg-red-700 text-white p-1 rounded-md  ">
                        sale
                      </span>
                    )}
                  </h2>
                  <p className="inline-block mb-6 text-4xl font-bold text-gray-700 dark:text-gray-400">
                    <span>
                      {product?.newPrice?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                    <span className="text-base font-normal text-gray-500 line-through dark:text-gray-400">
                      {product?.oldPrice?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </p>
                  <p className="max-w-md text-gray-700 dark:text-gray-400">
                    {product?.description}
                  </p>
                </div>
                <div className="mb-8">
                  <h2 className="w-16 pb-1 mb-6 text-xl font-semibold border-b border-blue-300 dark:border-gray-600 dark:text-gray-400">
                    Storage
                  </h2>
                  <div>
                    <div class="flex flex-wrap -mb-2">
                      {uniqueRoms?.map((item, index) => (
                        <button
                          key={index}
                          className={`px-4 py-2 mb-2 mr-4 font-semibold border rounded-md ${
                            item?.rom === product?.rom
                              ? "border-blue-400 text-blue-600"
                              : "border-gray-400 text-gray-400"
                          } hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleChooseROM(item?.rom);
                          }}
                        >
                          {item?.rom}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mb-8">
                  <h2 className="w-16 pb-1 mb-4 text-xl font-semibold border-b border-blue-300 dark:border-gray-600 dark:text-gray-400">
                    Color
                  </h2>
                  <div className="flex flex-wrap -mb-2">
                    {listColor?.map((item, index) => (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleChooseColor(item?.color);
                        }}
                        key={index}
                        className={`px-4 py-2 mb-2 mr-4 font-semibold border rounded-md ${
                          item?.color === product?.color
                            ? "border-blue-400 text-blue-600"
                            : "border-gray-400 text-gray-400"
                        } hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400`}
                      >
                        {item?.color}
                      </button>
                    ))}
                  </div>
                  <div></div>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    className="w-full p-4 bg-blue-500 rounded-md lg:w-2/5 dark:text-gray-200 text-gray-50 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-700"
                    disabled={
                      !isProductAvailable || !isProductState || isAddedToCart
                    }
                    onClick={addToCart}
                  >
                    {isAddedToCart ? "Added to Cart" : "Add to Cart"}
                  </button>
                  <button
                    className="flex items-center justify-center w-full p-4 text-blue-500 border border-blue-500 rounded-md lg:w-2/5 dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 dark:bg-blue-500 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300"
                    disabled={!isProductAvailable || !isProductState}
                    onClick={buyNow}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Review data={product} />
    </div>
  );
};

export default ProductDetails;
