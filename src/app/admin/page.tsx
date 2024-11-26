"use client";
import React, { useState } from "react";

const Form = () => {
  const [products, setProducts] = useState([
    {
      id: "2aa8253e-9e81-4c06-b3d3-d564a164bff8",
      img: "https://picsum.photos/id/237/200",
      relatedImages: [
        "https://picsum.photos/id/237/200",
        "https://picsum.photos/id/11/200",
        "https://picsum.photos/id/12/200",
      ],
      name: "Elegant Gold Necklace",
      description: "A beautiful gold necklace for special occasions.",
      date: "1/11/2024",
      price: 99,
      type: "Clay",
      category: "Necklace",
      order: 54,
      availability: true,
    },
  ]);

  const [formData, setFormData] = useState({
    img: "",
    relatedImages: "",
    name: "",
    description: "",
    date: "",
    price: 0,
    type: "",
    category: "",
    order: 0,
    availability: true,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" || name === "order" ? +value : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      ...formData,
      id: crypto.randomUUID(),
      type: formData.type === "Other" ? formData.type : formData.type,
      category:
        formData.category === "Other" ? formData.category : formData.category,
      relatedImages: formData.relatedImages.split(",").map((img) => img.trim()),
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    console.log("Updated Products JSON:", updatedProducts);
    setFormData({
      img: "",
      relatedImages: "",
      name: "",
      description: "",
      date: "",
      price: 0,
      type: "",
      category: "",
      order: 0,
      availability: true,
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <form
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl space-y-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl font-bold mb-4 text-gray-700">
          Add New Product
        </h1>
        <div>
          <label className="block font-semibold text-gray-600">Image URL</label>
          <input
            type="text"
            name="img"
            value={formData.img}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-600">
            Related Images (comma-separated)
          </label>
          <input
            type="text"
            name="relatedImages"
            value={formData.relatedImages}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-600">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          ></textarea>
        </div>
        <div>
          <label className="block font-semibold text-gray-600">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-600">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-600">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">Select Type</option>
            <option value="Clay">Clay</option>
            <option value="Cloth">Cloth</option>
            <option value="Oxidised">Oxidised</option>
            <option value="Other">Other</option>
          </select>
          {formData.type === "Other" && (
            <input
              type="text"
              name="customType"
              placeholder="Enter custom type"
              value={formData.type}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          )}
        </div>
        <div>
          <label className="block font-semibold text-gray-600">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">Select Category</option>
            <option value="Necklace">Necklace</option>
            <option value="Earrings">Earrings</option>
            <option value="Rings">Rings</option>
            <option value="Anklet">Anklet</option>
            <option value="Set">Set</option>
            <option value="Other">Other</option>
          </select>
          {formData.category === "Other" && (
            <input
              type="text"
              name="customCategory"
              placeholder="Enter custom category"
              value={formData.category}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          )}
        </div>
        <div>
          <label className="block font-semibold text-gray-600">Order</label>
          <input
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-600">
            Availability
          </label>
          <select
            name="availability"
            value={formData.availability ? "true" : "false"}
            onChange={(e) =>
              setFormData({
                ...formData,
                availability: e.target.value === "true",
              })
            }
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Form;
