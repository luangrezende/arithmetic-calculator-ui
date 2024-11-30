import { Box, Button, CircularProgress } from '@mui/material';

import type { FormButtonsProps } from './forgot-password.types';

export function FormButtons({ onSubmit, onCancel, loading }: FormButtonsProps) {
    return (
        <Box display="flex" justifyContent="space-between" mt={2} width="100%">
            <Button
                size="large"
                color="inherit"
                variant="outlined"
                onClick={onCancel}
                disabled={loading}
            >
                Cancel
            </Button>
            <Button
                onClick={onSubmit}
                variant="contained"
                color="inherit"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}
            >
                {loading ? 'Sending...' : 'Send'}
            </Button>
        </Box>
    );
}
