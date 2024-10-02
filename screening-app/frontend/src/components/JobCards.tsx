import React from 'react';
import Card from 'react-bootstrap/Card';
import CustomButton from './CustomButton';
import '.././styles/global.css';

interface JobCardProps {
    id?: string;
    title: string;
    description: string;
    details: string;
    link: string;
}

export const JobCards: React.FC<JobCardProps> = ({id, title, description, details, link}) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{details}</Card.Subtitle>
        <Card.Text>
          {description}
        </Card.Text>
        <Card.Link href="#">{link}</Card.Link>
      </Card.Body>
      <div className="d-flex justify-content-start">
          <a href="https://www.example.com" target="_blank" className="underlined btn btn-link me-2 p-2">
            Apply
          </a>
      </div>
    </Card>
  );
}
