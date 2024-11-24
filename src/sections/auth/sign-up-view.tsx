import axios from 'axios';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

export function SignUpView() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const [fieldErrors, setFieldErrors] = useState({
        name: false,
        email: false,
        password: false,
    });

    const navigate = useNavigate();

    const handleFieldChange = (fieldName: 'name' | 'email' | 'password', value: string) => {
        if (fieldName === 'name') setName(value);
        if (fieldName === 'email') setEmail(value);
        if (fieldName === 'password') setPassword(value);

        setFieldErrors((prev) => ({ ...prev, [fieldName]: false }));
    };

    const validateFields = useCallback(() => {
        const errors = {
            name: !name.trim(),
            email: !email.trim(),
            password: !password.trim(),
        };
        setFieldErrors(errors);
        return !Object.values(errors).some((fieldError) => fieldError);
    }, [name, email, password]);

    const handleSubmit = useCallback(async () => {
        if (!validateFields()) return;

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                'https://hw830ty0zi.execute-api.us-east-1.amazonaws.com/develop/register',
                { username: email, password, name },
                { validateStatus: (status) => status >= 200 && status < 300 }
            );

            if (response.status === 201) {
                setName('');
                setEmail('');
                setPassword('');
                setFieldErrors({ name: false, email: false, password: false });
                setSnackbarOpen(true);

                setTimeout(() => {
                    navigate('/sign-in');
                }, 3000);
            } else {
                setError(response.data?.error || 'An unexpected error occurred.');
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.error || 'Failed to register. Please try again.');
            } else {
                setError('Failed to connect to the server. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    }, [name, email, password, validateFields, navigate]);

    return (
        <Box>
            <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
                <Typography variant="h5">Sign up</Typography>
                <Typography variant="body2" color="text.secondary">
                    Create an account to get started or{' '}
                    <Link
                        component="button"
                        variant="subtitle2"
                        sx={{ ml: 0.5 }}
                        onClick={() => navigate('/sign-in')}
                    >
                        back to login
                    </Link>
                </Typography>
            </Box>

            <Box display="flex" flexDirection="column" alignItems="flex-end">
                <TextField
                    fullWidth
                    name="name"
                    label="Full Name"
                    value={name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    error={fieldErrors.name}
                    helperText={fieldErrors.name ? 'Name is required.' : ''}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3 }}
                />

                <TextField
                    fullWidth
                    name="email"
                    label="Email address"
                    value={email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    error={fieldErrors.email}
                    helperText={fieldErrors.email ? 'Email is required.' : ''}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3 }}
                />

                <TextField
                    fullWidth
                    name="password"
                    label="Password"
                    value={password}
                    onChange={(e) => handleFieldChange('password', e.target.value)}
                    error={fieldErrors.password}
                    helperText={fieldErrors.password ? 'Password is required.' : ''}
                    InputLabelProps={{ shrink: true }}
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    <Iconify
                                        icon={
                                            showPassword
                                                ? 'solar:eye-bold'
                                                : 'solar:eye-closed-bold'
                                        }
                                    />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{ mb: 3 }}
                />

                {error && (
                    <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}

                <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    color="inherit"
                    variant="contained"
                    onClick={handleSubmit}
                    loading={loading}
                    sx={{ mb: 2 }}
                >
                    Sign up
                </LoadingButton>
            </Box>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    Account successfully created. Redirecting you to the login page...
                </Alert>
            </Snackbar>
        </Box>
    );
}
