import React from 'react';
import Card from './Card';

const StatCard = ({ title, value, icon: Icon, trend }) => {
    return (
        <Card className="flex flex-col">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-white">{value}</h3>
                </div>
                <div className="p-3 bg-indigo-500 bg-opacity-20 rounded-xl">
                    <Icon className="w-6 h-6 text-indigo-400" />
                </div>
            </div>
            {trend !== undefined && (
                <div className="mt-4 flex items-center">
                    <span className={`text-sm font-medium ${trend >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {trend >= 0 ? '+' : ''}{trend}%
                    </span>
                    <span className="text-gray-500 text-sm ml-2">from last month</span>
                </div>
            )}
        </Card>
    );
};

export default StatCard;
