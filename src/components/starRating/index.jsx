/* eslint-disable react/prop-types */

import { useState } from "react";
import "./style.css";
const StarRating = ({ starCount = 10 }) => {
  const [starValue, setStarValue] = useState(null);
  const [hoverValue, setHoverValue] = useState(0);

  function onClickHandle(index) {
    if (!(starValue === index + 1)) {
      setStarValue(index + 1);
    } else {
      setStarValue(null);
    }
  }
  return (
    <div style={{ userSelect: "none", width: "100vw", height: "100vh" }}>
      {new Array(starCount).fill(0).map((_, index) => (
        <span
          className={
            (hoverValue === 0 && index < starValue) || index < hoverValue
              ? "gold"
              : ""
          }
          key={index}
          //   onClick={() => setStarValue(index + 1)}
          onClick={() => onClickHandle(index)}
          onMouseEnter={() => setHoverValue(index + 1)}
          onMouseLeave={() => setHoverValue(0)}
          //   onDoubleClick={() => setStarValue(0)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
