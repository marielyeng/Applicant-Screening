import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FormApplication } from "../components/FormApplication";
import { FormFileUpload } from "../components/FormFileUpload";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

export const JobApplication: React.FC = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [parsedData, setParsedData] = useState<any>(null); // State to hold parsed data
  const { jobId } = useParams<{ jobId: string }>();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/jobs/${jobId}`);
        setJobTitle(response.data.title);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  return (
    <FormWrapper>
      <Row>
        <Col>
          <FormApplication 
            id={jobId ?? ''} 
            jobTitle={jobTitle ?? ''} 
            parsedData={parsedData} // Pass parsed data to FormApplication
          />
        </Col>
        <Col>
          <FormFileUpload onParsedData={setParsedData} /> {/* Capture parsed data from FormFileUpload */}
        </Col>
      </Row>
    </FormWrapper>
  );
}

const FormWrapper = styled(Container)`
  padding: 24px;
  margin-top: 2%;
`;
