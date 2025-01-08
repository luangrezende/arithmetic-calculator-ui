import { Box, Link } from '@mui/material';

export interface ForgotPasswordLinkProps {
    onClick: () => void;
}

export function ForgotPasswordLink({ onClick }: ForgotPasswordLinkProps) {
    return (
        <Box display="flex" justifyContent="flex-end" width="100%" sx={{ mb: 1.5 }}>
            <Link variant="body2" color="inherit" onClick={onClick}>
                Forgot password?
            </Link>
        </Box>
    );
}
