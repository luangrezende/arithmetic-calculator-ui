import { OPERATIONS_API_URL, OPERATIONS_ENDPOINTS } from 'src/config/api-config';

import axiosInstance from '../axios/axios-interceptor';

export const addOperationRecord = async (accountId: string, expression: string): Promise<any> => {
    try {
        const payload: any = {
            accountId,
            expression,
        };

        const response = await axiosInstance.post(
            `${OPERATIONS_API_URL}${OPERATIONS_ENDPOINTS.RECORDS}`,
            payload,
            {
                validateStatus: (status) => status >= 200 && status < 300,
            }
        );

        return response.data;
    } catch (error: any) {
        console.error('Error adding operation:', error);
        throw error.response?.data?.data?.error || error.response?.data?.message || 'An error occurred while adding operation.';
    }
};

export const getDashboardData = async (): Promise<any> => {
    try {
        const response = await axiosInstance.get(
            `${OPERATIONS_API_URL}${OPERATIONS_ENDPOINTS.DASHBOARD}`,
            {
                validateStatus: (status) => status >= 200 && status < 300,
            }
        );

        return response.data;
    } catch (error: any) {
        console.error('Error getting operation:', error);
        throw error.response?.data || 'An error occurred while getting operation.';
    }
};

export const deleteOperationRecords = async (ids: string[]): Promise<void> => {
    try {
        await axiosInstance.delete(`${OPERATIONS_API_URL}${OPERATIONS_ENDPOINTS.RECORDS}`, {
            data: { ids },
            validateStatus: (status) => status >= 200 && status < 300,
        });
    } catch (error: any) {
        console.error('Error deleting operations:', error);
        throw error.response?.data || 'An error occurred while deleting operations.';
    }
};

export const getPagedOperationRecords = async (
    page: number,
    pageSize: number,
    searchQuery: string = ''
) => {
    try {
        const response = await axiosInstance.get(
            `${OPERATIONS_API_URL}${OPERATIONS_ENDPOINTS.RECORDS}`,
            {
                params: {
                    page,
                    pageSize,
                    query: searchQuery,
                },
                validateStatus: (status) => status >= 200 && status < 300,
            }
        );

        if (!response.data.data || response.data.data.records.length === 0) {
            return { records: [], total: 0 };
        }

        return response.data.data;
    } catch (error: any) {
        console.error('Error getting operation:', error);
        throw error.response?.data || 'An error occurred while getting operations.';
    }
};
