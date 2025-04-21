import { useEffect, useState } from "react";
import Signal from "./Signal";
const SignalLight = () => {
  const signal = ["green", "orange", "red"];

  const [isActive, setIsActive] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsActive((prev) => {
        return (prev + 1) % signal.length;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [signal.length]);
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {signal.map((color, index) => (
        <Signal key={index} signal={color} activeIndex={isActive === index} />
      ))}
    </div>
  );
};

export default SignalLight;
