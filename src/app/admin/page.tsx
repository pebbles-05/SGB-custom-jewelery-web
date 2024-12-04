"use client";
import PasskeyModal from "@/components/PasskeyModal";
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
  const [isModalOpen, setModalOpen] = useState(true);

  const handlePasskeySubmit = (passkey: string) => {
    if (passkey === "123456") {
      alert("Welcome");
      setModalOpen(false);
    } else {
      alert("wrong passkey");
    }
  };
  const [formData, setFormData] = useState({
    img: "",
    relatedImages: "",
    name: "",
    description: "",
    date: "",
    price: 0,
    type: "",
    customType: "",
    category: "",
    customCategory: "",
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
      type: formData.type === "Other" ? formData.customType : formData.type,
      category:
        formData.category === "Other"
          ? formData.customCategory
          : formData.category,
      relatedImages: formData.relatedImages.split(",").map((img) => img.trim()),
    };
    delete newProduct?.customCategory;
    delete newProduct?.customType;
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
      customType: "",
      category: "",
      customCategory: "",
      order: 0,
      availability: true,
    });
  };

  return (
    <div className="p-6 bg-gradient-to-t from-[#f8ede3] to-[#732717] min-h-screen flex justify-center items-center">
      <form
        className="bg-gradient-to-b from-[#f8ede3] to-[#732717] shadow-lg rounded-lg p-8 w-full max-w-2xl space-y-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl font-bold mb-4 text-[#732717]">
          Add New Product
        </h1>
        <div>
          <label className="block font-semibold text-[#732717]">
            Image URL
          </label>
          <input
            type="text"
            name="img"
            value={formData.img}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-[#732717]"
            required
          />
        </div>
        <div>
          <label className="block font-semibold text-[#732717]">
            Related Images (comma-separated)
          </label>
          <input
            type="text"
            name="relatedImages"
            value={formData.relatedImages}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-[#732717]"
          />
        </div>
        <div>
          <label className="block font-semibold text-[#732717]">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
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
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-[#732717]"
            required
          ></textarea>
        </div>
        <div>
          <label className="block font-semibold text-[#732717]">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-[#f8ede3]"
            required
          />
        </div>
        <div>
          <label className="block font-semibold text-[#f8ede3]">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-[#f8ede3]"
            required
          />
        </div>
        <div>
          <label className="block font-semibold text-[#f8ede3]">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-[#f8ede3]"
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
              value={formData.customType}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:ring-[#f8ede3]"
              required
            />
          )}
        </div>
        <div>
          <label className="block font-semibold text-[#f8ede3]">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-[#f8ede3]"
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
              value={formData.customCategory}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:ring-[#f8ede3]"
              required
            />
          )}
        </div>
        <div>
          <label className="block font-semibold text-[#f8ede3]">Order</label>
          <input
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-[#f8ede3]"
          />
        </div>
        <div>
          <label className="block text-[#f8ede3] font-semibold focus:ring-[#f8ede3]">
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
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-[#f8ede3]"
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
        >
          Add Product
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

export default Form;
