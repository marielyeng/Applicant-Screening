import React from 'react';
import Card from 'react-bootstrap/Card';
import '.././styles/global.css';

interface JobCardProps {
    id: string;  // Make ID required
    title: string;
    description: string;
    details: string;
    link: string;
}

export const JobCards: React.FC<JobCardProps> = ({ id, title, description, details, link }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Job ID: {id}</Card.Subtitle> {/* Show Job ID */}
        <Card.Subtitle className="mb-2 text-muted">{details}</Card.Subtitle>
        <Card.Text>
          {description}
        </Card.Text>
        <Card.Link href={link}>More Details</Card.Link>  {/* Use the provided link */}
      </Card.Body>
      <div className="d-flex justify-content-start">
          <a href={link} target="_blank" className="underlined btn btn-link me-2 p-2">
            Apply
          </a>
      </div>
    </Card>
  );
};
