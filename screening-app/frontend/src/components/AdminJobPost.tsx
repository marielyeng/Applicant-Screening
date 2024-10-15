import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminLogout from './AdminLogout';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';

const AdminPostJob: React.FC = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobDetails, setJobDetails] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated by verifying the presence of the token
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      // If no token is found, redirect to login
      navigate('/admin-login');
    }
  }, [navigate]);

  const handleSubmit = async () => {
    const token = localStorage.getItem('jwtToken'); // Get JWT token from local storage

    try {
      await axios.post(
        'http://localhost:5000/api/post-job',
        {
          title: jobTitle,
          description: jobDescription,
          details: jobDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add JWT token in Authorization header
          },
        }
      );
      alert('Job posted successfully');
      setJobTitle('');
      setJobDescription('');
      setJobDetails('');
    } catch (error) {
      alert('Error posting job');
    }
  };

  return (
    <Wrapper>
      <h2>Post a New Job</h2>
      <div className="form-group my-3">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Job Title" 
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </div>
      <div className="form-group my-3">
        <textarea 
          className="form-control" 
          placeholder="Job Description" 
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>
      <div className="form-group my-3">
        <textarea 
          className="form-control" 
          placeholder="Job Details" 
          value={jobDetails}
          onChange={(e) => setJobDetails(e.target.value)}
        />
      </div>
      <button className="btn btn-success" onClick={handleSubmit}>Post Job</button>

        <span className="p-3">
          <AdminLogout />
        </span>
    </Wrapper>
  );
};

const Wrapper = styled(Container)`
  margin-top: 7%;
`;

export default AdminPostJob;
