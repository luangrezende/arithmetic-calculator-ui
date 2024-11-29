import { Box, useTheme } from '@mui/material';

export interface ErrorMessageProps {
    message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                mb: 2,
                p: 1,
                color: theme.palette.common.white,
                backgroundColor: theme.palette.error.light,
                borderRadius: 1,
                fontSize: '0.875rem',
                textAlign: 'center',
            }}
        >
            {message}
        </Box>
    );
}
