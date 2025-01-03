import React, { useState, useEffect } from "react";
import useEcomStore from "../../Store/ecom-store";
import { numberFormat } from "../../utils/number";

import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { createProduct, deleteProduct } from "../../Api/Product";
import { Link } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";
import { dateformat } from "../../utils/DateFormat";

const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  images: [],
};

const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: "",
    images: [],
  });

  useEffect(() => {
    getCategory();
    getProduct(100);
  }, []);

  const handleOnchange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createProduct(token, form);
      setForm(initialState);
      getProduct();
      toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete Product?")) {
      try {
        const res = await deleteProduct(token, id);
        console.log(res);
        getProduct();
        toast.success("Deleted สินค้าเรียบร้อยแล้ว");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <form onSubmit={handleSubmit}>
        <h1>เพิ่มข้อมูลสินค้า</h1>
        <div className="flex gap-2">
          <div>
            <input
              type="text"
              className="border rounded-md"
              value={form.title}
              onChange={handleOnchange}
              placeholder="Title"
              name="title"
            />
          </div>

          <div>
            <input
              type="text"
              className="border rounded-md"
              value={form.description}
              onChange={handleOnchange}
              placeholder="description"
              name="description"
            />
          </div>

          <div>
            <input
              type="number"
              className="border rounded-md"
              value={form.price}
              onChange={handleOnchange}
              placeholder="price"
              name="price"
            />
          </div>

          <div>
            <input
              type="number"
              className="border rounded-md"
              value={form.quantity}
              onChange={handleOnchange}
              placeholder="จำนวนสินค้า"
              name="quantity"
            />
          </div>

          <div>
            <select
              className="border rounded-md"
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
          </div>
        </div>

        {/*Upload file*/}
        <Uploadfile form={form} setForm={setForm} />
        <button
          className="bg-blue-500
        p-2 rounded-md shadow-md hover:scale-105 hover:translate-y-1 hover:duration-200"
        >
          เพิ่มสินค้า
        </button>
        <hr className="relative top-3" />
        <table className="table w-full border relative top-5">
          <thead>
            <tr className="bg-gray-200 border">
              <th scope="col">No.</th>
              <th scope="col">รูปภาพ</th>
              <th scope="col">ชื่อสินค้า</th>
              <th scope="col">รายละเอียด</th>
              <th scope="col">ราคา</th>
              <th scope="col">จำนวน</th>
              <th scope="col">จำนวนที่ขายได้</th>
              <th scope="col">วันที่อัปเดต</th>
              <th scope="col">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => {
              return (
                <tr key={index} className="text-center ">
                  <th scope="row">{index + 1}</th>
                  <td className="py-1">
                    {item.images.length > 0 ? (
                      <img
                        className="w-24 h-24 rounded-lg shadow-md"
                        src={item.images[0].url}
                        alt=""
                      />
                    ) : (
                      <div
                        className="w-24 h-24 bg-gray-200 rounded-md 
                                      flex items-center justify-center shadow-sm"
                      >
                        {" "}
                        No Image{" "}
                      </div>
                    )}
                  </td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{numberFormat(item.price)}</td>
                  <td>{item.quantity}</td>
                  <td>{item.sold}</td>
                  <td>{dateformat(item.updatedAt)}</td>
                  <td className="flex gap-2 p-6 justify-center">
                    <p
                      className="bg-yellow-500 rounded-md p-1 shadow-md 
                    hover:scale-105 hover:translate-y-1 hover:duration-200"
                    >
                      <Link to={"/admin/product/" + item.id}>
                        <Pencil />
                      </Link>
                    </p>

                    <p
                      className="bg-red-500 rounded-md p-1 shadow-md hover:cursor-pointer
                      hover:scale-105 hover:translate-y-1 hover:duration-200"
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                    >
                      <Trash />
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default FormProduct;
