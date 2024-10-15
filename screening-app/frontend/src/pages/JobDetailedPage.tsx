import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const JobDetailedPage: React.FC = () => {
  const { jobId } = useParams();
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

  return (
    <div className="container mt-5">
      <h2>{jobDetails.title}</h2>
      <p>{jobDetails.description}</p>
      <p>{jobDetails.details}</p>
      <a href={`/apply/${jobId}`} className="btn btn-primary">Apply</a>
    </div>
  );
};
