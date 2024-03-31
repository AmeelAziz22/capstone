import React from "react";
import Select from "react-select";

export const DropdownList = ({ id, items }) => {
  if (!items) return null;

  if (items.length === 0) {
    return <p>No items found</p>;
  }
  if (items.length > 20) {
    items = items.slice(0, 20);
  }

  return (
    <Select
      id={id}
      defaultValue={"Select a stock"}
      className="w-72 bg-chatbotLightBlue"
      options={items.map((item) => {
        return { value: item, label: item };
      })}
    ></Select>
  );
};
