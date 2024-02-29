import React from "react";
import HomeCategoryCard from "../HomeCategoryCard/HomeCategoryCard";
import { homeCategoryData } from "./HomeCategoryData";

const HomeCategory = () => {
  const items = homeCategoryData;
  return (
    <div className="container mx-auto px-3">
      <div className="m-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 justify-center">
        {items.map((item, index) => (
          <HomeCategoryCard cate={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default HomeCategory;
