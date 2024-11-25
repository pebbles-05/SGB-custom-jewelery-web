"use client"
import React, { useState } from "react";
import ModalForm from "./ModalForm";

const TestPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const products = [
    { name: "Product 1", price: 200 },
    { name: "Product 2", price: 300 },
  ];
  const [submissionMessage, setSubmissionMessage] = useState("");
  const handleModalSubmit = (emailData: string) => {
    console.log("Email Data:", emailData);
  };

  return (
    <div className="min-h-screen bg-custom-bg-light flex items-center justify-center">
      <button
        className="bg-custom-fg-light text-white py-2 px-4 rounded-lg"
        onClick={() => setIsModalOpen(true)}
      >
        Open Modal
      </button>

      {/* <ModalForm
        isOpen={isModalOpen}
        onClose={() => {setIsModalOpen(false)
            setSubmissionMessage("")
        }}
        products={products}
        onSubmit={handleModalSubmit}
        setSubmissionMessage={setSubmissionMessage}
        SubmissionMessage={submissionMessage}
      /> */}
      <ModalForm
        isOpen={isModalOpen}
        onClose={() => {setIsModalOpen(false)
            setSubmissionMessage("")
        }}
        catagory="Necklace"
        type="Clay"
        desc="Beads structured necklace with a star shaped chimes between them symmetrical and heart at the middle"
        onSubmit={handleModalSubmit}
        setSubmissionMessage={setSubmissionMessage}
        SubmissionMessage={submissionMessage}
      />
    </div>
  );
};

export default TestPage;
