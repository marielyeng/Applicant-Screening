import React from "react";
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import styled from "styled-components";

export const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleBrowseJobClick = () => {
        navigate(`/jobs`);
    };

    const handlePostJobClick = () => {
        navigate('/admin-login')
    }

    return (
        <HContainer fluid>
            <Heading>Tech/Job <Highlight>Hunt</Highlight></Heading>
            <SubHead>The Job Portal for Tech Talents</SubHead>
            <CardContainer>
                <Card style={{ width: '18rem' }}>
                    <CardBody>
                        <CardTitle>Explore</CardTitle>
                        <CardText>Browse Available Jobs in the Tech Market today.</CardText>
                        <BtnWrapper>
                            <button className="btn btn-link" onClick={handleBrowseJobClick}>
                                <Image src="right-arrow.png" height='25px' width='25px' rounded />
                            </button>
                        </BtnWrapper>
                    </CardBody>
                </Card>
                <Card style={{ width: '18rem' }}>
                    <CardBody>
                        <CardTitle>Post a Job</CardTitle>
                        <CardText>Need talents?<br />
                            Reach out to us, or 
                            <a href='/admin-login'> login</a> your employer account.
                        </CardText>
                        <BtnWrapper>
                            <button className="btn btn-link" onClick={handlePostJobClick}>
                                <Image src="right-arrow.png" height='25px' width='25px' rounded />
                            </button>
                        </BtnWrapper>
                    </CardBody>
                </Card>
                <Card style={{ width: '18rem' }}>
                    <CardBody>
                        <CardTitle>How it works</CardTitle>
                        <CardText>Job Seeker - FAQ<br />
                        Learn more about this page or share us your experience <a href='/'>here.</a>
                        </CardText>
                        <BtnWrapper>
                            <button className="btn btn-link" onClick={handleBrowseJobClick}>
                                <Image src="right-arrow.png" height='25px' width='25px' rounded />
                            </button>
                        </BtnWrapper>
                    </CardBody>
                </Card>
            </CardContainer>
        </HContainer>
    )
}

const Heading = styled.h1`
    font-weight: bold;
    font-size: 3.5em;
    color: #142d4c;
    padding: 24px 0 6px 0;
    text-shadow: 1px 4px 4px #ececec;
`;

const SubHead = styled.h2`
    font-size: 2.3em;
    padding-bottom: 24px;
     z-index: 1;
    position: relative;
`;

const Highlight = styled.span`
    color:#ff9a3c;
`;

const CardTitle = styled(Card.Title)`
    font-weight: bold;
    font-size: 2em;
    padding: 16px;
    text-align: center;
    z-index: 1;
    position: relative;
`;

const CardText = styled(Card.Text)`
    text-align: center;
     z-index: 1;
    position: relative;
`;

const CardBody = styled(Card.Body)`
    box-shadow: 2px 4px 8px #9fd3c7;
    border-bottom: 12px solid #142d4c;
    border-radius: 6px;
    position: relative;
    padding-bottom: 46px; 
overflow: hidden; /* Ensure the background stays within bounds */

    &:hover {
        color: #e7eaf6;
    }

    &:hover::before {
        top: 0;
    }

    &::before {
        content: "";
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #142d4c;
        transition: top 0.5s;
    }
`;

const HContainer = styled(Container)`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const BtnWrapper = styled.div`
    position: absolute;
    bottom: 10px;
    width: 100%;
    z-index: 1000;
`;

const CardContainer = styled(Container)`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 2em;
`;