"use client"
import React, { useState } from "react";
import ModalForm from "./ModalForm";

const TestPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const products = [
    { name: "Product 1", price: 200 },
    { name: "Product 2", price: 300 },
  ];

  const handleModalSubmit = (emailData: string) => {
    console.log("Email Data:", emailData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-800 flex items-center justify-center">
      <button
        className="bg-white bg-opacity-20 text-white py-2 px-4 rounded-lg"
        onClick={() => setIsModalOpen(true)}
      >
        Open Modal
      </button>

      <ModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        products={products}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default TestPage;