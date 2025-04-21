import { useState } from "react";
import data from "./data";
export default function TabProblem() {
  const [content, setContent] = useState(null);

  console.log(content);
  return (
    <>
      <div
        style={{
          display: "flex",
          height: "100vh",
          width: "100vw",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: "20px",
        }}
      >
        {data.map((tabData, index) => (
          <button
            className=""
            key={index}
            onClick={() => setContent(tabData.content)}
          >
            {tabData.label}
          </button>
        ))}

        {content ? <h3>{content}</h3> : <h3>Click Tab to Get Content</h3>}
      </div>
    </>
  );
}
