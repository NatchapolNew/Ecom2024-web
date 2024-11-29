import axios from "axios";

export const getOrdersAdmin = async (token) => {
  //code body
  return await axios.get("http://localhost:5001/api/admin/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeOrderStatus = async (token, orderId, orderStatus) => {
  //code body
  return await axios.put(
    "http://localhost:5001/api/admin/order-status",
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
  return await axios.get("http://localhost:5001/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const ChangeUserStatus = async (token,value) => {
  //code body
  return await axios.post("http://localhost:5001/api/change-status",value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const ChangeUserRole = async (token,value) => {
  //code body
  return await axios.post("http://localhost:5001/api/change-role",value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};