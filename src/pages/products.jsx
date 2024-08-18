// import { Fragment, useState } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";
// import Layout from "@/components/Layout/Layout";
// import Card from "../components/products/Card";
// import SearchBar from "@/components/ecommerce/SearchBar";
// import { useProductStore } from "@/store";

// export default function ProductsPage() {
//   const [sortOpen, setSortOpen] = useState(false);
//   const [categoryOpen, setCategoryOpen] = useState(false);
//   const [brandOpen, setBrandOpen] = useState(false);
//   const [ratingOpen, setRatingOpen] = useState(false);
//   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
//   const [filtersOpen, setFiltersOpen] = useState(false);
//   const [highToLow, setHighToLow] = useState(false);
//   const [lowToHigh, setLowToHigh] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedBrand, setSelectedBrand] = useState("");
//   const [selectedRating, setSelectedRating] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [productsPerPage] = useState(8); // Number of products per page
//   const [product, setProduct] = useProductStore((state) => [
//     state.product,
//     state.setProduct,
//   ]);

//   function handleHighToLow() {
//     setHighToLow(true);
//     setLowToHigh(false);
//     setProduct(product.sort((a, b) => b.price - a.price));
//   }

//   function handleLowToHigh() {
//     setLowToHigh(true);
//     setHighToLow(false);
//     setProduct(product.sort((a, b) => a.price - b.price));
//   }

//   function handleClearFilters() {
//     setHighToLow(false);
//     setLowToHigh(false);
//     setSelectedCategory("");
//     setSelectedBrand("");
//     setSelectedRating("");
//     setProduct(product.sort((a, b) => a.id - b.id));
//   }

//   function handleCategoryChange(event) {
//     // Implement filtering logic based on category
//   }

//   function handleBrandChange(event) {
//     setSelectedBrand(event.target.value);
//     // Implement filtering logic based on brand
//   }

//   function handleRatingChange(event) {
//     setSelectedRating(event.target.value);
//     // Implement filtering logic based on rating
//   }

//   // Pagination logic
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = product.slice(
//     indexOfFirstProduct,
//     indexOfLastProduct
//   );

//   const totalPages = Math.ceil(product.length / productsPerPage);

//   function handleNextPage() {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   }

//   function handlePreviousPage() {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   }

//   function handlePageChange(pageNumber) {
//     setCurrentPage(pageNumber);
//   }

//   return (
//     <div className="bg-white">
//       <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center border-b border-gray-200 pb-4">
//           {/* <h1 className="text-4xl font-bold tracking-tight text-gray-900">
//             ChicMart
//           </h1> */}
//           {/* <p className="text-base text-gray-500">
//             Beyond fashion, a lifestyle.
//           </p> */}
//         </div>

//         <div className="flex flex-col lg:flex-row mt-6">
//           <main className="w-full lg:w-3/4">
//             <SearchBar />
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
//               {currentProducts.map((product) => (
//                 <Card key={product.id} product={product} />
//               ))}
//             </div>
//             <div className="flex justify-between items-center mt-6">
//               <button
//                 onClick={handlePreviousPage}
//                 disabled={currentPage === 1}
//                 className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
//               >
//                 Previous
//               </button>
//               <div>
//                 {Array.from({ length: totalPages }, (_, index) => (
//                   <button
//                     key={index + 1}
//                     onClick={() => handlePageChange(index + 1)}
//                     className={`px-4 py-2 mx-1 ${
//                       currentPage === index + 1
//                         ? "bg-gray-700 text-white"
//                         : "bg-gray-300 text-gray-700"
//                     } rounded`}
//                   >
//                     {index + 1}
//                   </button>
//                 ))}
//               </div>
//               <button
//                 onClick={handleNextPage}
//                 disabled={currentPage === totalPages}
//                 className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//           </main>

//           <aside className="w-full lg:w-1/4 mt-6 lg:mt-0 lg:ml-4 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
//             <h2 className="text-lg font-medium text-gray-900 flex items-center justify-between">
//               Filters
//               <span
//                 className="material-icons cursor-pointer"
//                 onClick={() => setFiltersOpen(!filtersOpen)}
//               >
//                 {filtersOpen ? "Less" : "More"}
//               </span>
//             </h2>
//             {filtersOpen && (
//               <div className="mt-4 space-y-4">
//                 <div className="border-b border-gray-200 pb-4">
//                   <h3 className="text-sm font-semibold text-gray-900 flex items-center justify-between">
//                     Sort by
//                     <span
//                       className="material-icons cursor-pointer"
//                       onClick={() => setSortOpen(!sortOpen)}
//                     >
//                       {sortOpen ? "Less" : "More"}
//                     </span>
//                   </h3>
//                   {sortOpen && (
//                     <div className="mt-2 space-y-2">
//                       <div className="flex items-center">
//                         <input
//                           type="checkbox"
//                           checked={lowToHigh}
//                           onChange={handleLowToHigh}
//                           className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                         />
//                         <label className="ml-2 text-sm text-gray-700 flex items-center">
//                           {/* <span className="material-icons">arrow_upward</span> */}
//                           Low to High
//                         </label>
//                       </div>
//                       <div className="flex items-center">
//                         <input
//                           type="checkbox"
//                           checked={highToLow}
//                           onChange={handleHighToLow}
//                           className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                         />
//                         <label className="ml-2 text-sm text-gray-700 flex items-center">
//                           {/* <span className="material-icons">arrow_downward</span> */}
//                           High to Low
//                         </label>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 <div className="border-b border-gray-200 pb-4">
//                   <h3 className="text-sm font-semibold text-gray-900 flex items-center justify-between">
//                     Category
//                     <span
//                       className="material-icons cursor-pointer"
//                       onClick={() => setCategoryOpen(!categoryOpen)}
//                     >
//                       {categoryOpen ? "Less" : "More"}
//                     </span>
//                   </h3>
//                   {categoryOpen && (
//                     <div className="mt-2 space-y-2">
//                       <select
//                         value={selectedCategory}
//                         onChange={handleCategoryChange}
//                         className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
//                       >
//                         <option value="">All Categories</option>
//                         <option value="clothing">Clothes</option>
//                         <option value="accessories">Accessories</option>
//                         <option value="footwear">Footwear</option>
//                       </select>
//                     </div>
//                   )}
//                 </div>

//                 <div className="border-b border-gray-200 pb-4">
//                   <h3 className="text-sm font-semibold text-gray-900 flex items-center justify-between">
//                     Brand
//                     <span
//                       className="material-icons cursor-pointer"
//                       onClick={() => setBrandOpen(!brandOpen)}
//                     >
//                       {brandOpen ? "Less" : "More"}
//                     </span>
//                   </h3>
//                   {brandOpen && (
//                     <div className="mt-2 space-y-2">
//                       <select
//                         value={selectedBrand}
//                         onChange={handleBrandChange}
//                         className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
//                       >
//                         <option value="">All Brands</option>
//                         <option value="brandA">ChicMart </option>
//                       </select>
//                     </div>
//                   )}
//                 </div>

//                 <div className="border-b border-gray-200 pb-4">
//                   <h3 className="text-sm font-semibold text-gray-900 flex items-center justify-between">
//                     Rating
//                     <span
//                       className="material-icons cursor-pointer"
//                       onClick={() => setRatingOpen(!ratingOpen)}
//                     >
//                       {ratingOpen ? "Less" : "More"}
//                     </span>
//                   </h3>
//                   {ratingOpen && (
//                     <div className="mt-2 space-y-2">
//                       <select
//                         value={selectedRating}
//                         onChange={handleRatingChange}
//                         className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
//                       >
//                         <option value="">All Ratings</option>
//                         <option value="1">1 Star & Up</option>
//                         <option value="2">2 Stars & Up</option>
//                         <option value="3">3 Stars & Up</option>
//                         <option value="4">4 Stars & Up</option>
//                         <option value="5">5 Stars</option>
//                       </select>
//                     </div>
//                   )}
//                 </div>

//                 <button
//                   type="button"
//                   className="w-full mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                   onClick={handleClearFilters}
//                 >
//                   Clear filters
//                 </button>
//               </div>
//             )}
//           </aside>
//         </div>
//       </div>
//     </div>
//   );
// }
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";
import Layout from "@/components/Layout/Layout";
import Card from "../components/products/Card";
import SearchBar from "@/components/ecommerce/SearchBar";
import { useProductStore } from "@/store";

export default function ProductsPage() {
  const [sortOpen, setSortOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [highToLow, setHighToLow] = useState(false);
  const [lowToHigh, setLowToHigh] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); // Number of products per page

  const [product, setProduct] = useProductStore((state) => [
    state.product,
    state.setProduct,
  ]);

  const [filteredProducts, setFilteredProducts] = useState(product);

  useEffect(() => {
    let filtered = [...product];

    if (selectedCategory) {
      filtered = filtered.filter(
        (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, product]);

  function handleHighToLow() {
    setHighToLow(true);
    setLowToHigh(false);
    setFilteredProducts(filteredProducts.sort((a, b) => b.price - a.price));
  }

  function handleLowToHigh() {
    setLowToHigh(true);
    setHighToLow(false);
    setFilteredProducts(filteredProducts.sort((a, b) => a.price - b.price));
  }

  function handleClearFilters() {
    setHighToLow(false);
    setLowToHigh(false);
    setSelectedCategory("");
    setSelectedBrand("");
    setSelectedRating("");
    setFilteredProducts(product);
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  function handleNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          {/* <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            ChicMart
          </h1> */}
          {/* <p className="text-base text-gray-500">
            Beyond fashion, a lifestyle.
          </p> */}
        </div>

        <div className="flex flex-col lg:flex-row mt-6">
          <main className="w-full lg:w-3/4">
            <SearchBar />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
              {currentProducts.map((product) => (
                <Card key={product.id} product={product} />
              ))}
            </div>
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <div>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 mx-1 ${
                      currentPage === index + 1
                        ? "bg-gray-700 text-white"
                        : "bg-gray-300 text-gray-700"
                    } rounded`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </main>

          <aside className="w-full lg:w-1/4 mt-6 lg:mt-0 lg:ml-4 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 flex items-center justify-between">
              Filters
              <span
                className="material-icons cursor-pointer"
                onClick={() => setFiltersOpen(!filtersOpen)}
              >
                {filtersOpen ? "Less" : "More"}
              </span>
            </h2>
            {filtersOpen && (
              <div className="mt-4 space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-sm font-semibold text-gray-900 flex items-center justify-between">
                    Sort by
                    <span
                      className="material-icons cursor-pointer"
                      onClick={() => setSortOpen(!sortOpen)}
                    >
                      {sortOpen ? "Less" : "More"}
                    </span>
                  </h3>
                  {sortOpen && (
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={lowToHigh}
                          onChange={handleLowToHigh}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="ml-2 text-sm text-gray-700 flex items-center">
                          Low to High
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={highToLow}
                          onChange={handleHighToLow}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="ml-2 text-sm text-gray-700 flex items-center">
                          High to Low
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-sm font-semibold text-gray-900 flex items-center justify-between">
                    Category
                    <span
                      className="material-icons cursor-pointer"
                      onClick={() => setCategoryOpen(!categoryOpen)}
                    >
                      {categoryOpen ? "Less" : "More"}
                    </span>
                  </h3>
                  {categoryOpen && (
                    <div className="mt-2 space-y-2">
                      <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">All Categories</option>
                        <option value="clothes">Clothes</option>
                        <option value="accessories">Accessories</option>
                        <option value="footwear">Footwear</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Other filter sections like Brand, Rating, etc. */}

                <button
                  type="button"
                  className="w-full mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={handleClearFilters}
                >
                  Clear filters
                </button>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

