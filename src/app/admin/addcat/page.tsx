"use client";
import PasskeyModal from "@/components/PasskeyModal";
import React, { useState } from "react";

const AddCategory = () => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
    img: "",
    targetCounter: 0,
  });
  const [isModalOpen, setModalOpen] = useState(true);

  const handlePasskeySubmit = (passkey: string) => {
    if (passkey === "123456") {
      alert("Welcome");
      setModalOpen(false);
    } else {
      alert("wrong passkey");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: name === "targetCounter" ? +value : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = {
      ...categoryData,
      id: crypto.randomUUID(),
    };
    console.log("New Category JSON:", newCategory);
    setCategoryData({
      name: "",
      description: "",
      img: "",
      targetCounter: 0,
    });
  };

  return (
    <div className="p-6 bg-gradient-to-t from-[#f8ede3] to-[#732717] min-h-screen flex flex-col justify-center items-center">
      <form
        className="bg-gradient-to-b from-[#f8ede3] to-[#732717] shadow-lg rounded-lg p-8 w-full max-w-2xl space-y-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl font-bold mb-4 text-[#732717]">
          Add New Category
        </h1>
        <div>
          <label className="block font-semibold text-[#732717]">Name</label>
          <input
            type="text"
            name="name"
            value={categoryData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-[#732717]"
            required
          />
        </div>
        <div>
          <label className="block font-semibold text-[#732717]">
            Description
          </label>
          <textarea
            name="description"
            value={categoryData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-[#732717]"
            required
          ></textarea>
        </div>
        <div>
          <label className="block font-semibold text-custom-bg-light">
            Image URL
          </label>
          <input
            type="text"
            name="img"
            value={categoryData.img}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-[#732717]"
            required
          />
        </div>
        <div>
          <label className="block font-semibold text-custom-bg-light">
            Target Counter
          </label>
          <input
            type="number"
            name="targetCounter"
            value={categoryData.targetCounter}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-[#732717]"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
        >
          Add Category
        </button>
      </form>
      <PasskeyModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handlePasskeySubmit}
      />
    </div>
  );
};

export default AddCategory;
