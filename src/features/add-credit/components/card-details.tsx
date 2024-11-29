import { Box, TextField } from '@mui/material';

export function CardDetails() {
    return (
        <Box>
            <TextField
                fullWidth
                type="text"
                label="Cardholder Name"
                value="Test Env"
                disabled
                sx={{ mb: 2 }}
            />
            <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
                <img
                    src="/assets/icons/navbar/ic-lock.svg"
                    alt="Visa"
                    style={{ width: 40, height: 50 }}
                />
                <TextField
                    fullWidth
                    type="text"
                    label="Card Number"
                    value="5685 5524 5875 6254"
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
