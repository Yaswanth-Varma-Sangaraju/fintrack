import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MonthlyBarChart = ({ monthlyData }) => {
    // Process aggregate data from MongoDB
    // monthlyData structure: { _id: { month, year, type, category }, total }
    
    // Create an object to store totals by month "YYYY-MM"
    const monthMap = {};

    monthlyData.forEach(item => {
        const { month, year, type } = item._id;
        const key = `${year}-${month.toString().padStart(2, '0')}`;
        
        if (!monthMap[key]) {
            monthMap[key] = { income: 0, expense: 0 };
        }
        monthMap[key][type] += item.total;
    });

    // Sort the keys
    const sortedKeys = Object.keys(monthMap).sort();

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const labels = sortedKeys.map(key => {
        const [year, month] = key.split('-');
        return `${monthNames[parseInt(month) - 1]} ${year.substring(2)}`;
    });

    const incomeData = sortedKeys.map(key => monthMap[key].income);
    const expenseData = sortedKeys.map(key => monthMap[key].expense);

    const data = {
        labels,
        datasets: [
            {
                label: 'Income',
                data: incomeData,
                backgroundColor: '#10B981',
                borderRadius: 4,
                barPercentage: 0.6,
                categoryPercentage: 0.8
            },
            {
                label: 'Expense',
                data: expenseData,
                backgroundColor: '#EF4444',
                borderRadius: 4,
                barPercentage: 0.6,
                categoryPercentage: 0.8
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#D1D5DB',
                    usePointStyle: true,
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
            }
        },
        scales: {
            y: {
                grid: {
                    color: '#2D2D4A',
                    drawBorder: false,
                },
                ticks: {
                    color: '#9CA3AF',
                    callback: (value) => '₹' + value
                }
            },
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    color: '#9CA3AF'
                }
            }
        }
    };

    if (sortedKeys.length === 0) {
        return (
            <div className="flex items-center justify-center h-full text-gray-500">
                No monthly data available
            </div>
        );
    }

    return (
        <div className="h-64 w-full">
            <Bar data={data} options={options} />
        </div>
    );
};

export default MonthlyBarChart;
