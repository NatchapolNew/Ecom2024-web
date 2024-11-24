import React, { useEffect } from "react";
import ProductCard from "../Components/Card/ProductCard";
import useEcomStore from "../Store/ecom-store";
import SearchCard from "../Components/Card/SearchCard";
import CartCard from "../Components/Card/CartCard";
const Shop = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="flex">
      {/* Searchbar*/}
      <div className="w-1/4 h-screen p-4 bg-gray-100">
      <SearchCard/>
      </div>

      {/*Product*/}
      <div className="w-1/2 p-4 h-screen overflow-y-auto">
        <p className="text-2xl font-bold mb-4">สินค้าทั้งหมด</p>
        <div className="flex flex-wrap gap-4">
          {/*ProductCard*/}
          {products.map((item, index) => (
            <ProductCard key={index} item={item}/>
          ))}

          {/*ProductCard*/}
        </div>
      </div>

      {/*Cart*/}
      <div className="w-1/4 p-4 h-screen overflow-y-auto bg-gray-100">
      <CartCard/>
      </div>
    </div>
  );
};

export default Shop;
