import React from "react";
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for routing
import Image from 'react-bootstrap/Image';

export const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleBrowseJobClick = () => {
        navigate(`/jobs`);  // Navigate to the job details page with the job ID
    };

    const handlePostJobClick = () => {
        navigate('/admin-login')
    }

    return (
        <Container fluid>
            <h1>Job Post within your Reach</h1>
            <Card style={{ width: '18rem' }} border="info">
                <Card.Body>
                    <Card.Title>Explore</Card.Title>
                    <Card.Text>Browse Available Jobs</Card.Text>
                    {/* Use a button to trigger navigation for more details */}
                    <button className="btn btn-link" onClick={handleBrowseJobClick}>
                        <Image src="right-arrow.png" height='25px' width='25px' rounded />
                    </button>
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }} border="info">
                <Card.Body>
                    <Card.Title>Post a Job</Card.Title>
                    <Card.Text>Need talents?</Card.Text>
                    {/* Use a button to trigger navigation for more details */}
                    <button className="btn btn-link" onClick={handlePostJobClick}>
                        <Image src="right-arrow.png" height='25px' width='25px' rounded />
                    </button>
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }} border="info">
                <Card.Body>
                    <Card.Title>How it works</Card.Title>
                    <Card.Text>Job Seeker - FAQ</Card.Text>
                    {/* Use a button to trigger navigation for more details */}
                    <button className="btn btn-link" onClick={handleBrowseJobClick}>
                        <Image src="right-arrow.png" height='25px' width='25px' rounded />
                    </button>
                </Card.Body>
            </Card>
        </Container>
    )
}