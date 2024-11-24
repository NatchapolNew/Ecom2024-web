import React, { useState, useEffect } from "react";
import useEcomStore from "../../Store/ecom-store";
import { useParams,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { createProduct,readProduct,listProduct, updateProduct } from "../../Api/Product";

const initialState = {
  title: "Notebook",
  description: "desc",
  price: 200,
  quantity: 10,
  categoryId: "",
  images: [],
};

const FormEditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    getCategory();
    fetchProduct(token,id,form)
  }, []);

  const fetchProduct = async(token,id,form)=>{
    try{
        const res = await readProduct(token,id,form)
        console.log('res from backend',res)
        setForm(res.data)        
    }catch(err){
        console.log('Err fetch data',err)
    }
  }

  console.log(form)

  const handleOnchange = (e) => {

    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProduct(token,id,form);
      toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`);
      navigate('/admin/product')
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <form onSubmit={handleSubmit}>
        <h1>เพิ่มข้อมูลสินค้า</h1>
        <input
          type="text"
          className="border"
          value={form.title}
          onChange={handleOnchange}
          placeholder="Title"
          name="title"
        />

        <input
          type="text"
          className="border"
          value={form.description}
          onChange={handleOnchange}
          placeholder="description"
          name="description"
        />

        <input
          type="number"
          className="border"
          value={form.price}
          onChange={handleOnchange}
          placeholder="price"
          name="price"
        />

        <input
          type="number"
          className="border"
          value={form.quantity}
          onChange={handleOnchange}
          placeholder="quantity"
          name="quantity"
        />

        <select
          className="border"
          name="categoryId"
          onChange={handleOnchange}
          required
          value={form.categoryId}
        >
          <option value="" disabled>
            Please Select
          </option>
          {categories.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <hr />
          {/*Upload file*/}
          <Uploadfile form={form} setForm={setForm}/>
        <button className="bg-blue-500">แก้ไขสินค้า</button>
        <hr />
        <br />
      </form>
    </div>
  );
};

export default FormEditProduct;