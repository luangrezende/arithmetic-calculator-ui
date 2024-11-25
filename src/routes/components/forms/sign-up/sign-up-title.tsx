import { Box, Typography, Link } from '@mui/material';

interface SignUpTitleProps {
    onBackToSignIn: () => void;
}

export function SignUpTitle({ onBackToSignIn }: SignUpTitleProps) {
    return (
        <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
            <Typography variant="h5">Sign up</Typography>
            <Typography variant="body2" color="text.secondary">
                Create an account to get started or{' '}
                <Link
                    component="button"
                    variant="subtitle2"
                    sx={{ ml: 0.5 }}
                    onClick={onBackToSignIn}
                >
                    back to login
                </Link>
            </Typography>
        </Box>
    );
}
