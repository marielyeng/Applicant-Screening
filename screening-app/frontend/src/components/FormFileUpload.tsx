import React, { useState, DragEvent } from "react";
import styled from "styled-components";
import { Form } from "react-bootstrap";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface FileUploadProps {
  onFileUpload?: (file: File) => void;
}

export const FormFileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://localhost:5000/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadStatus(response.data.message);
      setSelectedFile(null);
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
        </DropContainer>
        {selectedFile && (
          <div style={{ marginTop: "10px" }}>
            <strong>Selected File:</strong> {selectedFile.name}
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
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0056b3;
  }
`;
