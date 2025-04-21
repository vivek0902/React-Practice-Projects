/* eslint-disable react/prop-types */

import { useState } from "react";

const CalculatorBoard = ({ calculation, handleDrop }) => {
  const [result, setResult] = useState("");

  const handleDropEvent = (e) => {
    e.preventDefault(); // Prevent the default behavior (which is opening the dragged item)
    const itemId = e.dataTransfer.getData("text/plain"); // Retrieve the dropped item's ID

    // Create a new item based on the dragged ID and add it to the calculation
    handleDrop({ id: itemId, type: "TEXTBOX", value: "" });
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Allow the drop by preventing the default behavior
  };

  const evaluateCalculation = () => {
    try {
      const expression = calculation
        .map((item) => (typeof item === "object" ? item.value : item)) // Extract value from text box items
        .join(""); // Join all items into a valid string (e.g., "3+5*2")

      const resultValue = Function("return " + expression)(); // Safely evaluate the expression

      if (isNaN(resultValue)) {
        throw new Error("Invalid expression");
      }

      setResult(resultValue); // Set the result
    } catch (e) {
      setResult("Error", e); // Handle any errors during evaluation
    }
  };

  const handleInputChange = (e, index) => {
    const newCalculation = [...calculation];
    newCalculation[index].value = e.target.value;
    handleDrop(newCalculation); // Re-calculate
  };

  return (
    <div
      onDrop={handleDropEvent}
      onDragOver={handleDragOver}
      style={{
        width: "400px",
        minHeight: "200px",
        padding: "20px",
        border: "2px dashed gray",
        position: "relative",
      }}
    >
      <h2>Calculator Board</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          padding: "10px 0",
        }}
      >
        {/* Render all dropped items */}
        {calculation.map((item, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center" }}>
            {/* Render text boxes */}
            {item.type === "TEXTBOX" ? (
              <input
                type="text"
                value={item.value}
                onChange={(e) => handleInputChange(e, index)} // Update value on change
                style={{
                  width: "60px",
                  padding: "5px",
                  border: "1px solid black",
                  textAlign: "center",
                }}
              />
            ) : (
              <div>{item.value}</div> // Fallback for other types of items (if any)
            )}
          </div>
        ))}
      </div>
      <button onClick={evaluateCalculation}>Evaluate</button>
      {result && <div>Result: {result}</div>}
    </div>
  );
};

export default CalculatorBoard;
