import { useState } from "react";

const Toolbox = () => {
  const createTextBoxItem = (id) => ({
    id,
    type: "TEXTBOX",
    value: "",
  });

  const [, setDraggedItem] = useState(null);

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("text/plain", item.id); // Store the item's ID in the transfer data
    setDraggedItem(item); // Store the dragged item
  };

  return (
    <div>
      <h2>Toolbox</h2>
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, createTextBoxItem(1))}
        style={{
          padding: "10px",
          margin: "5px",
          backgroundColor: "lightblue",
          cursor: "move",
          width: "100px",
        }}
      >
        <div
          style={{
            width: "100%",
            border: "1px solid black",

            textAlign: "center",
          }}
        >
          Add Textbox
        </div>
      </div>
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, createTextBoxItem(1))}
        style={{
          padding: "10px",
          margin: "5px",
          backgroundColor: "lightblue",
          cursor: "move",
          width: "100px",
        }}
      >
        <div
          style={{
            width: "100%",
            border: "1px solid black",

            textAlign: "center",
          }}
        >
          Add Operators
        </div>
      </div>
    </div>
  );
};

export default Toolbox;
