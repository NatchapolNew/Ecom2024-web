import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { listProduct, searchFilters } from "../Api/Product";
import { listCategory } from "../Api/Category";
import _ from "lodash";
import { Navigate } from "react-router-dom";


const ecomstore = (set, get) => ({
  user: null,
  token: null,
  categories: [],
  products: [],
  carts: [],

  logout: () => {
    set({
      user: null,
      token: null,
      categories: [],
      carts: [],
    });
  },

  actionAddtoCart: (product) => {
    const carts = get().carts;
    const updateCart = [...carts, { ...product, count: 1 }];
    //step unique
    const unique = _.unionWith(updateCart, _.isEqual);
    set({ carts: unique });
  },

  actionUpdateQuantity: (productId, newQuantity) => {
    set((state) => ({
      carts: state.carts.map((item) =>
        item.id === productId
          ? { ...item, count: Math.max(1, newQuantity) }
          : item
      ),
    }));
  },

  actionRemoveProduct: (productId) => {
    set((state) => ({
      carts: state.carts.filter((item) => item.id !== productId),
    }));
  },
  GetTotalPrice: () => {
    return get().carts.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);
  },

  actionLogin: async (form) => {
    const res = await axios.post("http://localhost:5001/api/login", form);
    set({
      user: res.data.payload,
      token: res.data.token,
    });
    return res;
  },

  getCategory: async () => {
    try {
      const res = await listCategory();
      set({ categories: res.data });
    } catch (err) {
      console.log(err);
    }
  },

  acitionSearchFilters: async (arg) => {
    try {
      const res = await searchFilters(arg);
      set({ products: res.data });
    } catch (err) {
      console.log(err);
    }
  },

  getProduct: async (count) => {
    try {
      const res = await listProduct(count);
      set({ products: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  clearCart: () => {
    set({ carts: [] });
  },
});

const usePersist = {
  name: "ecom-store",
  storage: createJSONStorage(() => localStorage),
};

const useEcomStore = create(persist(ecomstore, usePersist));

export default useEcomStore;
