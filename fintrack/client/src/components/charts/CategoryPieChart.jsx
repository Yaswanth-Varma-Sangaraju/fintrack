import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { categoryColors } from '../../utils/categoryColors';

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = ({ transactions }) => {
    // Only calculate for expenses
    const expenses = transactions.filter(t => t.type === 'expense');
    
    const categoryTotals = expenses.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
    }, {});

    const labels = Object.keys(categoryTotals);
    const dataVals = Object.values(categoryTotals);
    const bgColors = labels.map(label => categoryColors[label] || '#9CA3AF');
    const borderColors = labels.map(label => categoryColors[label] || '#9CA3AF');

    const data = {
        labels,
        datasets: [
            {
                data: dataVals,
                backgroundColor: bgColors.map(color => color + 'CC'),
                borderColor: borderColors,
                borderWidth: 1,
                hoverOffset: 4
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: '#D1D5DB',
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        family: "'Space Grotesk', sans-serif"
                    }
                }
            },
            tooltip: {
                backgroundColor: '#1A1A2E',
                titleColor: '#F3F4F6',
                bodyColor: '#D1D5DB',
                borderColor: '#2D2D4A',
                borderWidth: 1,
                padding: 12,
                boxPadding: 8
            }
        },
        cutout: '70%'
    };

    if (expenses.length === 0) {
        return (
            <div className="flex items-center justify-center h-full text-gray-500">
                No expense data available
            </div>
        );
    }

    return (
        <div className="relative h-64 w-full">
            <Doughnut data={data} options={options} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-gray-400 text-sm">Total</span>
                <span className="text-white font-bold text-xl">
                    ₹{dataVals.reduce((a, b) => a + b, 0).toLocaleString()}
                </span>
            </div>
        </div>
    );
};

export default CategoryPieChart;
