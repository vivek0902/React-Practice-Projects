import tabsData from "./tabsData";
import { useState } from "react";
import "./style.css";
const Tabs = () => {
  const [tab, setTab] = useState(0);
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div className="tabs">
        {tabsData.map((value, index) => (
          <div key={index}>
            <div
              className={tab === index ? "activeBtn" : "btn"}
              onClick={() => setTab(index)}
            >
              {value.label}
            </div>
          </div>
        ))}
      </div>
      <div className="content">{tabsData[tab].content}</div>
    </div>
  );
};

export default Tabs;
