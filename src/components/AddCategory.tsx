"use client";
import React, { useState } from "react";

const AddCategory = ({ onBack }) => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
    img: "",
    targetCounter: 0,
  });

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
          <label className="block font-semibold text-[#732717]">
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
          <label className="block font-semibold text-[#732717]">
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
      <button
        onClick={onBack}
        className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
      >
        Back to Product Form
      </button>
    </div>
  );
};

export default AddCategory;
