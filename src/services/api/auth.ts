import axios from 'axios';

const API_URL = 'https://hw830ty0zi.execute-api.us-east-1.amazonaws.com/develop/user';

export const registerUser = async (username: string, password: string, name: string) => 
    axios.post(
        `${API_URL}/register`,
        { username, password, name },
        { validateStatus: (status) => status >= 200 && status < 300 }
    );

export const loginUser = async (username: string, password: string) =>
    axios.post(
        `${API_URL}/login`,
        { username, password },
        { validateStatus: (status) => status >= 200 && status < 300 }
    );

export const getUserProfile = async (token: string) =>
    axios.get(
        `${API_URL}/profile`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            validateStatus: (status) => status >= 200 && status < 300,
        }
    );
    
