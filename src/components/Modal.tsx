import useClickOutside from "@/helpers/useClickOutSide";
import type { Modal } from "@/interface/interfaces";
import React, { useState } from "react";

const Modal = ({
  children,
  containerClass,
  isOpen = true,
  onClickOutside,
}: Modal) => {
  const childrenRef = useClickOutside((e) => {
    e.stopPropagation();
    e.preventDefault();
    onClickOutside();
  });
  if (isOpen) {
    return (
      <div
        className={`z-[900] flex justify-center items-center fixed inset-0 z-50 bg-custom-black/70 overflow-auto ${containerClass}`}
      >
        <div
          onClick={(e) => e.preventDefault()}
          className="w-max h-max"
          ref={childrenRef}
        >
          {children}
        </div>
      </div>
    );
  }
};

export default Modal;
