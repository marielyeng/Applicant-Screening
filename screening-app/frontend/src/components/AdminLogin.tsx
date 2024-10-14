import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';
import Image from 'react-bootstrap/Image';

export const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password
      });

      localStorage.setItem('jwtToken', response.data.access_token);

      navigate('/admin-post-job');
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <LContainer>
      <Img src='/profile.png' />
      <Form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Control 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
            required 
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            required 
            className='w-1000'
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </LContainer>
  );
};

const LContainer = styled(Container)`
  margin-top: 5%;
  background-color: #e7eaf6;
  padding: 24px;
  border-radius: 48px;
  width: 40%;
  box-shadow: 2px 4px 8px #9fd3c7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh; /* Full height of viewport */
`;

const Img = styled(Image)`
  width: 15%;
  height: 15%;
  display: block;
  margin-bottom: 24px; /* Add some space between image and form */
`;
