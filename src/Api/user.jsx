import axios from "axios";

export const createUserCart = async (token, cart) => {
  //code body
  return await axios.post("https://ecom2024-api-seven.vercel.app/api/user/cart", cart, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listUserCart = async (token) => {
  //code body
  return await axios.get("https://ecom2024-api-seven.vercel.app/api/user/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const saveAddress = async (token, address) => {
  //code body
  return await axios.post(
    "https://ecom2024-api-seven.vercel.app/api/user/address",
    { address },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const saveOrder = async (token, payload) => {
  //code body
  return await axios.post("https://ecom2024-api-seven.vercel.app/api/user/order", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getOrders = async (token) => {
  //code body
  return await axios.get("https://ecom2024-api-seven.vercel.app/api/user/order", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
