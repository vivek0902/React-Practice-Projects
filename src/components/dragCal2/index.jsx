import { useState } from "react";
import Toolbox from "./Toolbox";
import CalculatorBoard from "./CalculatorBoard";

function DragCal() {
  const [calculation, setCalculation] = useState([]);

  const handleDrop = (item) => {
    setCalculation((prevCalc) => [...prevCalc, item]);
  };

  return (
    <div className="App">
      <h1>Drag and Drop Calculator Builder</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        <Toolbox />
        <CalculatorBoard calculation={calculation} handleDrop={handleDrop} />
      </div>
    </div>
  );
}

export default DragCal;
