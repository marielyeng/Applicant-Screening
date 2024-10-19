import React from 'react';
import styled from 'styled-components';

export const AdminNavBar: React.FC = () => {
    return (
        <Nav>
            <Menu>
                <Icon src='/edit.png' />
                <Link href="/">Delete/Update Job Post</Link>
            </Menu>

            <Menu>
                <Icon src='/user.png' />
                <Link href="/">Add new user</Link>
            </Menu>

            <Menu>
                <Icon src='/contact-us.png' />
                <Link href="/">Contact Support</Link>
            </Menu>
        </Nav>
    );
};

const Nav = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 2vw;
    align-items: center;
    margin-top: 2%;
    font-size: 1.2rem;

    @media (max-width: 768px) {
        font-size: 1rem;
        gap: 3vw;
    }

    @media (max-width: 480px) {
        flex-direction: column;
        gap: 4vh;
    }
`;

const Link = styled.a`
    text-decoration: none;
    color: #142d4c;
    margin-left: 0.5vw;
    display: inline-block;
    font-size: 1.1rem;

    &:hover {
        color: #9fd3c7;
        text-decoration: underline;
    }
`;

const Menu = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0 2vw;

    @media (max-width: 480px) {
        margin: 1vw 1vh;
    }
`;

const Icon = styled.img`
    width: 2vw;
    height: auto;

    @media (max-width: 768px) {
        width: 2vw;
    }

    @media (max-width: 480px) {
        width: 4vw;
    }
`;
