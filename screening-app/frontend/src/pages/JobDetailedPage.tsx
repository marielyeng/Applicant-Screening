import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import CustomButton from '../components/CustomButton';

export const JobDetailedPage: React.FC = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState<any>(null);  // State for job details

  useEffect(() => {
    // Fetch job details using the jobId
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/jobs/${jobId}`);
        setJobDetails(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (!jobDetails) {
    return <div>Loading...</div>;
  }

  const handleApplyClick = () => {
    navigate(`/apply/${jobId}`, { state: { title: jobDetails.title } });
  };

  const handleBackClick = () => {
    navigate(`/jobs`);
  };

  return (
    <JobWrapper>
      <h2>{jobDetails.title}</h2>
      <p>{jobDetails.description}</p>
      <p>{jobDetails.details}</p>
        <Button 
          className="btn btn-primary mr-3" 
          onClick={handleApplyClick}
          style={{ marginRight: '10px' }}>
          Apply
        </Button>
        <CustomButton 
          variant='outline-danger'
          onClick={handleBackClick}
          text="Back"
          className='ml-3'
        />
    </JobWrapper>
  );
};

const JobWrapper = styled(Container)`
  margin-top: 7%;
  padding: 24px;
  box-shadow: 2px 4px 8px #9fd3c7;
  border-bottom: 4px solid #142d4c;
  border-radius: 6px;
`;