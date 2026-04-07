import React, { useEffect, useState } from 'react';
import { getAdminStatsApi } from '../api/adminApi';
import StatCard from '../components/ui/StatCard';
import Card from '../components/ui/Card';
import { Users, Receipt, DollarSign } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { categoryColors } from '../utils/categoryColors';

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminPage = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getAdminStatsApi();
                setStats(data);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center min-h-[50vh]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
    }

    if (error) {
        return (
            <div className="bg-red-500 bg-opacity-10 border border-red-500/50 p-6 rounded-xl text-center">
                <h3 className="text-xl font-bold text-red-500 mb-2">Error Loading Stats</h3>
                <p className="text-red-400 cursor-not-allowed">{error}</p>
            </div>
        );
    }

    const { totalUsers, totalTransactions, platformSpend, categoryStats, userStats } = stats;
    
    // Category Chart Data
    const labels = categoryStats.map(c => c._id);
    const dataVals = categoryStats.map(c => c.total);
    const bgColors = labels.map(l => categoryColors[l] || '#9CA3AF');

    const chartData = {
        labels,
        datasets: [
            {
                data: dataVals,
                backgroundColor: bgColors.map(color => color + 'CC'),
                borderColor: bgColors,
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
                labels: { color: '#D1D5DB' }
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-2">Platform Admin</h1>
                <p className="text-gray-400">Overview of global platform activity (Anonymized).</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Total Users" 
                    value={totalUsers}
                    icon={Users}
                />
                <StatCard 
                    title="Total Transactions" 
                    value={totalTransactions}
                    icon={Receipt}
                />
                <StatCard 
                    title="Total Platform Income" 
                    value={`₹${platformSpend.income.toLocaleString()}`}
                    icon={DollarSign}
                />
                <StatCard 
                    title="Total Platform Expense" 
                    value={`₹${platformSpend.expense.toLocaleString()}`}
                    icon={DollarSign}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <Card>
                    <h3 className="text-lg font-semibold text-white mb-6">Global Spend by Category</h3>
                    <div className="h-80 relative flex items-center justify-center">
                        {categoryStats.length > 0 ? (
                            <Pie data={chartData} options={chartOptions} />
                        ) : (
                            <p className="text-gray-500">No transaction data</p>
                        )}
                    </div>
                </Card>

                <Card>
                    <h3 className="text-lg font-semibold text-white mb-6">Category Breakdown</h3>
                    <div className="space-y-4 overflow-y-auto max-h-80 pr-2">
                        {categoryStats.map((cat, idx) => (
                            <div key={idx} className="flex justify-between items-center p-3 bg-[#0F0F1A] rounded-lg border border-[#2D2D4A]">
                                <div className="flex items-center gap-3">
                                    <div 
                                        className="w-3 h-3 rounded-full" 
                                        style={{backgroundColor: categoryColors[cat._id] || '#9CA3AF'}}
                                    ></div>
                                    <span className="font-medium text-gray-300">{cat._id}</span>
                                </div>
                                <div className="flex gap-6 text-sm">
                                    <span className="text-gray-400">{cat.count} uses</span>
                                    <span className="text-white font-mono">₹{cat.total.toLocaleString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <Card className="mt-8">
                <h3 className="text-lg font-semibold text-white mb-6">Users Overview & Net Savings</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[#2D2D4A] text-gray-400 text-sm">
                                <th className="pb-4 font-medium px-4">User</th>
                                <th className="pb-4 font-medium px-4">Role</th>
                                <th className="pb-4 font-medium px-4 text-emerald-400">Total Income</th>
                                <th className="pb-4 font-medium px-4 text-red-400">Total Spent</th>
                                <th className="pb-4 font-medium px-4 text-white">Net Savings</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#2D2D4A]">
                            {userStats && userStats.map((u) => (
                                <tr key={u._id} className="hover:bg-white/5 transition-colors">
                                    <td className="py-4 px-4">
                                        <div className="text-white font-medium">{u.name}</div>
                                        <div className="text-xs text-gray-500">{u.email}</div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${u.role === 'admin' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 font-mono text-emerald-400">₹{u.totalIncome.toLocaleString()}</td>
                                    <td className="py-4 px-4 font-mono text-red-400">₹{u.totalExpense.toLocaleString()}</td>
                                    <td className="py-4 px-4 font-mono font-bold text-white">₹{u.savings.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default AdminPage;
