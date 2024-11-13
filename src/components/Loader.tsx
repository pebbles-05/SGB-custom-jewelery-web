import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <Icon icon="line-md:loading-loop" className="w-16 h-16" />
    </div>
  );
};

export default Loader;
