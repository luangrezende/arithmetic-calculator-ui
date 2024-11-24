import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import axios from 'axios';

// ----------------------------------------------------------------------

export function SignInView() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSignIn = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                'https://hw830ty0zi.execute-api.us-east-1.amazonaws.com/develop/login',
                {
                    httpMethod: 'POST',
                    path: '/login',
                    body: JSON.stringify({
                        username: email,
                        password,
                    }),
                }
            );

            if (response.data.status === 200) {
                const token = response.data.data.Token;
                localStorage.setItem('token', token);

                router.push('/');
            } else {
                setError(response.data.data.error || 'An unexpected error occurred.');
            }
        } catch (err) {
            setError('Failed to connect to the server. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [email, password, router]);

    const renderForm = (
        <Box display="flex" flexDirection="column" alignItems="flex-end">
            <TextField
                fullWidth
                name="email"
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 3 }}
            />

            <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
                Forgot password?
            </Link>

            <TextField
                fullWidth
                name="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputLabelProps={{ shrink: true }}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                <Iconify
                                    icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
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
                onClick={handleSignIn}
                loading={loading}
            >
                Sign in
            </LoadingButton>
        </Box>
    );

    return (
        <>
            <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
                <Typography variant="h5">Sign in</Typography>
                <Typography variant="body2" color="text.secondary">
                    Don’t have an account?
                    <Link variant="subtitle2" sx={{ ml: 0.5 }}>
                        Get started
                    </Link>
                </Typography>
            </Box>

            {renderForm}
        </>
    );
}
