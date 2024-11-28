"use client";

import React, { useState } from "react";
import useCartList from "@/helpers/useCartList";
import Image from "next/image";
import Link from "next/link";
import RemoveCartItemPopup from "@/components/RemoveCartItemPopup";
import ModalForm from "@/components/ModalForm";
import useProductList from "@/helpers/useProductList";

const Cart = () => {
  const {
    data: productData,
    error: productDataError,
    isLoading: isProductDataLoading,
  } = useProductList();
  const { getCartList, setCartListById, removeCartList, removeCartItemById } =
    useCartList();
  const [cartItems, setCartItems] = useState(getCartList());
  const [isConfirmationModalOpen, setisConfirmationModalOpen] = useState(false);
  const [removalProductId, setremovalProductId] = useState("");
  const [isClearAllCartButtonClicked, setIsClearAllCartButtonClicked] =
    useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const handleRemove = (id?: string) => {
    if (isClearAllCartButtonClicked) {
      removeCartList();
      setCartItems(getCartList());
      setIsClearAllCartButtonClicked(false);
      setisConfirmationModalOpen(false);
    } else if (id) {
      removeCartItemById(id);
      setCartItems(getCartList());
      setisConfirmationModalOpen(false);
    }
  };

  const handleQuantityChange = (id, quantity) => {
    setCartListById(productData, id, quantity);
    setCartItems(getCartList());
  };

  const grandTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const handleSubmit = () => {
    setIsModalOpen(true);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [submissionMessage, setSubmissionMessage] = useState("");
  const handleModalSubmit = (emailData: string) => {
    console.log("Email Data:", emailData);
  };

  return (
    <div className="container mx-auto  flex flex-col lg:flex-row gap-8  lg:max-h-[89vh]">
      {/* Left Section (Products List) */}
      <div className="w-full lg:w-3/4 space-y-6 lg:overflow-y-auto lg:max-h-screen lg:scroll-m-5 lg:p-4 sm:p-12 mt-5">
        <div className="grid grid-cols-3 gap-2 items-center text-4xl font-bold text-center mb-6 text-gray-800">
          <Link href="/store" className="justify-self-start text-xl">
            ← store
          </Link>

          <span>Your Cart</span>
          <Link
            href="#Bill"
            className="justify-self-end text-xl flex lg:hidden"
          >
            ↓ Bill
          </Link>
        </div>
        <div className="flex justify-end">
          {cartItems?.length ? (
            <button
              onClick={() => {
                setisConfirmationModalOpen();
                setIsClearAllCartButtonClicked(true);
              }}
              className="mt-6  w-1/5 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Clear cart
            </button>
          ) : null}
        </div>

        {!isProductDataLoading && !productDataError && cartItems?.length ? (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row gap-5 mx-10 sm:mx-0 sm:gap-0 items-center lg:space-x-6 md:space-x-4 bg-white shadow-xl rounded-lg p-6 hover:scale-95 transition-all duration-300 ease-in-out transform"
            >
              {/* Product Image */}
              <Link
                href={`/store/${item.id}`}
                target="_blank"
                className="w-28 h-28 flex-shrink-0"
              >
                <Image
                  src={item.img}
                  width={500}
                  height={500}
                  loading="lazy"
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </Link>

              {/* Product Details */}
              <Link
                href={`/store/${item.id}`}
                target="_blank"
                className="flex-1"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 mt-2 sm:flex hidden">
                  {item.description}
                </p>
              </Link>

              {/* Product Price & Quantity */}
              <div className="flex flex-col items-end space-y-2">
                <div className="flex sm:flex-col flex-row items-center justify-between gap-10 sm:gap-0">
                  <span className="text-lg font-semibold text-gray-900">
                    {formatCurrency(item.price * item.quantity)}
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
                </div>
                <button
                  className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
                  onClick={() => {
                    setisConfirmationModalOpen(true);
                    setremovalProductId(item.id);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full h-[calc(100vh-20rem)] flex items-center justify-center">
            Your Cart is Empty
          </div>
        )}
      </div>

      {/* Right Section (Sticky Bill Summary) */}
      <div
        id="Bill"
        className="w-full lg:w-1/4 lg:sticky lg:top-20 bg-white shadow-xl p-6 rounded-lg"
      >
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
        {cartItems?.length ? (
          <button
            onClick={handleSubmit}
            className="mt-6 w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Checkout
          </button>
        ) : null}
      </div>
      <RemoveCartItemPopup
        headerClass="text-xl"
        buttonClass="text-xs"
        title={
          isClearAllCartButtonClicked
            ? "Do you want to remove All items from cart?"
            : "Do you want to remove this item?"
        }
        isConfirmationModalOpen={isConfirmationModalOpen}
        onClickOutside={() => {
          setisConfirmationModalOpen(false);
          setIsClearAllCartButtonClicked(false);
        }}
        onCancel={() => {
          setisConfirmationModalOpen(false);
          setIsClearAllCartButtonClicked(false);
        }}
        onRemove={() => handleRemove(removalProductId)}
      />
      <ModalForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSubmissionMessage("");
        }}
        products={cartItems}
        onSubmit={handleModalSubmit}
        setSubmissionMessage={setSubmissionMessage}
        SubmissionMessage={submissionMessage}
      />
    </div>
  );
};

export default Cart;
