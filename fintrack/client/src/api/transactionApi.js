import API from './axiosInstance';

export const getTransactionsApi = async () => {
    const response = await API.get('/transactions');
    return response.data;
};

export const createTransactionApi = async (data) => {
    const response = await API.post('/transactions', data);
    return response.data;
};

export const deleteTransactionApi = async (id) => {
    const response = await API.delete(`/transactions/${id}`);
    return response.data;
};

export const getMonthlyTransactionsApi = async () => {
    const response = await API.get('/transactions/monthly');
    return response.data;
};
