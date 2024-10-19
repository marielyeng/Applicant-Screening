import React from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from './AuthContext';  // Use the authentication context for admin status

interface JobCardProps {
  id: string;
  title: string;
  description: string;
  details: string;
  applyLink?: string;
}

export const JobCards: React.FC<JobCardProps> = ({ id, title, description, details, applyLink }) => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();  // Get the admin status from the context

  const handleMoreDetailsClick = () => {
    navigate(`/jobs/${id}`);
  };

  const handleApplyClick = () => {
    navigate(`/apply/${id}`, { state: { title } });
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/delete-job/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
        }
      });
      alert('Job deleted successfully');
    } catch (error) {
      console.error('Error deleting job', error);
      alert('Failed to delete job.');
    }
  };

  return (
    <Card style={{ width: '100%', boxShadow: '1px 2px 2px #9fd3c7' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Job ID: {id}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">{details}</Card.Subtitle>
        <Card.Text>{description}</Card.Text>

        <BtnWrap>
          <Button className="btn btn-primary" onClick={handleApplyClick}>
            Apply
          </Button>
          <Button className="btn btn-outline-info" onClick={handleMoreDetailsClick}>
            More Details
          </Button>

          {isAdmin && (
            <>
              <Button className="btn btn-outline-danger" onClick={handleDeleteClick}>
                Delete
              </Button>
            </>
          )}
        </BtnWrap>
      </Card.Body>
    </Card>
  );
};

const BtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 4px 12px;
`;
