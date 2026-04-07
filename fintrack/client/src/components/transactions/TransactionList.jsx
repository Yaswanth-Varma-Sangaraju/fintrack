import React from 'react';
import TransactionItem from './TransactionItem';

const TransactionList = ({ transactions, loading }) => {
    if (loading) {
        return <div className="text-gray-400 py-8 text-center animate-pulse">Loading transactions...</div>;
    }

    if (transactions.length === 0) {
        return (
            <div className="text-gray-500 py-12 text-center bg-surface border border-border rounded-xl">
                <p className="text-lg mb-2">No transactions found</p>
                <p className="text-sm">Add a new transaction to see it here.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            {transactions.map(t => (
                <TransactionItem key={t._id} transaction={t} />
            ))}
        </div>
    );
};

export default TransactionList;
