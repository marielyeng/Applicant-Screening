import React from "react";
import Container from "react-bootstrap/Container";
import { FormApplication } from "../components/FormApplication";
import { FormFileUpload } from "../components/FormFileUpload";

export const Home: React.FC = () => {
    return (
        <Container>
            <h1>Job Listings</h1>
            <FormApplication />
            <FormFileUpload />
        </Container>
    )
}