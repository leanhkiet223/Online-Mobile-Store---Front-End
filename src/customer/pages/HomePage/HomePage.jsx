import React, { useEffect, useState } from "react";
import MainCarousel from "../../components/HomeCarousel/MainCarousel";
import HomeFlashSaleCarousel from "../../components/HomeFlashSaleCarousel/HomeFlashSaleCarousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import HomeSelectionCarousel from '../../components/HomeSelectionCarousel/HomeSelectionCarousel';
import HomeCategory from '../../components/HomeCategory/HomeCategory';
import  { ProductService,ProductFlashSaleService } from '../../apiServices/homeService';



const HomePage = () => {
  const [brandsData, setBrandsData] = useState([
    { id: 1, name: "Apple", data: [] },
    { id: 2, name: "Samsung", data: [] },
    { id: 3, name: "Xiaome", data: [] },
    { id: 4, name: "Realme", data: [] },
    { id: 5, name: "Oppo", data: [] },
    { id: 6, name: "Vivo", data: [] },
  ]);

  useEffect(() => {
    const fetchDataForAllBrands = async () => {
      try {
        const updatedBrandsData = await Promise.all(
          brandsData.map(async (brand) => ({
            ...brand,
            data: await ProductService.fetchDataForBrand(brand.id),
          }))
        );
        setBrandsData(updatedBrandsData);
      } catch (error) {
        console.error("Error fetching data for all brands:", error);
      }
    };

    fetchDataForAllBrands();
  }, []);

  const [productSale, setProductSale] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await ProductFlashSaleService();
        setProductSale(data);
      } catch (error) {
        console.error("Error fetching flash sale data:", error);
      }
    };

    fetchApi();
  }, []);

  return (
    <div>
      <MainCarousel />
      <HomeFlashSaleCarousel data={productSale} />
      <HomeCategory />
      <div className="space-y-10 py-20 flex flex-col justify-center">
        {brandsData.map((brand) => (
          <HomeSelectionCarousel
            key={brand.id}
            data={brand.data}
            selectionName={brand.name}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
