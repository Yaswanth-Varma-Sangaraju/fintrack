import React from 'react';

const Card = ({ children, className = '' }) => {
    return (
        <div className={`card-container ${className}`}>
            {children}
        </div>
    );
};

export default Card;
