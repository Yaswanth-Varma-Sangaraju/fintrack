import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../features/transactions/transactionThunks';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import TransactionList from '../components/transactions/TransactionList';
import TransactionForm from '../components/transactions/TransactionForm';
import { CATEGORIES } from '../constants/categories';
import { Plus } from 'lucide-react';

const TransactionsPage = () => {
    const dispatch = useDispatch();
    const { role } = useSelector(state => state.auth);
    const { entries, loading } = useSelector(state => state.transactions);
    
    const isAdmin = role === 'admin';
    
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [typeFilter, setTypeFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    const filteredTransactions = entries.filter(t => {
        if (typeFilter !== 'all' && t.type !== typeFilter) return false;
        if (categoryFilter !== 'all' && t.category !== categoryFilter) return false;
        return true;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        {isAdmin ? 'All Platform Transactions' : 'My Transactions'}
                    </h1>
                    <p className="text-gray-400">
                        {isAdmin ? 'Monitoring and managing all user activity.' : 'View and manage your income and expenses.'}
                    </p>
                </div>
                <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
                    <Plus className="w-5 h-5 mr-2" /> Add Transaction
                </Button>
            </div>

            <Card>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <input 
                            type="text" 
                            placeholder="Search transactions..." 
                            className="input-field w-full"
                        />
                    </div>
                    <div className="flex gap-4">
                        <select 
                            className="input-field"
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                        >
                            <option value="all">All Types</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                        <select 
                            className="input-field"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <option value="all">All Categories</option>
                            {CATEGORIES.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <TransactionList transactions={filteredTransactions} loading={loading} />
            </Card>

            <Modal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)}
                title="Add New Transaction"
            >
                <TransactionForm onSuccess={() => setIsAddModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default TransactionsPage;
