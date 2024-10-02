import React from 'react';

interface TitleProps {
    title: string;
}

export const Heading: React.FC<TitleProps> = ({title}) => {
    return (
        <h1>{title}</h1>
    )
}