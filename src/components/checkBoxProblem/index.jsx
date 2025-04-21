import { useState } from "react";
import data from "./data";
import "./style.css";
export default function CheckBox() {
  const [value, setvalue] = useState(data);
  const [enable, setEnable] = useState(false);
  function deletefunc(index, val) {
    let newArray = [...value];
    console.log(val);
    let filterArray = newArray.filter((item) => item != val);
    setvalue(filterArray);
  }

  return (
    <div className="wrapper">
      {value.map((val, index) => (
        <p key={index}>
          <span>
            <input type="checkbox" onChange={() => setEnable(!enable)} />
          </span>
          {val}
          <span>
            <button
              onClick={
                enable
                  ? () => deletefunc(index, val)
                  : () => {
                      alert("u need to enable to delete");
                    }
              }
            >
              -
            </button>
          </span>
        </p>
      ))}
    </div>
  );
}
