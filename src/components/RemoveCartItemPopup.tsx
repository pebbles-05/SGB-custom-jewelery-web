import React from "react";
import Modal from "./Modal";

const RemoveCartItemPopup = ({
  headerClass,
  buttonClass,
  isConfirmationModalOpen,
  onClickOutside,
  onCancel,
  onRemove,
}: {
  headerClass: string;
  buttonClass: string;
  isConfirmationModalOpen: boolean;
  onClickOutside: () => void;
  onCancel: () => void;
  onRemove: () => void;
}) => {
  return (
    <Modal
      containerClass=""
      onClickOutside={() => onClickOutside()}
      isOpen={isConfirmationModalOpen}
    >
      <div className="flex flex-col gap-4 p-4 bg-custom-bg-light rounded-lg">
        <span className={`text-custom-fg-light ${headerClass} text-3xl`}>
          Do you want to remove this item?
        </span>
        <div className={`flex gap-2 ml-auto ${buttonClass} text-xl`}>
          <button
            onClick={() => onCancel()}
            className="rounded-lg px-4 py-2 outline outline-1 outline-custom-fg-light"
          >
            Cancel
          </button>
          <button
            onClick={() => onRemove()}
            className="rounded-lg px-4 py-2 bg-custom-fg-light text-custom-bg-light"
          >
            Remove
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RemoveCartItemPopup;
