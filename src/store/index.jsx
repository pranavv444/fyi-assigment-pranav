import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { products } from "@/data";

const productStore = (set) => ({
  product: products, 
  setProduct: (data) => {
    set({ product: data });
    localStorage.setItem("product-data", JSON.stringify(data));
  },
});

export const useProductStore = create(
  persist(productStore, {
    name: "product-data",
    storage: createJSONStorage(() => localStorage),
  })
);

const cartStore = (set) => ({
  cart: [],
  setCart: (data) => set({ cart: data }),
});

export const useCartStore = create(
  persist(cartStore, {
    name: "cart-data",
    storage: createJSONStorage(() => localStorage),
  })
);

const likeStore = (set) => ({
  like: [],
  setLike: (data) => set({ like: data }),
});

export const useLikeStore = create(
  persist(likeStore, {
    name: "like-data",
    storage: createJSONStorage(() => localStorage),
  })
);
