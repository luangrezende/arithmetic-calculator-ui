import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { CONFIG } from 'src/config-global';
import { varAlpha } from 'src/theme/styles';
import { ModernButton } from 'src/components/modern-button';
import { ModernCard } from 'src/components/modern-card';

export default function NotFoundPage() {
    const navigate = useNavigate();
    const theme = useTheme();

    const handleGoHome = () => {
        navigate('/');
    };

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <>
            <Helmet>
                <title>404 - Page Not Found | {CONFIG.appName}</title>
            </Helmet>

            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${varAlpha('37 99 235', 0.05)} 100%)`,
                    p: 3,
                }}
            >
                <ModernCard
                    glassy
                    sx={{
                        maxWidth: 500,
                        textAlign: 'center',
                        p: { xs: 4, md: 6 },
                    }}
                >
                    <Box
                        sx={{
                            mb: 4,
                            fontSize: { xs: 80, md: 120 },
                            fontWeight: 'bold',
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            lineHeight: 1,
                        }}
                    >
                        404
                    </Box>

                    <Typography
                        variant="h4"
                        sx={{
                            mb: 2,
                            fontWeight: 600,
                            color: 'text.primary',
                        }}
                    >
                        Page Not Found
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            mb: 4,
                            color: 'text.secondary',
                            lineHeight: 1.6,
                        }}
                    >
                        The page you&apos;re looking for doesn&apos;t exist or has been moved. 
                        Don&apos;t worry, let&apos;s get you back on track.
                    </Typography>

                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                        justifyContent="center"
                    >
                        <ModernButton
                            variant="contained"
                            gradient
                            onClick={handleGoHome}
                            sx={{
                                minWidth: 140,
                            }}
                        >
                            Go to Home
                        </ModernButton>

                        <ModernButton
                            variant="outlined"
                            onClick={handleGoBack}
                            sx={{
                                minWidth: 140,
                            }}
                        >
                            Go Back
                        </ModernButton>
                    </Stack>
                </ModernCard>
            </Box>
        </>
    );
}
