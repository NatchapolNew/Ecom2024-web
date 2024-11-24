import React from "react";
import { useState, useEffect } from "react";
import {
  createCategory,
  listCategory,
  removeCategory,
} from "../../Api/Category";
import useEcomStore from "../../Store/ecom-store";
import { toast } from "react-toastify";

const FormCategory = () => {
  //Javascript
  const [name, setName] = useState("");
  const token = useEcomStore((state) => state.token);
  //const [categories, setCategories] = useState([]);
  const categories = useEcomStore((state)=>state.categories)
  const getCategory = useEcomStore((state)=>state.getCategory)

  useEffect(() => {
    getCategory(token);
  }, []);

  

  const handleSubmit = async (e) => {
    //code
    e.preventDefault();
    try {
      const res = await createCategory(token, { name });
      if (!name) {
        return toast.warning("Please Fill data");
      }
      toast.success(`Add Category ${res.data.name} Success!!!`);
      getCategory(token);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (id) => {
    //code
    console.log(id);
    try{
        const res = await removeCategory(token,id)
        console.log(res)
        toast.success(`Deleted ${res.data.name} success!!`)
        getCategory(token)
    }catch(err){
        console.log(err)
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <h1>Category Management</h1>
      <form className="my-4" onSubmit={handleSubmit}>
        <input
          type="text"
          className="border"
          onChange={(e) => setName(e.target.value)}
        />
        <button className="bg-blue-500">Add Category</button>
      </form>
      <hr />
      <ul className="list-none">
        {categories.map((item, index) => (
          <li key={index} className="flex justify-between my-2">
            <span>{item.name}</span>
            <button
              onClick={() => handleRemove(item.id)}
              className="bg-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormCategory;
