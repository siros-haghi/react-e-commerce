import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getCartTotal, removeItem, updateQuantity } from "../redux/cartSlice";
import PageHeading from "../common/PageHeading";
import { PiMinus, PiPlus } from "react-icons/pi";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { data: cartProducts, totalAmount } = useSelector(
    (state) => state.cart
  );

  // const cartSelector = useSelector((state) => state.cart);
  // useEffect(() => {
  //   dispatch(getCartTotal());
  // }, [cartSelector]);

  const removeFromCart = (itemId) => {
    dispatch(removeItem({ id: itemId }));
    dispatch(getCartTotal());
  };

  const increaseQuantity = (itemId, currentQuantity) => {
    dispatch(updateQuantity({ id: itemId, quantity: currentQuantity + 1 }));
    dispatch(getCartTotal());
  };
  const decreaseQuantity = (itemId, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ id: itemId, quantity: currentQuantity - 1 }));
      dispatch(getCartTotal());
    }
  };

  return (
    <div>
      <div>
        <PageHeading home={"home"} pagename={"Cart"} />
      </div>
      <div className="w-10/12 m-auto">
        <div className="mt-8">
          {cartProducts.length === 0 ? (
            <div className="text-3xl font-bold uppercase">
              Your Cart has No Product
            </div>
          ) : (
            <div>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                  <thead className="bg-blue-950 text-white font-semibold">
                    <tr>
                      <th className="px-4 py-2"></th>
                      <th className="px-4 py-2">Product</th>
                      <th className="px-4 py-2">Price</th>
                      <th className="px-4 py-2">Quantity</th>
                      <th className="px-4 py-2">SubTotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartProducts.map((item, key) => (
                      <tr key={key}>
                        <td className="text-center px-4 py-2">
                          <span
                            className="text-red-500"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <FaTimes />
                          </span>
                        </td>
                        <td className="text-center px-4 py-2">
                          <div className="min-w-max flex items-center justify-start">
                            <img
                              src={item.img}
                              alt="img"
                              className="h-40 w-40 object-contain mr-2"
                            />
                            <p className="font-semibold">{item.title}</p>
                          </div>
                        </td>
                        <td className="text-center px-4 py-2">${item.price}</td>
                        <td className="text-center px-4 py-2">
                          <div className="flex mr-3">
                            <button
                              className="border mt-4 py-3 px-6"
                              onClick={() =>
                                decreaseQuantity(item.id, item.quantity)
                              }
                            >
                              <PiMinus />
                            </button>
                            <span className="border mt-4 py-3 px-6 count">
                              {item.quantity || 1}
                            </span>
                            <button
                              className="border mt-4 py-3 px-6"
                              onClick={() =>
                                increaseQuantity(item.id, item.quantity)
                              }
                            >
                              <PiPlus />
                            </button>
                          </div>
                        </td>
                        <td className="text-center px-4 py-2">
                          ${item.price * item.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-6 w-2/5 min-w-min rounded-2xl shadow-2xl bg-white font-bold mt-4">
                <h1 className="mb-4 text-center text-xl md:text-2xl">Cart Total</h1>
                <h2 className="flex justify-between mt-3">
                  Sub Total : <span>${totalAmount}</span>
                </h2>

                <div className="flex justify-between mt-3">
                  Shipping Charge : <span>${10}</span>
                </div>

                <div className="flex justify-between mt-3">
                  Grand Total : <span>$ {totalAmount + 10}</span>
                </div>

                <div className="whitespace-nowrap flex flex-col gap-2 md:gap-0 md:flex-row items-center justify-between mt-4">
                  <div className="px-4 py-2 common-hover rounded-lg text-white md:mr-2">
                    <Link>Proceed To Checkout</Link>
                  </div>

                  <div className="px-6 py-2 bg-rose-800 rounded-lg text-white">
                    <Link to={"/shop"}>Continue Shopping</Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
 