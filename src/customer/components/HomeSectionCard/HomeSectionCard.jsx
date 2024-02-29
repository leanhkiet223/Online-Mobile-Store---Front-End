import React from 'react'
import { Link } from 'react-router-dom';

const HomeSectionCard = ({ product }) => {
  const isProductAvailable = product.quantity > 0;
  const isProductState = product.state;
  const isDiscount = product.discount;

  return (
    <Link to={`/product-detail/${product.id}`}
      key={product.id}
      className={`cursor-pointer relative flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3 p-2 m-2
        transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl
        ${(!isProductAvailable || !isProductState) ? 'cursor-not-allowed opacity-50' : ''}`}
    >
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
      {isProductState && isDiscount && (
          <span className='absolute top-0 left-0 bg-red-700 text-white p-1 rounded-br  '>
          Có mã giảm giá
        </span>
      )}
      <div className='h-[14rem] w-[10rem] relative overflow-hidden'>
        <img
          className='object-contain w-full h-full'
          src={product.image}
          alt=''
        />
      </div>
      <div className='p-4'>
        <h3 className='text-lg font-medium text-gray-900'>{product.name}
        </h3>
        <p className='text-lg mt-2 text-red-600 '>
          {product.newPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
        </p>
        {product.oldPrice && (
          <p className='mt-2 text-sm text-gray-500 line-through opacity-50'>
            {product.oldPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
          </p>
        )}
        
      </div>
    </Link>
  );
};


export default HomeSectionCard
