import React from "react";

const TextInput = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full h-8 outline-none bg-transparent"
    />
  );
};

export default TextInput;
