import { useState } from "react";
import data from "./data";
import "./style.css";
export default function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiSelected, setMultiSelected] = useState([]);
  const [isSelected, setIsSelected] = useState([]);
  let style =
    isSelected.length === data.length
      ? { backgroundColor: "#1900ff" }
      : { backgroundColor: "#676161" };

  function handleSingleSelection(CurrentId) {
    setSelected(CurrentId === selected ? null : CurrentId);
  }
  function handleMultiSelection(CurrentId) {
    multiSelected.includes(CurrentId)
      ? setMultiSelected(multiSelected.filter((id) => id !== CurrentId))
      : setMultiSelected([...multiSelected, CurrentId]);
  }
  function checkedHandle(CurrentId) {
    isSelected.includes(CurrentId)
      ? setIsSelected(
          isSelected.filter((value) => {
            value !== CurrentId;
          })
        )
      : setIsSelected([...isSelected, CurrentId]);
  }
  return (
    <div className="wrapper">
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        {enableMultiSelection
          ? "Enable Single Selection"
          : "Enable Multi Selection"}
      </button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div key={dataItem.id} className="item">
              <input
                type="checkbox"
                checked={isSelected.includes(dataItem.id)}
                onChange={() => checkedHandle(dataItem.id)}
              ></input>
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>
                  {enableMultiSelection
                    ? multiSelected.includes(dataItem.id)
                      ? "-"
                      : "+"
                    : selected === dataItem.id
                    ? "-"
                    : "+"}
                </span>
              </div>
              {selected === dataItem.id ||
              multiSelected.includes(dataItem.id) ? (
                <div className="content">{dataItem.answer}</div>
              ) : null}
            </div>
          ))
        ) : (
          <div>NO data is Present</div>
        )}
      </div>
      <button
        style={style}
        disabled={data.length !== isSelected.length}
        onClick={() => alert("Submitted")}
      >
        Submit
      </button>
    </div>
  );
}
