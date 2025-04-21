import "./style.css";
import data from "./data.json";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
// console.log(data);

const DATA_Length = data.length;
const Carousel = () => {
  const [index, setIndex] = useState(0);
  const ref = useRef(null);
  // console.log(index);
  function handleNext() {
    setIndex((prev) => {
      if (prev === DATA_Length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  }
  function handlePrev() {
    setIndex((prev) => {
      if (prev === 0) {
        return DATA_Length - 1;
      } else {
        return prev - 1;
      }
    });
  }
  useEffect(() => {
    ref.current = setInterval(handleNext, 1000);
    return () => clearInterval(ref.current);
  }, []);
  return (
    <div
      onMouseEnter={() => clearInterval(ref.current)}
      onMouseLeave={() => (ref.current = setInterval(handleNext, 1000))}
      className="container"
    >
      <div className="left-btn" onClick={handlePrev}>
        {"<"}
      </div>
      <img src={data[index].download_url} alt="" />
      <div className="right-btn" onClick={handleNext}>
        {">"}
      </div>
    </div>
  );
};

export default Carousel;
