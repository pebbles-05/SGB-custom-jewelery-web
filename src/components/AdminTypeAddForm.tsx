import React, { useState } from "react";

const AdminTypeAddForm = ({
  name = "",
  buttonTitle = "Add Type",
  title = "Add Type",
  onsubmit,
}) => {
  const [formData, setFormData] = useState({
    name: name,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      [name]: value,
    });
  };
  const handleSubmit = () => {
    onsubmit(formData);
  };
  return (
    <div className="bg-gradient-to-b from-[#f8ede3] to-[#732717] shadow-lg rounded-lg p-8 w-[60vw] max-h-[80vh] overflow-auto max-w-4xl">
      <h1 className="text-xl font-bold mb-4 text-[#732717]">{title}</h1>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-[#732717]"
      />
      <button
        onClick={handleSubmit}
        disabled={!formData?.name}
        className={`w-full text-white py-2 rounded-md ${
          !formData?.name ? "bg-custom-black/30" : "bg-green-500"
        }`}
      >
        {buttonTitle}
      </button>
    </div>
  );
};

export default AdminTypeAddForm;
