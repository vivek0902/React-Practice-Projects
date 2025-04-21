import "./style.css";
import { useState } from "react";

const UploadDragnDrop = () => {
  const [files, setFiles] = useState([]);

  // Handle drag over event
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Handle file drop
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(droppedFiles);
  };

  // Handle file selection via input
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  return (
    <div className="container">
      <h2>Drag and Drop File Upload</h2>

      {/* Drop Zone */}
      <div
        className="drop-zone"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <p>Drag & Drop files here or click to upload</p>
        <input type="file" multiple onChange={handleFileChange} />
      </div>

      {/* Display Uploaded Files */}
      {files.length > 0 && (
        <div className="file-list">
          <h3>Uploaded Files:</h3>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadDragnDrop;
