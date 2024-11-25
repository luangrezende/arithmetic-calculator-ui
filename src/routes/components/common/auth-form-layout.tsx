import type { Theme, SxProps } from '@mui/material';

import { Box } from '@mui/material';

export interface AuthFormLayoutProps {
    children: React.ReactNode;
    sx?: SxProps<Theme>;
}

export function AuthFormLayout({ children, sx }: AuthFormLayoutProps) {
    return (
        <Box
            component="form"
            display="flex"
            flexDirection="column"
            alignItems="center"
            maxWidth={400}
            width="100%"
            sx={sx}
        >
            {children}
        </Box>
    );
}
