import React from "react";
import Container from "react-bootstrap/Container";
import { JobCards } from "../components/JobCards";
import { Heading } from "../components/Heading";

export const Home: React.FC = () => {
    return (
        <Container>
            <Heading title = 'Job Listings' />
          
        </Container>
    )
}