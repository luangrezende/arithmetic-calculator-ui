import axios from 'axios';
import { useState, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useAuth } from 'src/context/auth-context';
import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';

export function SignInView() {
    const { login, token } = useAuth();
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: boolean }>({});

    // Navegar para o dashboard se o usuário já estiver autenticado
    useEffect(() => {
        if (token) {
            router.push('/');
        }
    }, [token, router]);

    const validateFields = useCallback((fields: { [key: string]: string }) => {
        const errors: { [key: string]: boolean } = {};

        Object.keys(fields).forEach((field) => {
            errors[field] = !fields[field].trim();
        });

        setFieldErrors(errors);
        return !Object.values(errors).some(Boolean);
    }, []);

    const handleSignIn = useCallback(async () => {
        if (!validateFields({ email, password })) return;

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                'https://hw830ty0zi.execute-api.us-east-1.amazonaws.com/develop/login',
                { username: email, password },
                { validateStatus: (status) => status >= 200 && status < 300 } // Trata apenas status 2xx como sucesso
            );

            if (response.status === 200 && response.data?.token) {
                login(response.data.token); // Armazena o token no contexto
                router.push('/'); // Redireciona o usuário após login bem-sucedido
            } else {
                setError(response.data?.error || 'Invalid credentials. Please try again.');
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error('Axios Error:', err.response);
                setError(err.response?.data?.error || 'Invalid credentials or server error.');
            } else {
                console.error('Unexpected Error:', err);
                setError('Failed to connect to the server. Please try again.');
            }
        } finally {
            setLoading(false); // Garante que o botão de carregamento seja liberado
        }
    }, [email, password, login, router, validateFields]);

    return (
        <Box>
            <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
                <Typography variant="h5">Sign in</Typography>
                <Typography variant="body2" color="text.secondary">
                    Don’t have an account?
                    <Link variant="subtitle2" sx={{ ml: 0.5 }} href="/sign-up">
                        Get started
                    </Link>
                </Typography>
            </Box>

            <Box display="flex" flexDirection="column" alignItems="flex-end">
                <TextField
                    fullWidth
                    name="email"
                    label="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={fieldErrors.email}
                    helperText={fieldErrors.email ? 'Email is required.' : ''}
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
                    onClick={handleSignIn}
                    loading={loading}
                >
                    Sign in
                </LoadingButton>
            </Box>
        </Box>
    );
}
