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
      <div className="flex items-center justify-center">
        <input
          type="text"
          placeholder="Search for products"
          className="w-full px-4 py-2 border border-gray-300 rounded-full mb-5 font-Lato"
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default SearchBar;
