import data from "./component/data.json";

import FileExplorerComponent from "./component/FileExplorerComponent";
const FileExplorer = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <FileExplorerComponent folderData={data} />
    </div>
  );
};

export default FileExplorer;
