import axios from "axios";

export const getOrdersAdmin = async (token) => {
  //code body
  return await axios.get("https://ecom2024-api-seven.vercel.app/api/admin/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeOrderStatus = async (token, orderId, orderStatus) => {
  //code body
  return await axios.put(
    "https://ecom2024-api-seven.vercel.app/api/admin/order-status",
    { orderId, orderStatus },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getListAllUsers = async (token) => {
  //code body
  return await axios.get("https://ecom2024-api-seven.vercel.app/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const ChangeUserStatus = async (token,value) => {
  //code body
  return await axios.post("https://ecom2024-api-seven.vercel.app/api/change-status",value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const ChangeUserRole = async (token,value) => {
  //code body
  return await axios.post("https://ecom2024-api-seven.vercel.app/api/change-role",value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};