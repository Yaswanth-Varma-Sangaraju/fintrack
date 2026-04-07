import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGoal, updateSpend } from '../features/goal/goalSlice';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Target, TrendingDown, AlertCircle } from 'lucide-react';

const GoalPage = () => {
    const dispatch = useDispatch();
    const { budgetGoal, currentSpend, progressPercent } = useSelector(state => state.goal);
    const { entries } = useSelector(state => state.transactions);
    
    const [goalInput, setGoalInput] = useState(budgetGoal || '');

    useEffect(() => {
        // Calculate this month's expenses
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        
        let totalExpense = 0;
        entries.forEach(t => {
            const d = new Date(t.date);
            if (t.type === 'expense' && d.getMonth() + 1 === currentMonth && d.getFullYear() === currentYear) {
                totalExpense += t.amount;
            }
        });
        
        dispatch(updateSpend(totalExpense));
    }, [entries, dispatch]);

    const handleSetGoal = (e) => {
        e.preventDefault();
        dispatch(setGoal(Number(goalInput)));
    };

    const isOverBudget = currentSpend > budgetGoal && budgetGoal > 0;
    const remaining = Math.max(budgetGoal - currentSpend, 0);

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Budget Goals</h1>
                <p className="text-gray-400">Set a monthly spending limit and track your progress.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-indigo-500 bg-opacity-20 rounded-xl flex items-center justify-center">
                            <Target className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Set Monthly Target</h3>
                            <p className="text-sm text-gray-400">Enter your expense limit</p>
                        </div>
                    </div>

                    <form onSubmit={handleSetGoal} className="space-y-4">
                        <div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span className="text-gray-400 text-lg">₹</span>
                                </div>
                                <input
                                    type="number"
                                    value={goalInput}
                                    onChange={(e) => setGoalInput(e.target.value)}
                                    min="0"
                                    step="10"
                                    className="input-field pl-8 text-2xl"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>
                        <Button type="submit" variant="primary" className="w-full">
                            Save Goal
                        </Button>
                    </form>
                </Card>

                <Card className="relative overflow-hidden">
                    {budgetGoal === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-6">
                            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                                <Target className="w-8 h-8 text-gray-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">No Goal Set</h3>
                            <p className="text-sm text-gray-400">Set a monthly budget target to start tracking.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col h-full justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-6">Current Progress</h3>
                                
                                <div className="flex justify-between items-end mb-2">
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Spent so far</p>
                                        <p className={`text-3xl font-bold ${isOverBudget ? 'text-red-500' : 'text-white'}`}>
                                            ₹{currentSpend.toLocaleString('en-US', {minimumFractionDigits: 2})}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-400 mb-1">Budget Goal</p>
                                        <p className="text-xl font-semibold text-gray-300">
                                            ₹{budgetGoal.toLocaleString('en-US', {minimumFractionDigits: 2})}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <div className="flex justify-between text-sm font-medium mb-2">
                                        <span className={isOverBudget ? 'text-red-400' : 'text-emerald-400'}>
                                            {progressPercent.toFixed(1)}% Used
                                        </span>
                                        <span className="text-gray-400">
                                            ₹{remaining.toLocaleString()} left
                                        </span>
                                    </div>
                                    <div className="w-full bg-[#0F0F1A] rounded-full h-3 mb-6">
                                        <div 
                                            className={`h-3 rounded-full transition-all duration-1000 ${isOverBudget ? 'bg-red-500' : 'bg-emerald-500'}`}
                                            style={{width: `${progressPercent}%`}}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            
                            {isOverBudget ? (
                                <div className="flex items-start gap-3 bg-red-500 bg-opacity-10 border border-red-500/20 p-4 rounded-xl">
                                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                    <p className="text-sm text-red-400 font-medium">You have exceeded your monthly budget goal. Try to reduce discretionary spending for the rest of the month.</p>
                                </div>
                            ) : (
                                <div className="flex items-start gap-3 bg-emerald-500 bg-opacity-10 border border-emerald-500/20 p-4 rounded-xl">
                                    <TrendingDown className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                    <p className="text-sm text-emerald-400 font-medium">You are on track! Keep monitoring your expenses to stay within your budget limit.</p>
                                </div>
                            )}
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default GoalPage;
