import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from 'react-toastify';
import useEcomStore from "../../Store/ecom-store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  //javascript
  const navigate = useNavigate()
  const actionLogin = useEcomStore((state)=>state.actionLogin)
  const user = useEcomStore((state)=>state.user)
  console.log('user form zustand',user)


  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnchange = (e) => {
    //code
    setForm({
      //spreadoperatorคัดลอกข้อมูลเดิมตัวแปรform
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    try{
       const res = await actionLogin(form)
       const role = res.data.payload.role
       roleRedirect(role)

       toast.success('Welcome Back')
    }catch(err){
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
      console.log(err)
    }
    
  }

  //เช็คแล้วไปหน้า user/admin
  const roleRedirect = (role)=>{
    if(role === 'admin'){
      navigate('/admin')
    }else{
      navigate(-1)
    }

  }

  return (
    <div className="min-h-screen 
    flex items-center justify-center
    bg-gray-200 px-4">
      <div className="w-full shadow-md bg-white p-8 max-w-md">
      <h1 className="text-2xl text-center my-4 font-bold ">Login</h1>
      <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <input
          className="border w-full px-3 py-2 rounded
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  focus:border-transparent"
          placeholder="Email"
          name="email"
          type="email"
          onChange={handleOnchange}
        />
       
        <input
          className="border w-full px-3 py-2 rounded
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  focus:border-transparent"
          placeholder="Password"
          name="password"
          type="password"
          onChange={handleOnchange}
        />
       
        <button className="mt-2 w-full bg-blue-500 text-white rounded-md font-bold py-2 shadow
                              hover:bg-blue-700">Login</button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Login;
