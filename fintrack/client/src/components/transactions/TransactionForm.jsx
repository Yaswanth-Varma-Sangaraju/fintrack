import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../../features/transactions/transactionThunks';
import { CATEGORIES } from '../../constants/categories';
import Button from '../ui/Button';

const TransactionForm = ({ onSuccess }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        type: 'expense',
        amount: '',
        category: CATEGORIES[0],
        note: '',
        date: new Date().toISOString().slice(0, 10),
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(addTransaction({
                ...formData,
                amount: Number(formData.amount)
            })).unwrap();
            
            if(onSuccess) onSuccess();
        } catch (err) {
            alert("Failed to add transaction: " + err);
        }
        
        // Reset form
        setFormData({
            type: 'expense',
            amount: '',
            category: CATEGORIES[0],
            note: '',
            date: new Date().toISOString().slice(0, 10),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4 mb-6">
                <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'expense' })}
                    className={`flex-1 py-2 rounded-lg font-medium transition ${
                        formData.type === 'expense' 
                            ? 'bg-red-500 bg-opacity-20 text-red-400 border border-red-500/50' 
                            : 'bg-surface border border-border text-gray-400 hover:bg-[#2D2D4A]'
                    }`}
                >
                    Expense
                </button>
                <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'income' })}
                    className={`flex-1 py-2 rounded-lg font-medium transition ${
                        formData.type === 'income' 
                            ? 'bg-emerald-500 bg-opacity-20 text-emerald-400 border border-emerald-500/50' 
                            : 'bg-surface border border-border text-gray-400 hover:bg-[#2D2D4A]'
                    }`}
                >
                    Income
                </button>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Amount (₹)</label>
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                    className="input-field text-xl"
                    placeholder="0.00"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="input-field"
                    >
                        {CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Note (Optional)</label>
                <input
                    type="text"
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="E.g., Groceries at Target"
                />
            </div>

            <Button type="submit" variant="primary" className="w-full mt-4">
                Add {formData.type === 'income' ? 'Income' : 'Expense'}
            </Button>
        </form>
    );
};

export default TransactionForm;
