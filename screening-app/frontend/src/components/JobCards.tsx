import React from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface JobCardProps {
  id: string;  // Job ID
  title: string;
  description: string;
  details: string;
  applyLink?: string;
}

export const JobCards: React.FC<JobCardProps> = ({ id, title, description, details, applyLink }) => {
  const navigate = useNavigate();

  const handleMoreDetailsClick = () => {
    navigate(`/jobs/${id}`); 
  };

  const handleApplyClick = () => {
    navigate(`/apply/${id}`);
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
      </BtnWrap>
      </Card.Body>
    
    </Card>
  );
};

const BtnWrap= styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 4px 12px;
`;