import { useState, useRef, useEffect } from "react";
import mainData from "./data";
export default function DragNdrop() {
  const [data, setData] = useState(mainData);
  const dragItem = useRef();
  const dragContainer = useRef();

  const [textBoxData, setTextBoxData] = useState("");

  useEffect(() => {
    // Load stored fetchedData from localStorage
    const storedData = JSON.parse(localStorage.getItem("todo")) || mainData;
    setData(storedData);
  }, []);

  function handleDragStart(e, item, container) {
    dragItem.current = item;
    dragContainer.current = container;
    e.target.style.opacity = "0.5";
  }

  function HandleDragEnd(e) {
    e.target.style.opacity = "1";
  }

  function handleDrop(targetContainer) {
    const item = dragItem.current;
    const sourceContainer = dragContainer.current;
    setData((prev) => {
      const newData = { ...prev };
      newData[sourceContainer] = newData[sourceContainer].filter(
        (value) => value !== item
      );
      newData[targetContainer] = [...newData[targetContainer], item];
      localStorage.setItem("todo", JSON.stringify({ ...newData })); //UpdateLocalStorgae
      return newData;
    });
    dragItem.current = null;
    dragContainer.current = null;
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleText(e) {
    setTextBoxData(e.target.value);
  }
  function handleSubmit() {
    if (!textBoxData.trim()) return;

    setData((prev) => {
      const newData = { ...prev };
      newData["Todo"] = [...newData["Todo"], textBoxData];
      localStorage.setItem("todo", JSON.stringify({ ...newData })); //UpdateLocalStorgae
      return newData;
    });
    setTextBoxData("");
  }

  function HandleDelete() {
    const item = dragItem.current;
    const sourceContainer = dragContainer.current;
    setData((prev) => {
      const newData = { ...prev };
      newData[sourceContainer] = newData[sourceContainer].filter(
        (value) => value !== item
      );
      localStorage.setItem("todo", JSON.stringify({ ...newData })); //UpdateLocalStorgae
      return newData;
    });
    dragItem.current = null;
    dragContainer.current = null;
  }

  function handleDeleteDragOver(e) {
    e.preventDefault();
  }
  function handleValueToTextbox() {
    const item = dragItem.current;
    setTextBoxData(item);
  }
  function handleValueToTextboxDragOver(e) {
    e.preventDefault();
  }
  function handleUpdate() {
    if (!textBoxData.trim()) {
      dragItem.current = null;
      dragContainer.current = null;
      return;
    }
    const item = dragItem.current;
    const sourceContainer = dragContainer.current;
    // console.log("woring");
    setData((prev) => {
      const newData = { ...prev };
      newData[sourceContainer] = newData[sourceContainer].filter(
        (value) => value !== item
      );
      newData[sourceContainer] = [...newData[sourceContainer], textBoxData];
      localStorage.setItem("todo", JSON.stringify({ ...newData })); //UpdateLocalStorgae
      return newData;
    });
    setTextBoxData("");
    dragItem.current = null;
    dragContainer.current = null;
  }
  function handleReset() {
    setTextBoxData("");
    dragItem.current = null;
    dragContainer.current = null;
  }

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "0px",
          width: "100%",
          height: "100px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #007bff, #00bfff)",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
          borderBottom: "3px solid white",
          padding: "10px",
          marginTop: "5px",
        }}
        onDrop={handleValueToTextbox}
        onDragOver={handleValueToTextboxDragOver}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "15px",
          }}
        >
          <input
            type="text"
            placeholder="Enter task..."
            onChange={(e) => handleText(e)}
            value={textBoxData}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                dragItem.current || dragContainer.current
                  ? handleUpdate()
                  : handleSubmit();
              }
            }}
            style={{
              padding: "10px",
              width: "250px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "2px solid white",
              outline: "none",
            }}
          />
          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "8px",
              backgroundColor: "#ffcc00",
              color: "black",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "0.3s",
            }}
            onClick={
              dragItem.current || dragContainer.current
                ? handleUpdate
                : handleSubmit
            }
          >
            {dragItem.current || dragContainer.current
              ? "Update Todos"
              : "Add Todos"}
          </button>

          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "8px",
              backgroundColor: "#ffcc00",
              color: "black",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "0.3s",
            }}
            onClick={handleReset}
          >
            Reset Todos
          </button>
        </div>

        <p
          style={{
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            marginTop: "15px",
          }}
        >
          Drag here to Edit
        </p>
      </div>

      <div
        style={{
          margin: "130px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {Object.keys(data).map((container, index) => (
          <div key={index}>
            <h2
              style={{ userSelect: "none" }}
              onCopy={(e) => handleDragOver(e)}
            >
              {container}
            </h2>
            <div
              onDrop={() => handleDrop(container)}
              onDragOver={(e) => handleDragOver(e)}
              style={{
                background: "rgba(240, 240, 240, 0.79)",
                padding: "1rem",
                width: 450,
                height: 500,
                overflowY: "auto",
              }}
            >
              {data[container].map((item, idx) => (
                <div
                  key={idx}
                  onDragStart={(e) => handleDragStart(e, item, container)}
                  onDragEnd={HandleDragEnd}
                  draggable
                  style={{
                    userSelect: "none",
                    padding: 16,
                    margin: "0 0 8px 0",
                    backgroundColor: "white",
                    cursor: "move",
                  }}
                >
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          position: "fixed",
          bottom: "4px",
          width: "100%",
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg,rgb(255, 64, 0),rgb(255, 85, 0))", // Gradient for modern UI
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)", // Adds a shadow effect
          borderBottom: "3px solid white",
        }}
        onDrop={HandleDelete}
        onDragOver={handleDeleteDragOver}
      >
        <p
          style={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "2em",
          }}
        >
          Delete Todos
        </p>
      </div>
    </>
  );
}

// localStorage.setItem("todo", JSON.stringify(storedRecipes));
// useEffect(() => {
//   // Load stored fetchedData from localStorage
//   const storedData = JSON.parse(localStorage.getItem("todo")) || [];
//   setLocalStoredValues(storedData);
// }, []);
