import React from 'react'
import { Link } from 'react-router-dom';

const HomeFlashSaleCard = ({ product }) => {
  return (
    <Link to={`/product-detail/${product.id}`} className='cursor-pointer relative flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[13rem] mx-3 p-2 m-2
      transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl'>
      <div className='absolute top-0 right-0 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white pl-1 pr-1 rounded-bl-md shadow-md'>
      <span className="italic">Nhập mã -{product?.percent} %</span>
      </div>

      <div className='h-[12rem] w-[8rem]  overflow-hidden'>
        <img
          className='object-contain w-full h-full'
          src={product?.image}
          alt=''
        />
        
      </div>
      <div className='p-4'>
        <h3 className='text-lg font-medium text-gray-900'>{product?.name}</h3>
        <p className='mt-2 text-lg text-yellow-500 font-semibold'>
          {product?.newPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
        </p>

        <p className='mt-2 text-sm text-gray-500 line-through'>
          {product?.oldPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
        </p>

      </div>
    </Link>
  );
};


export default HomeFlashSaleCard
