import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import { useNavigate } from "react-router-dom";
const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid Email!!!" }),
    password: z.string().min(8, { message: "Password ต้องมากกว่า 8 ตัวอักษร" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password is not match!!!",
    path: ["confirmPassword"],
  });

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const [passwordScore, setPasswordScore] = useState(0);

  const validatePassword = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };

  useEffect(() => {
    setPasswordScore(validatePassword());
  }, [watch().password]);

  const onSubmit = async (data) => {
    // const passwordScore = zxcvbn(data.password).score
    // if(passwordScore < 3){
    //   toast.warning('Password ไม่เหมาะสม')
    //   return
    // }

    try {
      //code
      const res = await axios.post("https://ecom2024-api-seven.vercel.app/api/register", data);

      console.log(res);
      toast.success(res.data);
      navigate("/login");
    } catch (err) {
      //err
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
      console.log(err);
    }
  };

  return (
    <div
      className="min-h-screen 
    flex items-center justify-center
    bg-gray-200 px-4"
    >
      <div className="w-full shadow-md bg-white p-8 max-w-md">
        <h1 className="text-2xl text-center my-4 font-bold ">Register</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <input
                {...register("email")}
                placeholder="Email"
                className={`border w-full px-3 py-2 rounded
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  focus:border-transparent
                  ${errors.email && "border-red-500"}
        `}
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <input
                {...register("password")}
                placeholder="Password"
                type="password"
                className={`border w-full px-3 py-2 rounded
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  focus:border-transparent
                  ${errors.password && "border-red-500"}
        `}
              />
              {errors.password && (
                <p className="text-red-600 text-sm">
                  {errors.password.message}
                </p>
              )}
              {watch().password?.length > 0 && (
                <div className="flex mt-2">
                  {Array.from(Array(1).keys()).map((item, index) => (
                    <span className="w-1/5 px-1" key={index}>
                      <div
                        className={`h-2 rounded ${
                          passwordScore <= 2
                            ? "bg-red-500"
                            : passwordScore < 4
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }
                                                  }`}
                      ></div>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <input
                {...register("confirmPassword")}
                placeholder="confirmPassword"
                type="password"
                className={`border w-full px-3 py-2 rounded
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  focus:border-transparent
                  ${errors.confirmPassword && "border-red-500"}
        `}
              />
              {errors.confirmPassword && (
                <p className="text-red-600">{errors.confirmPassword.message}</p>
              )}
              <button
                className="mt-2 w-full bg-blue-500 text-white rounded-md font-bold py-2 shadow
                              hover:bg-blue-700"
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
