import React from "react";
import ContentCarousel from "../Components/home/ContentCarousel";
import Bestseller from "../Components/home/Bestseller";
import NewProduct from "../Components/home/NewProduct";
const Home = () => {
  return (
    <>
     <ContentCarousel/>

     <p className="text-2xl text-center my-4">สินค้าขายดี</p>
     <Bestseller/>
     <p className="text-2xl text-center my-4">สินค้าใหม่</p>
     <NewProduct/>
    </>
  );
};

export default Home;
