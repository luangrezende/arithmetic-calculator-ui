import { OPERATIONS_API_URL, OPERATIONS_ENDPOINTS } from 'src/config/api-config';

import axiosInstance from '../axios/axios-interceptor';

export const addOperationRecord = async (accountId: string, expression: string): Promise<any> => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found. Please log in again.');

        const payload: any = {
            accountId,
            expression,
        };

        const response = await axiosInstance.post(
            `${OPERATIONS_API_URL}${OPERATIONS_ENDPOINTS.RECORDS}`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                validateStatus: (status) => status >= 200 && status < 300,
            }
        );

        return response.data;
    } catch (error: any) {
        console.error('Error adding operation:', error);
        throw error.response.data.data.error || 'An error occurred while adding operation.';
    }
};

export const getDashboardData = async (): Promise<any> => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found. Please log in again.');

        const response = await axiosInstance.get(
            `${OPERATIONS_API_URL}${OPERATIONS_ENDPOINTS.DASHBOARD}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                validateStatus: (status) => status >= 200 && status < 300,
            }
        );

        return response.data;
    } catch (error: any) {
        console.error('Error getting operation:', error);
        throw error.response?.data || 'An error occurred while getting operation.';
    }
};

export const getOperationTypes = async (): Promise<any> => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found. Please log in again.');

        const response = await axiosInstance.get(
            `${OPERATIONS_API_URL}${OPERATIONS_ENDPOINTS.TYPES}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
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
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found. Please log in again.');

        await axiosInstance.delete(`${OPERATIONS_API_URL}${OPERATIONS_ENDPOINTS.RECORDS}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
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
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found. Please log in again.');

        const response = await axiosInstance.get(
            `${OPERATIONS_API_URL}${OPERATIONS_ENDPOINTS.RECORDS}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
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
