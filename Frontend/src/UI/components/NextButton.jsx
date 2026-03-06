import React from "react";

const NextButton = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-40"
    >
      &#x2192;
    </button>
  );
};

export default NextButton;