import API from './axiosInstance';

export const getAiAdviceApi = async (categories) => {
    const response = await API.post('/ai/advice', { categories });
    return response.data;
};
