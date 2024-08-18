import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useProductStore } from "@/store";
import { products } from "@/data/index";

function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const [product, setProduct] = useProductStore((state) => [
    state.product,
    state.setProduct,
  ]);

  function handleChange(e) {
    setKeyword(e.target.value);

    const filteredProducts = product.filter((product) =>
      product.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setProduct(filteredProducts);
    if (e.target.value === "") {
      setProduct(products);
    }
  }

  return (
    <>
      <div className="flex items-center justify-center mt-5">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search for products"
            className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={handleChange}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchBar;