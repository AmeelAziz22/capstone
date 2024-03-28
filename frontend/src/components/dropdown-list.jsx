import React from "react";
import Select from "react-select";

export const DropdownList = ({ items }) => {
  if (!items) return null;

  if (items.length === 0) {
    return <p>No items found</p>;
  }
  if (items.length > 20) {
    items = items.slice(0, 20);
  }

  return (
    <Select
    id="stock-dropdown"
      defaultValue={"Select a stock"}
      className="w-72 bg-chatbotLightBlue"
      options={items.map((item) => {
        return { value: item.symbol, label: item.symbol };
      })}
    ></Select>
  );
};
