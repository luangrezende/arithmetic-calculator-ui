import { Box, Link } from '@mui/material';

export interface ForgotPasswordLinkProps {
    onClick: () => void;
}

export function ForgotPasswordLink({ onClick }: ForgotPasswordLinkProps) {
    return (
        <Box display="flex" justifyContent="flex-end" width="100%" sx={{ mb: 1.5 }}>
            <Link 
                variant="body2" 
                onClick={onClick}
                sx={{ 
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'none' },
                    cursor: 'pointer'
                }}
                className="text-slate-600 dark:text-slate-100 hover:text-slate-700 dark:hover:text-slate-200"
            >
                Forgot password?
            </Link>
        </Box>
    );
}
