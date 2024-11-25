import { Box, Link, Typography } from '@mui/material';

export interface SignInTitleProps {
    onSignUp: () => void;
}

export function SignInTitle({ onSignUp }: SignInTitleProps) {
    return (
        <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
            <Typography variant="h5">Sign in</Typography>
            <Typography variant="body2" color="text.secondary">
                Don’t have an account?{' '}
                <Link component="button" variant="subtitle2" sx={{ ml: 0.5 }} onClick={onSignUp}>
                    Get started
                </Link>
            </Typography>
        </Box>
    );
}
