import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    border: 2px solid ${props => (props.primary ? '#FFFFFF' : '#F35860')};
    border-radius: 8px;
    background-color: ${props => (props.primary ? '#F35860' : '#FFFFFF')};
    color: ${props => (props.primary ? '#FFFFFF' : '#F35860')};
    font-size: 14px;
    cursor: pointer;
    padding: 6px 12px;
`

const Button = ({ primary, children, onClick, ...props }) => {
    return  (
        <StyledButton primary={primary} onClick={onClick}>{children}</ StyledButton>
    )
}

export default Button;