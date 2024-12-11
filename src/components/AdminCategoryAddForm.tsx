import isValidLink from "@/helpers/isValidLink";
import React, { useState } from "react";

const AdminCategoryAddForm = ({
  img = "",
  name = "",
  description = "",
  targetOrderCount = 0,
  buttonTitle = "Add Category",
  title = "Add Category",
  onsubmit,
}) => {
  const [formData, setFormData] = useState({
    img: img,
    name: name,
    description: description,
    targetOrderCount: targetOrderCount,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "targetOrderCount" ? Number(value) : value,
    });
  };
  const handleSubmit = () => {
    onsubmit(formData);
  };
  return (
    <div className="bg-gradient-to-b from-[#f8ede3] to-[#732717] shadow-lg rounded-lg p-8 w-[60vw] max-h-[80vh] overflow-auto max-w-4xl">
      <h1 className="text-xl font-bold mb-4 text-[#732717]">{title}</h1>
      <div>
        <label className="block font-semibold text-[#732717]">Image URL</label>
        <input
          type="text"
          name="img"
          value={formData.img}
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
        ></textarea>
      </div>
      <div>
        <label className="block font-semibold text-[#f8ede3]">Order</label>
        <input
          type="number"
          name="targetOrderCount"
          value={formData.targetOrderCount}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-[#f8ede3]"
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={
          !formData?.description ||
          !formData?.img ||
          !isValidLink(formData?.img) ||
          !formData?.name
        }
        className={`w-full text-white py-2 rounded-md ${
          !formData?.description ||
          !formData?.img ||
          !isValidLink(formData?.img) ||
          !formData?.name
            ? "bg-custom-black/30"
            : "bg-green-500"
        }`}
      >
        {buttonTitle}
      </button>
    </div>
  );
};

export default AdminCategoryAddForm;
