import axios from 'axios';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';
import { Iconify } from 'src/components/iconify';
import { SignUpView, SignUpFormProps } from './sign-up-view';

export function SignInView() {
    const router = useRouter();

    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [fieldErrors, setFieldErrors] = useState({
        name: false,
        email: false,
        password: false,
    });

    const handleFieldChange = (fieldName: keyof typeof fieldErrors, value: string) => {
        if (fieldName === 'name') setName(value);
        if (fieldName === 'email') setEmail(value);
        if (fieldName === 'password') setPassword(value);

        setFieldErrors((prev) => ({
            ...prev,
            [fieldName]: false,
        }));
    };

    const validateFields = useCallback(() => {
        const errors = {
            name: isSignUp && !name.trim(),
            email: !email.trim(),
            password: !password.trim(),
        };
        setFieldErrors(errors);
        return !Object.values(errors).some((fieldError) => fieldError);
    }, [isSignUp, name, email, password]);

    const handleSignIn = useCallback(async () => {
        if (!validateFields()) return;

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                'https://hw830ty0zi.execute-api.us-east-1.amazonaws.com/develop/login',
                {
                    username: email,
                    password,
                }
            );

            if (response.data.status === 200) {
                const token = response.data.data.Token;
                localStorage.setItem('token', token);

                router.push('/');
            } else {
                setError(response.data.data.error || 'An unexpected error occurred.');
            }
        } catch {
            setError('Failed to connect to the server. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [email, password, router, validateFields]);

    const handleSignUp = useCallback(async () => {
        if (!validateFields()) return;

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                'https://hw830ty0zi.execute-api.us-east-1.amazonaws.com/develop/register',
                {
                    name,
                    username: email, // API espera "username"
                    password,
                }
            );

            if (response.status === 201) {
                alert('Account created successfully! Please sign in.');
                setIsSignUp(false);
                setName('');
                setEmail('');
                setPassword('');
                setFieldErrors({ name: false, email: false, password: false });
            } else {
                setError(response.data.data.error || 'An unexpected error occurred.');
            }
        } catch {
            setError('Failed to connect to the server. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [name, email, password, validateFields]);

    const switchMode = () => {
        setIsSignUp((prev) => !prev);
        setName('');
        setEmail('');
        setPassword('');
        setFieldErrors({ name: false, email: false, password: false });
        setError(null);
    };

    const renderSignInForm = (
        <Box display="flex" flexDirection="column" alignItems="flex-end">
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

            <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
                Forgot password?
            </Link>

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
        <Box>
            <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
                <Typography variant="h5">{isSignUp ? 'Sign up' : 'Sign in'}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {isSignUp ? (
                        <>
                            Already have an account?
                            <Link variant="subtitle2" sx={{ ml: 0.5 }} onClick={switchMode}>
                                Sign in
                            </Link>
                        </>
                    ) : (
                        <>
                            Don’t have an account?
                            <Link variant="subtitle2" sx={{ ml: 0.5 }} onClick={switchMode}>
                                Get started
                            </Link>
                        </>
                    )}
                </Typography>
            </Box>

            {isSignUp ? (
                <SignUpView
                    name={name}
                    email={email}
                    password={password}
                    showPassword={showPassword}
                    loading={loading}
                    fieldErrors={fieldErrors}
                    error={error}
                    onFieldChange={handleFieldChange}
                    onTogglePasswordVisibility={() => setShowPassword((prev) => !prev)}
                    onSubmit={handleSignUp}
                />
            ) : (
                renderSignInForm
            )}
        </Box>
    );
}
