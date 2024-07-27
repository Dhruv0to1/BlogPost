import React, { forwardRef, useId } from "react";

const Select = forwardRef(function Select(
  { label, options = ["active", "inactive"], className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="" htmlFor="id">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        {...props}
        ref={ref}
      >
        {options &&
          options.map((item, index) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
      </select>
    </div>
  );
});

export default Select;
