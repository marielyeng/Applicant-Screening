import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FormApplication } from "../components/FormApplication";
import { FormFileUpload } from "../components/FormFileUpload";

export const JobApplication: React.FC = () => {
    return (
        <Container>
      <Row>
        <Col><FormApplication /></Col>
        <Col><FormFileUpload /></Col>
      </Row>
    </Container>
    )
}