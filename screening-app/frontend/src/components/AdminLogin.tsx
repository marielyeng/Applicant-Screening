import React, { useState } from 'react';
import { ButtonProps } from 'react-bootstrap';
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
      <LeftColumn>
        <Img src='/profile.png' alt='Profile' />
        <h1>Welcome</h1>
      </LeftColumn>

      <RightColumn>
        <Form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Inputs
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Username'
              required 
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Inputs 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password" 
              required
            />
          </Form.Group>

          <StyledButton variant="primary" type="submit">
            Login
          </StyledButton>
        </Form>
      </RightColumn>
    </LContainer>
  );
};

const LContainer = styled(Container)`
  margin-top: 10%;
  background-color: #e7eaf6;
  padding: 24px;
  border-radius: 48px;
  width: 40%;
  box-shadow: 2px 4px 8px #9fd3c7;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  flex-direction: row;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;
  text-align: center;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
  width: 50%;
`;

const Img = styled(Image)`
  width: 40%;
  height: auto;
  margin-bottom: 24px;
`;

const Inputs = styled(Form.Control)`
  width: 100%;
  max-width: 300px;
`;

const StyledButton = styled(Button)<ButtonProps>`
  width: 100%;
  max-width: 300px;
`;

