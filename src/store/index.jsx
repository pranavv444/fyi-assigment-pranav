import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const productStore = (set) => ({
  product: [],
  setProduct: (data) => set({ product: data }),
});

export const useProductStore = create(
  persist(productStore, {
    name: "product-data", // name of the item in the storage (must be unique)
  })
);

const cartStore = (set) => ({
  cart: [],
  setCart: (data) => set({ cart: data }),
});

export const useCartStore = create(
  persist(cartStore, {
    name: "cart-data", // name of the item in the storage (must be unique)
  })
);

const likeStore = (set) => ({
  like: [],
  setLike: (data) => set({ like: data }),
});

export const useLikeStore = create(
  persist(likeStore, {
    name: "like-data", // name of the item in the storage (must be unique)
  })
);
