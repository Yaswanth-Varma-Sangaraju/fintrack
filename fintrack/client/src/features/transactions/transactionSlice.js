import { createSlice } from '@reduxjs/toolkit';
import { fetchTransactions, addTransaction, deleteTransaction, fetchMonthlyData } from './transactionThunks';

const initialState = {
    entries: [],
    monthlyData: [],
    filters: { type: 'all', category: 'all' },
    loading: false,
    error: null,
};

export const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearTransactionsState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            // Fetch Transactions
            .addCase(fetchTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.entries = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Add Transaction
            .addCase(addTransaction.pending, (state) => {
                state.loading = true;
            })
            .addCase(addTransaction.fulfilled, (state, action) => {
                state.loading = false;
                state.entries.unshift(action.payload);
            })
            .addCase(addTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete Transaction
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.entries = state.entries.filter(t => t._id !== action.payload);
            })

            // Fetch Monthly Data
            .addCase(fetchMonthlyData.fulfilled, (state, action) => {
                state.monthlyData = action.payload;
            });
    },
});

export const { setFilter, clearTransactionsState } = transactionSlice.actions;
export default transactionSlice.reducer;
