import React from "react";
import { Link } from "react-router-dom";

const HomeCategoryCard = ({ cate }) => {
  return (
    <Link
      to={`/products/${cate.id}`}
      key={cate.id}
      className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[10rem] mx-3 p-2 m-2 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-gray-100"
    >
      <div className="h-[5rem] w-[5rem] relative overflow-hidden">
        <img
          className="object-contain w-full h-full transition-opacity duration-300 ease-in-out transform hover:opacity-80"
          src={cate.logo}
          alt=""
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 uppercase">
          {cate.name}
        </h3>
      </div>
    </Link>
  );
};

export default HomeCategoryCard;
