/* eslint-disable react/prop-types */
import { useState } from "react";
import "../style.css";
const FileExplorerComponent = ({ folderData }) => {
  const [showChild, setShowChild] = useState(false);
  return (
    <div className="container">
      <h5 onClick={() => setShowChild(!showChild)}>
        {folderData.type === "folder" ? (showChild ? "📂" : "📁") : "📄"}
        {folderData.name}
      </h5>
      {showChild &&
        folderData?.children?.map((childrenData, index) => {
          return (
            <FileExplorerComponent key={index} folderData={childrenData} />
          );
        })}
    </div>
  );
};

export default FileExplorerComponent;
