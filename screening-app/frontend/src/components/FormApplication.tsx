import React from 'react';
import Form from 'react-bootstrap/Form';
import CustomButton from './CustomButton';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

interface ApplicationProps {
  id: string;
  jobTitle?: string;
  parsedData?: { first_name?: string; last_name?: string; email?: string; phone?: string; }; // Accept parsed data
}

export const FormApplication: React.FC<ApplicationProps> = ({ id, jobTitle, parsedData }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { title } = location.state || {};

  const handleBackClick = () => {
    navigate(`/jobs/${id}`);
  };

  return (
    <Form className="shadow p-3 mb-5 bg-white rounded">
      <Form.Group className="mb-1" controlId="formAppId">
        <Form.Label>Job Requisition Id:</Form.Label>
        <Form.Control 
          type="text"
          name="appId"
          value={id}
          disabled
        />
      </Form.Group>

      <Form.Group className="mb-1" controlId="formJTitle">
        <Form.Label>Applying for:</Form.Label>
        <Form.Control 
          type="text"
          name="jtitle"
          value={title}
          disabled
        />
      </Form.Group>

      <Form.Group className="mb-1" controlId="formFName">
        <Form.Label>First Name:</Form.Label>
        <Form.Control 
          type="text"
          name="fname"
          defaultValue={parsedData?.first_name || ''}
          required
        />
      </Form.Group>

      <Form.Group className="mb-1" controlId="formLName">
        <Form.Label>Last Name:</Form.Label>
        <Form.Control 
          type="text"
          name="lname"
          defaultValue={parsedData?.last_name || ''}
          required
        />
      </Form.Group>

      <Form.Group className="mb-1" controlId="formEmail">
        <Form.Label>Email address:</Form.Label>
        <Form.Control 
          type="email" 
          name="email"
          defaultValue={parsedData?.email || ''}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="phone">
        <Form.Label>Phone number:</Form.Label>
        <Form.Control 
          type="text" 
          name="phone"
          defaultValue={parsedData?.phone || ''}
          required
        />
      </Form.Group>

      <div className="d-flex">
        <CustomButton 
          variant="primary" 
          text="Submit" 
          className="me-2" 
          // onClick={handleApplyClick}
        />
        <CustomButton 
          variant="outline-danger" 
          text="Back" 
          onClick={handleBackClick}
        />
      </div>
    </Form>
  );
};
