import { Box } from '@mui/material';

interface AuthFormLayoutProps {
    children: React.ReactNode;
}

export function AuthFormLayout({ children }: AuthFormLayoutProps) {
    return (
        <Box
            component="form"
            display="flex"
            flexDirection="column"
            alignItems="center"
            maxWidth={400}
            width="100%"
        >
            {children}
        </Box>
    );
}
