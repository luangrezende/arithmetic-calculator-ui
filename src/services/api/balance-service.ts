import { ACCOUNT_ENDPOINTS } from 'src/config/api-config';

import axiosInstance from '../axios/axios-interceptor';


export const addCredit = async (amount: number, accountId: string): Promise<any> => {
    try {
        const response = await axiosInstance.post(
            `${ACCOUNT_ENDPOINTS.BALANCE}`,
            {
                accountId,
                amount,
            },
            {
                validateStatus: (status) => status >= 200 && status < 300,
            }
        );
        return response.data;
    } catch (error: any) {
        console.error('Error adding balance:', error);
        throw error.response?.data || 'An error occurred while adding balance.';
    }
};
