import React from "react";
import { Button, Glyphicon, ButtonProps } from "react-bootstrap";
import "./LoaderButton.css";

interface LoaderButtonProps extends ButtonProps {
    isLoading: boolean;
}

const LoaderButton: React.FC<LoaderButtonProps> = ({
    isLoading,
    className = "",
    disabled = false,
    ...props
}) => {
    return (
        <Button
            className={`LoaderButton ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <Glyphicon glyph="refresh" className="spinning" />}
            {props.children}
        </Button>
    );
}

export default LoaderButton;