import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyle = "px-4 py-2 font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 flex items-center justify-center";
    
    const variants = {
        primary: "bg-primary text-white hover:bg-indigo-600 focus:ring-indigo-500",
        ghost: "bg-transparent border border-primary text-primary hover:bg-indigo-900 focus:ring-indigo-500",
        danger: "bg-danger text-white hover:bg-red-600 focus:ring-red-500",
    };

    return (
        <button 
            className={`${baseStyle} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
