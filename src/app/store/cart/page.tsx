"use client"


import React, { useState } from "react";
import { productData } from "@/enums/productData";

// List of IDs to display
const aids = [
  "2aa8253e-9e81-4c06-b3d3-d564a164bff8",
  "73da0c10-2a08-4f94-9b6a-b3df7305b3d1",
  "86373408-bb6e-4f00-a2b2-0e2b2b8bb741",
  "35af6c55-ef24-4dbb-9b02-b3df85198176"
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(
    productData.filter((product) => aids.includes(product.id)).map((item) => ({ ...item, quantity: 1 }))
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to remove this item from the cart?")) {
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

  const grandTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return <div className="text-center text-gray-600">Your cart is empty.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Cart</h1>
      <div className="grid grid-cols-1 xl:px-32 md:px-10 px-5 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="group cursor-pointer bg-custom-fg-light shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition duration-300"
          >
            {/* Illustration with gradient overlay */}
            <div className="relative h-48 bg-gray-200">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 group-hover:opacity-0 transition-opacity duration-300"></div>
              <div className="flex items-center justify-center h-full">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>
            <div className="p-6">
              <span className="block text-xl font-semibold text-white">
                {item.number}
              </span>
              <h3 className="text-2xl font-bold text-gray-100 mt-2">
                {item.name}
              </h3>
              <p className="text-gray-300 mt-4 font-serif">{item.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-gray-100 text-xl font-bold">{formatCurrency(item.price)}</span>
                <div className="flex items-center space-x-2">
                  <label htmlFor={`quantity-${item.id}`} className="text-sm font-medium text-white">
                    Qty:
                  </label>
                  <select
                    id={`quantity-${item.id}`}
                    className="appearance-none border rounded-md text-gray-800 p-2 bg-white shadow-md focus:outline-none hover:ring-2 ring-gray-300 transition duration-300 w-16 h-10 overflow-y-auto max-h-36"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  >
                    {Array.from({ length: 20 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition flex items-center gap-2 group"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bill Area - New Minimalist Design */}
      <div className="mt-8 p-6 bg-custom-bg-light border-2 border-black rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Bill Summary</h2>
        <div className="space-y-2">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between text-gray-800 text-sm">
              <span className="font-semibold">{item.name} (x{item.quantity})</span>
              <span className="font-semibold">{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        <hr className="my-4" />
        <div className="flex justify-between text-lg font-bold text-gray-900">
          <span>Grand Total</span>
          <span>{formatCurrency(grandTotal)}</span>
        </div>
        <button className="bg-custom-fg-light text-white py-2 px-4 font-semibold rounded-lg hover:bg-transparent border-2 hover:text-custom-fg-light border-custom-fg-light transition">
            Buy Now
          </button>
      </div>
    </div>
  );
};

export default Cart;
