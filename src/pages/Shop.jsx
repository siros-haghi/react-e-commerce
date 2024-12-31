import React, { useState } from "react";
import PageHeading from "../common/PageHeading";
import { products } from "../data/Data";
import { BiCart } from "react-icons/bi";
import Modal from "../common/Modal";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { IoMdHeartEmpty, IoMdSearch } from "react-icons/io";
import { BiCategoryAlt } from "react-icons/bi";
import { BiFilterAlt } from "react-icons/bi";
import { BiHome } from "react-icons/bi";
import { SlUser } from "react-icons/sl";
import { MdOutlineShoppingBag } from 'react-icons/md';


const Shop = () => {
  const [isModalOpen, setIsModalOpen] = useState(null);

  const handleOpen = (productId) => {
    setIsModalOpen(productId);
  };
  const handleClose = () => {
    setIsModalOpen(null);
  };

  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    priceRange: [0, 1500],
  });

  const categoryList = Array.from(
    new Set(products.map((product) => product.category))
  );

  const brandList = Array.from(
    new Set(products.map((product) => product.brand))
  );

  const filteredProducts = products.filter((product) => {
    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(product.category)
    )
      return false;
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand))
      return false;

    const price = parseFloat(product.price);

    if (price < filters.priceRange[0] || price > filters.priceRange[1])
      return false;

    return true;
  });

  const handlePriceChange = (value) => {
    setFilters({ ...filters, priceRange: value });
  };

  const handleCheckboxChange = (filterType, value) => {
    const updatedFilters = [...filters[filterType]];
    const index = updatedFilters.indexOf(value);
    if (index === -1) {
      updatedFilters.push(value);
    } else {
      updatedFilters.splice(index, 1);
    }
    setFilters({ ...filters, [filterType]: updatedFilters });
  };


  const [isChecked, setIsChecked] = useState(false);

  const handleToggleChange = () => {
    setIsChecked((prevState) => {
      const newState = !prevState;
      return newState;
    });
  };

  return (
    <div>
      <div className="hidden md:flex">
        <PageHeading home={"home"} pagename={"Shop"} />
      </div>


      <div className="w-screen fixed top-0 left-0 z-50 mx-auto h-[50px] bg-[#afafaf] flex items-center md:hidden">
        <div className="text-2xl items-center flex">
          <label htmlFor="toggle" className="mx-2">Filter</label>
          <div className="flex items-center justify-between">
            <label htmlFor="toggle" className="inline-flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  id="toggle"
                  className="sr-only peer"
                  checked={isChecked}
                  onChange={handleToggleChange}
                />

                <div className="block bg-slate-500 w-14 h-7 rounded-full border-2 border-transparent transition-colors duration-300 peer-checked:bg-slate-50 peer-checked:border-blue-800 peer-checked:border-6"></div>
                <div className="absolute left-1 top-1 bg-stone-800 w-5 h-5 rounded-full shadow-lg transition-all duration-300 peer-checked:translate-x-7 peer-checked:bg-blue-700 peer-checked:shadow-xl"></div>
              </div>
            </label>
          </div>
        </div>
      </div>


      <div>
        <div className="w-10/12 m-auto flex gap-3 items-start relative mt-8 md:mt-16">
          <div className={`filterproduct w-screen md:w-2/12  transition-all ease-in-out duration-1000  bg-gray-300 md:bg-neutral-100 rounded-lg p-4 
          ${isChecked ? 'max-md:bottom-0 top-6' : 'max-md:-bottom-full'} z-40 md:z-10 
          fixed md:sticky bottom-0 md:top-28 left-0 md:min-w-max overflow-y-auto
           flex flex-col 

           `}>
            <div className="sticky top-0 left-0">


              <div className="my-4">
                <h1 className="mb-3 text-xl font-semibold">By Price</h1>
                <div>
                  <Slider
                    min={0}
                    max={1500}
                    range
                    defaultValue={filters.priceRange}
                    onChange={handlePriceChange}
                  />

                  <div className="flex justify-between">
                    <span>Min Price:${filters.priceRange[0]}</span>
                    <span>Max Price:${filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div className="my-4">
                <h1 className="mb-3 text-xl font-semibold">By Category</h1>

                <div>
                  {categoryList.map((category, key) => (
                    <div className="flex items-center border-b py-1 border-b-slate-300 md:border-b-slate-200" key={key}>
                      <input
                        className="w-4 h-4 mr-2"
                        type="checkbox"
                        checked={filters.categories.includes(category)}
                        onChange={() =>
                          handleCheckboxChange("categories", category)
                        }
                      />
                      <div className="text-sm text-gray-800">{category}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="my-4">
                <h1 className="mb-3 text-xl font-semibold">By Brand</h1>
                <div>
                  {brandList.map((brand, key) => (
                    <div className="flex items-center border-b py-1  border-b-slate-300 md:border-b-slate-200" key={key}>
                      <input
                        className="w-4 h-4 mr-2"
                        type="checkbox"
                        checked={filters.brands.includes(brand)}
                        onChange={() => handleCheckboxChange("brands", brand)}
                      />
                      <div className="text-sm text-gray-800">{brand}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-12/12">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {filteredProducts.map((item, index) => (
                <div key={index}>
                  <div className="overflow-hidden relative ml-0 md:ml-4">
                    <div className="image-container relative">
                      <div className="rounded-3xl">
                        <img src={item.img} alt="img" className="rounded-3xl" />
                      </div>

                      <div className="absolute top-0 right-0 m-1 opacity-0">
                        <div className="bg-white p-2 lg:p-4 rounded-full md-2">
                          <IoMdHeartEmpty />
                        </div>

                        <div className="bg-white p-2 lg:p-4 rounded-full">
                          <IoMdSearch />
                        </div>
                      </div>
                      <div className="opacity-0 absolute -bottom-3 right-0 bg-white p-1 rounded-s-2xl">
                        <div className="bg-black text-white h-8 w-8 lg:w-10 lg:h-10 grid place-items-center rounded-3xl">
                          <button
                            className="text-xl"
                            onClick={() => handleOpen(item.id)}
                          >
                            <BiCart />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="product-details mt-2">
                      <p className="mb-2">{item.title}</p>
                      <p>${item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Modal
          data={products.find((item) => item.id === isModalOpen)}
          isModalOpen={isModalOpen}
          handleClose={handleClose}
        />
      </div>
    </div>
  );
};

export default Shop;
