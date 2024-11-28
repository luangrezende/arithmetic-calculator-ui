import { ACCOUNT_ENDPOINTS } from 'src/config/api-config';

import axiosUserInstance from '../axios/axios-user-interceptor';


export const addBalance = async (amount: number, accountId: string): Promise<any> => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found. Please log in again.');

        const response = await axiosUserInstance.post(
            `${ACCOUNT_ENDPOINTS.BALANCE}`,
            {
                accountId,
                amount,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                validateStatus: (status) => status >= 200 && status < 300,
            }
        );
        console.log(response);

        return response.data;
    } catch (error: any) {
        console.error('Error adding balance:', error);
        throw error.response?.data || 'An error occurred while adding balance.';
    }
};
