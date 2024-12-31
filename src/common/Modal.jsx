import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { PiMinus, PiPlus } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { addToCart, getCartTotal, updateQuantity } from "../redux/cartSlice";
import { Link } from "react-router-dom";

const Modal = ({ isModalOpen, handleClose, data }) => {
  const [qty, setQty] = useState(1);
  const [addedItemToCart, setAddedItemToCart] = useState(false);

  const dispatch = useDispatch();

  const addItemToCart = (product) => {
    let totalPrice = qty * product.price;

    const tempProduct = {
      ...product,
      quantity: qty,
      totalPrice,
    };

    dispatch(addToCart(tempProduct));
    dispatch(getCartTotal());
    setAddedItemToCart(true);
  };

  useEffect(() => {
    if (isModalOpen) {
      // document.body.classList.add("modal-open");
    } else {
      setQty(1);
      setAddedItemToCart(false);
      // document.body.classList.remove("modal-open");
    }
  }, [isModalOpen]);

  const increaseQuantity = (itemId, currentQuantity) => {
    const newQty = currentQuantity + 1;
    setQty(newQty);
    dispatch(updateQuantity({ id: itemId, quantity: newQty }));
  };
  const decreaseQuantity = (itemId, currentQuantity) => {
    const newQty = Math.max(currentQuantity - 1, 1);
    setQty(newQty);
    dispatch(updateQuantity({ id: itemId, quantity: newQty }));
  };

  return (
    <div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content w-2/3 h-auto relative bg-white overflow-hidden">
            <span
              className="absolute top-0 right-0 p-4"
              onClick={() => handleClose()}
            >
              <FaTimes />
            </span>
            <div className="flex flex-col lg:flex-row">
              <div className="">
                <div className="flash_sale_img">
                  <img src={data.img} alt="img" className="object-fill"/>
                </div>
              </div>

              <div className="modal-info ml-0 lg:ml-6">
                <p className="mb-2 font-bold">{data.short_description}</p>
                <p className="text-red-600 text-xl">${data.price}</p>
                <p className="my-2 hidden md:flex">${data.description}</p>
                <p className="my-2 flex md:hidden">${data.description.slice(0, 40)}...</p>

                <div className="flex items-center mb-2">
                  <p className="font-semibold mr-2 text-xs md:text-xl">Shades:</p>
                  <select
                    name="shades"
                    id="sahges"
                    className="border border-gray-300 rounded-md p-2 focus:outline-none text-xs md:text-xl"
                  >
                    <option value="options">Choose an Options</option>
                    <option value="options">1 Choose an Options</option>
                    <option value="options"> 2 Choose an Options</option>
                    <option value="options">3 Choose an Options</option>
                    <option value="options"> 4Choose an Options</option>
                  </select>
                </div>
                <p className="text-green-700 m-0 text-xs md:text-xl">In Stock 400 Items</p>
                <div className="flex items-center">
                  <div className="flex mr-2">
                    <button
                      className="border mt-4 py-2 px-2"
                      onClick={() => decreaseQuantity(data.id, qty)}
                    >
                      <PiMinus />
                    </button>
                    <span className="border mt-4 py-2 px-3 count">
                      {qty || 1}
                    </span>
                    <button
                      className="border mt-4 py-2 px-2"
                      onClick={() => increaseQuantity(data.id, qty)}
                    >
                      <PiPlus />
                    </button>
                  </div>

                  <div className="addtocart mr-1">
                    {addedItemToCart ? (
                      <button className="mt-4 py-3 px-2 text-white text-xs font-semibold">
                        <Link to="/cart">View Cart</Link>
                      </button>
                    ) : (
                      <button
                        onClick={() => addItemToCart(data)}
                        className="mt-4 py-3 px-2 text-white text-xs font-semibold"
                      >
                        Add To Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
