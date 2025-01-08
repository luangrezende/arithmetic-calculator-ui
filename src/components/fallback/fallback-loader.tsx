import { Box, LinearProgress, linearProgressClasses } from '@mui/material';

import { varAlpha } from 'src/theme/styles';

export function FallbackLoader() {
    return (
        <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
            <LinearProgress
                sx={{
                    width: 1,
                    maxWidth: 320,
                    bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
                    [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
                }}
            />
        </Box>
    );
}
