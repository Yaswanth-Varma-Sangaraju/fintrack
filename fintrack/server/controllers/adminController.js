import Transaction from '../models/Transaction.js';
import User from '../models/User.js';

// @desc    Get admin statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        
        const categoryStats = await Transaction.aggregate([
            { $group: { _id: '$category', total: { $sum: '$amount' }, count: { $sum: 1 } } },
            { $sort: { total: -1 } }
        ]);

        const totalTransactions = await Transaction.countDocuments();
        
        const platformSpendData = await Transaction.aggregate([
            { $group: { _id: '$type', total: { $sum: '$amount' } } }
        ]);

        const platformSpend = platformSpendData.reduce((acc, curr) => {
            acc[curr._id] = curr.total;
            return acc;
        }, { income: 0, expense: 0 });

        // Aggregate per-user stats
        const userStatsRaw = await Transaction.aggregate([
            {
                $group: {
                    _id: '$userId',
                    totalIncome: {
                        $sum: { $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0] }
                    },
                    totalExpense: {
                        $sum: { $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0] }
                    }
                }
            }
        ]);

        // Merge with user names
        const users = await User.find({}, 'name email role');
        const userStats = users.map(user => {
            const stats = userStatsRaw.find(s => s._id.toString() === user._id.toString()) || { totalIncome: 0, totalExpense: 0 };
            return {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                ...stats,
                savings: stats.totalIncome - stats.totalExpense
            };
        });

        res.json({
            totalUsers,
            totalTransactions,
            platformSpend,
            categoryStats,
            userStats
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
