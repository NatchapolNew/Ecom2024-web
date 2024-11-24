import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState, useEffect } from "react";
import React from "react";
import useEcomStore from "../../Store/ecom-store";
import { Inspect } from "lucide-react";
import { numberFormat } from "../../utils/number";

const SearchCard = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);

  const [Text, setText] = useState("");
  const [categorySelected, setCategorySelected] = useState([]);

  const [price, setPrice] = useState([1000, 30000]);
  const [ok, setOk] = useState(false);

  const acitionSearchFilters = useEcomStore(
    (state) => state.acitionSearchFilters
  );

  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);

  useEffect(() => {
    getCategory();
  }, []);

  //Step 1 SearchByText
  useEffect(() => {
    const delay = setTimeout(() => {
      if (Text) {
        acitionSearchFilters({ query: Text });
      } else {
        getProduct();
      }

      return () => clearTimeout(delay);
    }, 300);
  }, [Text]);

  //Step 2 SearchByCategory
  const handleCheck = (e) => {
    console.log(e.target.value);
    const inCheck = e.target.value; //Value check
    const inState = [...categorySelected]; //arr
    const findCheck = inState.indexOf(inCheck); //ถ้าไม่เจอจะReturn-1

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setCategorySelected(inState);

    if (inState.length > 0) {
      acitionSearchFilters({ category: inState });
    } else {
      getProduct();
    }
  };
  console.log(categorySelected);

  //Step 3 SearchByPrice
  useEffect(() => {
    acitionSearchFilters({ price })

  }, [ok]);

  const handlePrice = (value) => {
    setPrice(value)
    setTimeout(() => {
       setOk(!ok) 
    }, 300);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">ค้นหาสินค้า</h1>
      {/*Search by text*/}
      <input
        onChange={(e) => setText(e.target.value)}
        placeholder="ค้นหาสินค้า"
        type="text"
        className="border rounded-md w-full mb-4 px-2"
      />
      <hr />

      {/*Search by Category*/}
      <div>
        <h1>หมวดหมู่สินค้า</h1>
        <div>
          {categories.map((item, index) => (
            <div className="flex gap-2">
              <input onChange={handleCheck} value={item.id} type="checkbox" />
              <label htmlFor="">{item.name}</label>
            </div>
          ))}
        </div>
      </div>
      <hr />
      {/*Search by Price*/}
      <div>
        <h1>ค้นหาราคา</h1>
        <div>
            <div className="flex justify-between">
                <span>Min: {numberFormat(price[0])}</span>
                <span>Max: {numberFormat(price[1])}</span>
            </div>
            <Slider
            onChange={handlePrice}
            range
            min={0}
            max={100000}
            defaultValue={[1000,30000]}
            />
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
