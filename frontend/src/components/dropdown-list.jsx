import React from "react";
import Select from "react-select";

export const DropdownList = ({ id, items }) => {
  const [filteredItems, setFilteredItems] = React.useState(items.slice(0,50));
  if (!items) return null;

  if (items.length === 0) {
    return <p>No items found</p>;
  }
  const handleInputChange = (inputValue) => {
    const filteredStocks = items.filter(stock =>
      stock.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredItems(filteredStocks.slice(0, 50)); // Limiting to 1000 items
    return inputValue;
  };


  return (
    <Select
      id={id}
      defaultValue={"Select a stock"}
      className="w-72 bg-chatbotLightBlue"
      options={filteredItems.map((item) => {
        return { value: item, label: item };
      })}
      onInputChange={handleInputChange}
    ></Select>
  );
};
