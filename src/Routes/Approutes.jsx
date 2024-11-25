import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cart from "../Pages/Cart";
import Home from "../Pages/Home";
import Shop from "../Pages/Shop";
import History from "../Pages/User/History";
import Checkout from "../Pages/Checkout";
import Login from "../Pages/Authen/Login";
import Register from "../Pages/Authen/Register";
import Layout from "../Layouts/Layout";
import LayoutAdmin from "../Layouts/LayoutAdmin";
import Dashboard from "../Pages/Admin/Dashboard";
import Category from "../Pages/Admin/Category";
import Manage from "../Pages/Admin/Manage";
import LayoutUser from "../Layouts/LayoutUser";
import HomeUser from "../Pages/User/HomeUser";
import ProtectRouteUser from "./ProtectRouteUser";
import ProtectRouteAdmin from "./ProtectRouteAdmin";
import Product from "../Pages/Admin/Product";
import EditProduct from "../Pages/Admin/EditProduct";
import Payment from "../Pages/User/Payment";
import ManageOrders from "../Pages/Admin/manageOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "admin",
    //element: <LayoutAdmin />,
    element: <ProtectRouteAdmin element={<LayoutAdmin />} />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "category", element: <Category /> },
      { path: "product", element: <Product /> },
      { path: "product/:id", element: <EditProduct /> },
      { path: "manage", element: <Manage /> },
      { path: "order", element: <ManageOrders /> },
    ],
  },
  {
    path: "user",
    //element: <LayoutUser />,
    element: <ProtectRouteUser element={<LayoutUser />} />,
    children: [
      { index: true, element: <HomeUser /> },
      { path: "payment", element: <Payment /> },
      { path: "history", element: <History /> },
    ],
  },
]);

const Approutes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Approutes;
