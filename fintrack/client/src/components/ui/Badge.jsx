import React from 'react';
import { categoryColors } from '../../utils/categoryColors';

const Badge = ({ children, category, type }) => {
    let bgColor = '#4B5563'; // Custom default bg
    let textColor = '#FFFFFF';

    if (category && categoryColors[category]) {
        bgColor = categoryColors[category] + '20'; // Math string append for 20% opacity approx
        textColor = categoryColors[category];
    } else if (type === 'income') {
        bgColor = 'rgba(16, 185, 129, 0.2)';
        textColor = '#10B981';
    } else if (type === 'expense') {
        bgColor = 'rgba(239, 68, 68, 0.2)';
        textColor = '#EF4444';
    }

    return (
        <span 
            className="px-2.5 py-0.5 rounded-full text-xs font-medium"
            style={{ backgroundColor: bgColor, color: textColor }}
        >
            {children}
        </span>
    );
};

export default Badge;
