import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
    getTransactionsApi, 
    createTransactionApi, 
    deleteTransactionApi, 
    getMonthlyTransactionsApi 
} from '../../api/transactionApi';

export const fetchTransactions = createAsyncThunk(
    'transactions/fetch',
    async (_, thunkAPI) => {
        try {
            return await getTransactionsApi();
        } catch (error) {
            const message = error.response?.data?.message || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const addTransaction = createAsyncThunk(
    'transactions/add',
    async (transactionData, thunkAPI) => {
        try {
            const result = await createTransactionApi(transactionData);
            thunkAPI.dispatch(fetchMonthlyData());
            return result;
        } catch (error) {
            const message = error.response?.data?.message || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteTransaction = createAsyncThunk(
    'transactions/delete',
    async (id, thunkAPI) => {
        try {
            await deleteTransactionApi(id);
            thunkAPI.dispatch(fetchMonthlyData());
            return id;
        } catch (error) {
            const message = error.response?.data?.message || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const fetchMonthlyData = createAsyncThunk(
    'transactions/fetchMonthly',
    async (_, thunkAPI) => {
        try {
            return await getMonthlyTransactionsApi();
        } catch (error) {
            const message = error.response?.data?.message || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);
