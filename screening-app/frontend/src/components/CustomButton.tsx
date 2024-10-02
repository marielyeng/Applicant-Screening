// CustomButton.tsx
import React from 'react';
import { Button } from 'react-bootstrap';

interface CustomButtonProps {
    variant: string; // Button variant (e.g., 'primary', 'outline-light')
    size?: 'sm' | 'lg' | undefined; // Optional size
    text: string; // Button text
    className?: string; // Additional classes for styling
    onClick?: () => void; // Optional click handler
}

const CustomButton: React.FC<CustomButtonProps> = ({
    variant,
    size,
    text,
    className = '',
    onClick,
}) => {
    return (
        <Button 
            variant={variant} 
            size={size} 
            className={` ${className}`} 
            onClick={onClick}
        >
            {text}
        </Button>
    );
};

export default CustomButton;
