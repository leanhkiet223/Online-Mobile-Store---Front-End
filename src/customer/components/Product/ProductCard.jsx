import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const discount = product.discount;
  const isProductAvailable = product.quantity > 0;
  const isProductState = product.state;
  return (
    <Link
      to={`/product-detail/${product.id}`}
      className="productCard relative w-[20rem] m-3 transition-all cursor-pointer border-2 rounded-md"
    >
      <div className="h-[20rem]">
        <img
          className="h-full w-full object-contain object-left-top rounded-md pt-3"
          src={product.image}
          alt=""
        />
      </div>
      {isProductAvailable ? null : (
        <span className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl">
          Hết hàng
        </span>
      )}

      {!isProductState && (
        <span className="absolute top-0 left-0 bg-slate-700 text-white p-1 rounded-bl">
          Tạm ngưng
        </span>
      )}
      <div className="textPart bg-white p-3">
        <div>
          <p className="font-bold opacity-60">
            {product.name} {product?.rom}
          </p>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <p className="text-lg mt-2 text-yellow-400">
            {product.newPrice.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
          {product.oldPrice && (
            <p className="mt-2 text-sm text-black-500 line-through opacity-50">
              {product.oldPrice.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          )}
          {discount && <p className="text-red-600 font-semibold"> Sale</p>}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
