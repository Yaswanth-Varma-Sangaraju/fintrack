import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions, fetchMonthlyData } from '../features/transactions/transactionThunks';
import { getAiAdviceApi } from '../api/aiApi';
import StatCard from '../components/ui/StatCard';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import CategoryPieChart from '../components/charts/CategoryPieChart';
import MonthlyBarChart from '../components/charts/MonthlyBarChart';
import TransactionItem from '../components/transactions/TransactionItem';
import { Wallet, TrendingUp, TrendingDown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    const dispatch = useDispatch();
    const { user, role } = useSelector(state => state.auth);
    const { entries, monthlyData, loading } = useSelector(state => state.transactions);
    const { budgetGoal } = useSelector(state => state.goal);
    
    const isAdmin = role === 'admin';
    const [aiAdvice, setAiAdvice] = useState('');
    const [aiLoading, setAiLoading] = useState(false);

    useEffect(() => {
        dispatch(fetchTransactions());
        dispatch(fetchMonthlyData());
    }, [dispatch]);

    // Calculate totals
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    
    let totalIncome = 0;
    let totalExpense = 0;
    
    // For admin, show all current month transactions; for user, filter by their transactions (already filtered via API but being extra safe here or if we want to add local filtering logic)
    const currentMonthTransactions = entries.filter(t => {
        const d = new Date(t.date);
        return d.getMonth() + 1 === currentMonth && d.getFullYear() === currentYear;
    });

    currentMonthTransactions.forEach(t => {
        if (t.type === 'income') totalIncome += t.amount;
        if (t.type === 'expense') totalExpense += t.amount;
    });

    const balance = totalIncome - totalExpense;
    
    const handleGetAdvice = async () => {
        if (entries.length === 0) return;
        
        setAiLoading(true);
        try {
            // Find top 3 expense categories
            const expenses = entries.filter(t => t.type === 'expense');
            const categoryTotals = expenses.reduce((acc, curr) => {
                acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
                return acc;
            }, {});
            
            const topCategories = Object.entries(categoryTotals)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(item => item[0]);
            
            const reqCategories = topCategories.length > 0 ? topCategories : ['General'];
            
            const data = await getAiAdviceApi(reqCategories);
            setAiAdvice(data.advice);
        } catch (error) {
            console.error(error);
            setAiAdvice('Unable to get advice right now. Check your API key.');
        } finally {
            setAiLoading(false);
        }
    };

    const formatProgress = () => {
        if(budgetGoal === 0) return 0;
        return Math.min((totalExpense / budgetGoal) * 100, 100).toFixed(1);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        {isAdmin ? 'Platform Dashboard' : 'My Dashboard'}
                    </h1>
                    <p className="text-gray-400">
                        {isAdmin 
                            ? 'Overview of platform-wide financial activity.' 
                            : "Welcome back. Here's your financial overview for this month."}
                    </p>
                </div>
                <Link to="/transactions">
                    <Button variant="primary">Add Transaction</Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                    title="Total Balance" 
                    value={`₹${balance.toLocaleString('en-US', {minimumFractionDigits: 2})}`}
                    icon={Wallet}
                />
                <StatCard 
                    title="Income" 
                    value={`₹${totalIncome.toLocaleString('en-US', {minimumFractionDigits: 2})}`}
                    icon={TrendingUp}
                    trend={5.2}
                />
                <StatCard 
                    title="Expenses" 
                    value={`₹${totalExpense.toLocaleString('en-US', {minimumFractionDigits: 2})}`}
                    icon={TrendingDown}
                    trend={-2.4}
                />
            </div>

            {budgetGoal > 0 && (
                 <Card className="w-full">
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-300 font-medium">Monthly Budget Goal (₹{budgetGoal})</span>
                        <span className={`${totalExpense > budgetGoal ? 'text-red-400' : 'text-emerald-400'}`}>
                            {formatProgress()}%
                        </span>
                    </div>
                    <div className="w-full bg-[#0F0F1A] rounded-full h-2.5">
                        <div 
                            className={`h-2.5 rounded-full ${totalExpense > budgetGoal ? 'bg-red-500' : 'bg-primary'}`}
                            style={{width: `${formatProgress()}%`}}
                        ></div>
                    </div>
                 </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <h3 className="text-lg font-semibold text-white mb-6">Income vs Expenses</h3>
                    <MonthlyBarChart monthlyData={monthlyData} />
                </Card>
                
                <Card>
                    <h3 className="text-lg font-semibold text-white mb-6">Expense Breakdown</h3>
                    <CategoryPieChart transactions={entries} />
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="col-span-1 lg:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-white">
                            {isAdmin ? 'Recent Platform Activity' : 'Recent Transactions'}
                        </h3>
                        <Link to="/transactions" className="text-sm border-b border-gray-600 text-gray-400 hover:text-white transition">View All</Link>
                    </div>
                    <div className="space-y-1">
                        {loading ? (
                            <p className="text-gray-500 animate-pulse">Loading...</p>
                        ) : entries.slice(0, 5).map(t => (
                            <TransactionItem key={t._id} transaction={t} />
                        ))}
                        {entries.length === 0 && !loading && (
                            <p className="text-gray-500 text-center py-4">No transactions yet.</p>
                        )}
                    </div>
                </Card>

                <Card className="bg-gradient-to-br from-indigo-900/30 to-surface border-indigo-500/20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-indigo-500 bg-opacity-20 rounded-lg">
                            <Sparkles className="w-6 h-6 text-indigo-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">AI Financial Advisor</h3>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-6">
                        Get personalized insights based on your spending habits from Claude AI.
                    </p>

                    {aiAdvice ? (
                        <div className="prose prose-invert prose-sm">
                            <ul className="text-gray-300 space-y-2 mb-6">
                                {aiAdvice.split('\n').map((line, i) => (
                                    <li key={i}>{line.replace(/^[^a-zA-Z0-9]+/, '')}</li>
                                ))}
                            </ul>
                            <Button onClick={handleGetAdvice} variant="ghost" className="w-full text-sm" disabled={aiLoading}>
                                {aiLoading ? 'Analyzing...' : 'Refresh Advice'}
                            </Button>
                        </div>
                    ) : (
                        <Button onClick={handleGetAdvice} variant="primary" className="w-full" disabled={aiLoading || entries.length === 0}>
                            {aiLoading ? 'Analyzing...' : 'Get AI Advice'}
                        </Button>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;
