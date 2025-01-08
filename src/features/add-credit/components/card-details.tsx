import { Box, TextField } from '@mui/material';

import { useLocalUser } from 'src/hooks/use-local-user';

export function CardDetails() {
    const user = useLocalUser();

    return (
        <Box>
            <TextField fullWidth type="text" label={user?.name} value="" disabled sx={{ mb: 2 }} />
            <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
                <TextField
                    fullWidth
                    type="text"
                    label="Card Number"
                    value="4321 4321 4321 4321"
                    disabled
                />
            </Box>
            <Box display="flex" gap={2} sx={{ mb: 2 }}>
                <TextField fullWidth type="text" label="Expiry Date" value="12/28" disabled />
                <TextField fullWidth type="text" label="CVV" value="123" disabled />
            </Box>
        </Box>
    );
}
