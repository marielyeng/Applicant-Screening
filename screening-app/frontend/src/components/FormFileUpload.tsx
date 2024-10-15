import React, { useState, DragEvent } from "react";
import styled from "styled-components";
import { Form } from "react-bootstrap";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface FileUploadProps {
  onFileUpload?: (file: File) => void;
  onParsedData?: (data: any) => void; // New prop for parsed data
}

export const FormFileUpload: React.FC<FileUploadProps> = ({ onFileUpload, onParsedData }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFile, setUploadedFile] = useState<any>(null); // Store uploaded file details
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setSelectedFile(e.target.files[0]);
        onFileUpload && onFileUpload(e.target.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      onFileUpload && onFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = async () => {
    if (!uploadedFile) return;

    try {
      const response = await axios.delete(`http://localhost:5000/api/uploads/${uploadedFile.id}`);
      setUploadStatus("File removed successfully.");
      setUploadedFile(null); // Clear uploaded file from the state
    } catch (error) {
      console.error("Error removing file:", error);
      setUploadStatus("Error removing file.");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://localhost:5000/api/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadStatus(response.data.message);
      setUploadedFile(response.data.file); // Store the uploaded file details in the state
      setSelectedFile(null);

      // Pass parsed data to parent component
      onParsedData && onParsedData(response.data.personal_info);
    } catch (error: any) {
      console.error("Error uploading file:", error);
      setUploadStatus("Error uploading file.");
    }
  };

  return (
    <Row className="my-3">
      <Col>
        <DropContainer
          dragActive={dragActive}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p>Drag and drop a file here or click to select a file</p>
          <HiddenFileInput
            type="file"
            onChange={handleFileChange}
            id="fileUpload"
          />
          <UploadLabel htmlFor="fileUpload">Choose File</UploadLabel>

          {selectedFile && (
            <RemoveLabel onClick={() => setSelectedFile(null)}>Remove Selected File</RemoveLabel>
          )}
        </DropContainer>

        {selectedFile && (
          <div style={{ marginTop: "10px" }}>
            <strong>Selected File:</strong> {selectedFile.name}
          </div>
        )}

        {uploadedFile && (
          <div style={{ marginTop: "10px" }}>
            <strong>Uploaded File:</strong> {uploadedFile.file_name}
            <RemoveLabel onClick={handleRemoveFile}>Remove Uploaded File</RemoveLabel>
          </div>
        )}

        <Button
          variant="primary"
          onClick={handleUpload}
          disabled={!selectedFile}
          style={{ marginTop: "10px" }}
        >
          Upload File
        </Button>

        {uploadStatus && <p style={{ marginTop: "10px" }}>{uploadStatus}</p>}
      </Col>
    </Row>
  );
};

interface DropContainerProps {
  dragActive: boolean;
}

const DropContainer = styled.div<DropContainerProps>`
  border: 2px dashed ${(props) => (props.dragActive ? "#007bff" : "#ccc")};
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s;
`;

const HiddenFileInput = styled(Form.Control)`
  display: none;
`;

const UploadLabel = styled.label`
  padding: 5px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: underline;
  
  &:hover {
    color: #007bff;
  }
`;

const RemoveLabel = styled.span`
  padding: 5px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: underline;
  
  &:hover {
    color: #b30000;
  }
`;