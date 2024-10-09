import React from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for routing

interface JobCardProps {
  id: string;  // Job ID
  title: string;
  description: string;
  details: string;
  applyLink: string;
}

export const JobCards: React.FC<JobCardProps> = ({ id, title, description, details, applyLink }) => {
  const navigate = useNavigate();  // Get the navigate function from useNavigate

  // Handle "More Details" click to navigate to the job details page
  const handleMoreDetailsClick = () => {
    navigate(`/jobs/${id}`);  // Navigate to the job details page with the job ID
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Job ID: {id}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">{details}</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        {/* Use a button to trigger navigation for more details */}
        <button className="btn btn-link" onClick={handleMoreDetailsClick}>
          More Details
        </button>
      </Card.Body>
      <div className="d-flex justify-content-start">
        {/* Link for applying to the job */}
        <a href={applyLink} target="_blank" className="underlined btn btn-link me-2 p-2">
          Apply
        </a>
      </div>
    </Card>
  );
};
