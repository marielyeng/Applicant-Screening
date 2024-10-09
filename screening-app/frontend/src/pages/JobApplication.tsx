import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FormApplication } from "../components/FormApplication";
import { FormFileUpload } from "../components/FormFileUpload";
import { useParams } from "react-router-dom";
import axios from "axios";

export const JobApplication: React.FC = () => {
  const [jobTitle, setJobTitle] = useState("");
  const { jobId } = useParams<{jobId: string}>();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/job/${jobId}`);
        setJobTitle(response.data.title); 
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, [jobId])

    return (
        <Container>
      <Row>
        <Col><FormApplication id={jobId ?? ''} jobTitle={jobTitle ?? ''} /></Col>
        <Col><FormFileUpload /></Col>
      </Row>
    </Container>
    )
}