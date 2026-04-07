import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTransaction } from '../../features/transactions/transactionThunks';
import Badge from '../ui/Badge';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { Trash2 } from 'lucide-react';

const TransactionItem = ({ transaction }) => {
    const { role } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const isAdmin = role === 'admin';

    const handleDelete = () => {
        const idToDelete = transaction._id || transaction.id;
        
        if (!idToDelete) {
            alert("Error: Transaction ID is missing on this item!");
            return;
        }

        if(window.confirm('Are you sure you want to delete this transaction?')) {
            dispatch(deleteTransaction(idToDelete))
                .unwrap()
                .then(() => {
                    // Force a hard component update if Redux is lagging
                    alert("Deleted successfully!");
                })
                .catch((err) => {
                    console.error("Delete error:", err);
                    alert("Failed to delete transaction: " + err);
                });
        }
    };

    return (
        <div className="flex items-center justify-between p-4 mb-3 bg-surface border border-border rounded-xl hover:bg-[#202038] transition group">
            <div className="flex items-center gap-4">
                <div className={`w-2 h-10 rounded-full ${transaction.type === 'income' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                <div>
                    <div className="flex items-center gap-2">
                        <h4 className="text-white font-medium">{transaction.note || transaction.category}</h4>
                        {isAdmin && transaction.userId && typeof transaction.userId === 'object' && (
                            <span className="text-[10px] px-1.5 py-0.5 bg-indigo-500/20 text-indigo-400 rounded-md border border-indigo-500/30">
                                {transaction.userId.name || 'Unknown User'}
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
                </div>
            </div>
            
            <div className="flex items-center gap-6">
                <Badge category={transaction.category} type={transaction.type}>
                    {transaction.category}
                </Badge>
                
                <div className={`font-mono font-medium ${transaction.type === 'income' ? 'text-emerald-400' : 'text-white'}`}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </div>
                
                <button 
                    onClick={handleDelete}
                    className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
                    title="Delete transaction"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default TransactionItem;
