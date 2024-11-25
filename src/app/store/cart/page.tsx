"use client";

import React, { useState } from "react";
import productData from "@/enums/productData.json";

// List of IDs to display
const aids = [
  "2aa8253e-9e81-4c06-b3d3-d564a164bff8",
  "73da0c10-2a08-4f94-9b6a-b3df7305b3d1",
  "86373408-bb6e-4f00-a2b2-0e2b2b8bb741",
  "35af6c55-ef24-4dbb-9b02-b3df85198176",
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(
    productData
      .filter((product) => aids.includes(product.id))
      .map((item) => ({ ...item, quantity: 1 }))
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const handleRemove = (id) => {
    if (
      window.confirm("Are you sure you want to remove this item from the cart?")
    ) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    }
  };

  const handleQuantityChange = (id, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: parseInt(quantity, 10) } : item
      )
    );
  };

  const grandTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return <div className="text-center text-gray-600">Your cart is empty.</div>;
  }

  return (
    <div className="container mx-auto  flex flex-col lg:flex-row gap-8  lg:max-h-[89vh]">
      {/* Left Section (Products List) */}
      <div className="w-full lg:w-3/4 space-y-6 lg:overflow-y-auto lg:max-h-screen lg:scroll-m-5 lg:p-4 sm:p-12 ">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Your Cart
        </h1>

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center lg:space-x-6 md:space-x-4 bg-white shadow-xl rounded-lg p-6 hover:scale-95 transition-all duration-300 ease-in-out transform"
          >
            {/* Product Image */}
            <div className="w-28 h-28 flex-shrink-0">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500 mt-2">{item.description}</p>
            </div>

            {/* Product Price & Quantity */}
            <div className="flex flex-col items-end space-y-2">
              <span className="text-lg font-semibold text-gray-900">
                {formatCurrency(item.price)}
              </span>
              <div className="flex items-center space-x-3">
                <label
                  htmlFor={`quantity-${item.id}`}
                  className="text-sm text-gray-700"
                >
                  Qty:
                </label>
                <select
                  id={`quantity-${item.id}`}
                  className="w-16 h-10 text-gray-800 p-2 bg-gray-100 rounded-md shadow-sm focus:outline-none"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, e.target.value)
                  }
                >
                  {Array.from({ length: 20 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Right Section (Sticky Bill Summary) */}
      <div className="w-full lg:w-1/4 lg:sticky lg:top-20 bg-white shadow-xl p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Bill Summary</h2>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between text-gray-700">
              <span className="font-semibold">
                {item.name} (x{item.quantity})
              </span>
              <span className="font-semibold">
                {formatCurrency(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
        <hr className="my-4" />
        <div className="flex justify-between text-xl font-bold text-gray-900">
          <span>Grand Total</span>
          <span>{formatCurrency(grandTotal)}</span>
        </div>
        <button className="mt-6 w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
