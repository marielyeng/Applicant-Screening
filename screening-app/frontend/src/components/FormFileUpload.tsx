import React, { useState, DragEvent } from "react";
import styled from "styled-components";
import { Form } from "react-bootstrap";

interface FileUploadProps {
  onFileUpload?: (file: File) => void;
}

export const FormFileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // onFileUpload(e.target.files[0]);
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
      // onFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
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
      <UploadLabel htmlFor="fileUpload">Upload File</UploadLabel>
    </DropContainer>
  );
};

/////////////////////////////////////////
// Styled Components

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
