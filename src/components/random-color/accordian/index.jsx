import { useState } from "react";
import "./style.css";
export default function RandomColor() {
  const [typeOfColor, setTypeOfColor] = useState(true); //false for RGB mode
  const [color, setColor] = useState("#000000");
  function generateHEXColor() {
    let hex = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
    ];
    let hexPre = "#";
    let hexRandomNumber = "";
    for (let i = 0; i < 6; i++) {
      hexRandomNumber += hex[Math.floor(Math.random() * 16)]; // Returns a random integer from 1 to 16:
    }

    setColor(hexPre + hexRandomNumber);
    console.log(hexPre + hexRandomNumber);
    console.log("generatedHEXColor");
  }
  function generateRGBColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    setColor(`rgb(${r},${g},${b})`);

    console.log(`rgb(${r},${g},${b})`);
    console.log("generatedRGBColor");
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: color,
      }}
    >
      <button
        className="switchButton"
        onClick={() => setTypeOfColor(!typeOfColor)}
      >
        {typeOfColor ? "Switch To RGB Color" : "Switch To HEX Color"}
      </button>
      <button
        className="randomButton"
        onClick={typeOfColor ? generateHEXColor : generateRGBColor}
      >
        Generage Random Color
      </button>
      <h1 style={{ color: "white" }}>
        {typeOfColor
          ? "Random Generated HEX Color"
          : "Random Generated RGB Color"}
      </h1>
      <h1 style={{ color: "white" }}>{color}</h1>
    </div>
  );
}
