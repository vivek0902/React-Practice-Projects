import { useState } from "react";

const PasswordVisible = () => {
  const [show, setShow] = useState(true);
  return (
    <div>
      <input type={show ? "password" : "text"} value="password" />
      <div
        onMouseDown={() => {
          setShow((prev) => !prev); //if u press for long time it will there for long
        }}
        onMouseUp={() => setTimeout(() => setShow((prev) => !prev), 1000)} //if u mouse down then it will last long for 1 min
      >
        See Password
      </div>
    </div>
  );
};

export default PasswordVisible;
