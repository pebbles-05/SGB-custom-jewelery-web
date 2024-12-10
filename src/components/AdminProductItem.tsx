import Image from "next/image";
import React, { useState } from "react";
import RemoveCartItemPopup from "./RemoveCartItemPopup";

const AdminProductItem = ({
  src,
  name,
  onEdit,
  onDelete,
}: {
  src: string;
  name: string;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const [isDeletePromptOpen, setIsDeletePromptOpen] = useState(false);
  return (
    <div className="w-full rounded-lg h-max  bg-custom-white p-4 flex gap-4">
      {src && <img className="aspect-square h-max w-24" src={src} alt={name} />}
      {name && <span>{name}</span>}
      <button
        onClick={() => onEdit()}
        className="ml-auto rounded-lg px-4 py-2 bg-custom-fg-light text-custom-bg-light text-xl h-max"
      >
        Edit
      </button>
      <button
        onClick={() => setIsDeletePromptOpen(true)}
        className="rounded-lg px-4 py-2 bg-custom-fg-light text-custom-bg-light text-xl h-max"
      >
        Delete
      </button>
      <RemoveCartItemPopup
        isConfirmationModalOpen={isDeletePromptOpen}
        title="Do you want to delete this item"
        onCancel={() => setIsDeletePromptOpen(false)}
        onRemove={() => {
          setIsDeletePromptOpen(false);
          onDelete();
        }}
        onClickOutside={() => setIsDeletePromptOpen(false)}
      />
    </div>
  );
};

export default AdminProductItem;
