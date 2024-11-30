import type { Theme, SxProps } from '@mui/material';

import { Icon } from '@iconify/react';

import { Box } from '@mui/material';

interface IconifyProps {
    icon: string;
    width?: number | string;
    sx?: SxProps<Theme>;
}

export function Iconify({ icon, width = 24, sx }: IconifyProps) {
    return (
        <Box
            component={Icon}
            icon={icon}
            sx={{
                width,
                height: width,
                ...sx,
            }}
        />
    );
}
