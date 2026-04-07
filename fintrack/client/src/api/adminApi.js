import API from './axiosInstance';

export const getAdminStatsApi = async () => {
    const response = await API.get('/admin/stats');
    return response.data;
};
