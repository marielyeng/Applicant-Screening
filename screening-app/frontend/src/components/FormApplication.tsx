import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from "react-bootstrap/Alert";
import { Heading } from './Heading';

export const FormApplication: React.FC = () => {
  return (
    <Form className="shadow p-3 mb-5 bg-white rounded">
      <Heading title='Software Engineer' />

        <Form.Group className="mb-1" controlId="formFName">
        <Form.Label>First Name:</Form.Label>
        <Form.Control 
            type="text"
            name="fname"
            // onChange={handleChange}
            required
            />
        </Form.Group>

        <Form.Group className="mb-1" controlId="formLName">
        <Form.Label>Last Name:</Form.Label>
        <Form.Control 
            type="text"
            name="lname"
            // onChange={handleChange}
            required
            />
        </Form.Group>

        <Form.Group className="mb-1" controlId="formEmail">
        <Form.Label>Email address:</Form.Label>
        <Form.Control 
            type="email" 
            name="email"
            // onChange={handleChange}
            required
            />
        </Form.Group>

        <Form.Group className="mb-3" controlId="phone">
        <Form.Label>Phone number:</Form.Label>
        <Form.Control 
            type="text" 
            name="phone"
            // value={formData.message}
            // onChange={handleChange}
            required
            />
        </Form.Group>

        <Button variant="primary" type="submit">
            {/* {isSubmission ? 'Sending...' : 'Send'} */}
            Apply
        </Button>

        <Button variant="light" type="submit">
            {/* {isSubmission ? 'Sending...' : 'Send'} */}
            Back
        </Button>

        {/* {isSubmitted && (
            <Alert variant="success" className="mt-3">
            Your message has been sent successully!
            </Alert>
        )} */}

        {/* {error && (
            <Alert variant="danger" className="mt-3">
            {error}
            </Alert>
        )} */}
    </Form>
  );
}