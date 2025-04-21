/* eslint-disable react/prop-types */
import "./style.css";
const Signal = ({ signal, activeIndex }) => {
  return (
    <div>
      <div
        style={{ backgroundColor: `${activeIndex ? signal : "gray"}` }}
        className="signal"
      ></div>
    </div>
  );
};

export default Signal;
