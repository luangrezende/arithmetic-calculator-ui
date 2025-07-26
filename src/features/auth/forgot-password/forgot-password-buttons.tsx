import { Box, CircularProgress } from '@mui/material';

import { ModernButton } from 'src/components/modern-button';

import type { FormButtonsProps } from './forgot-password.types';

export function FormButtons({ onSubmit, onCancel, loading }: FormButtonsProps) {
    return (
        <Box display="flex" justifyContent="space-between" mt={2} width="100%">
            <ModernButton
                size="lg"
                variant="outline"
                onClick={onCancel}
                disabled={loading}
            >
                Cancel
            </ModernButton>
            <ModernButton
                onClick={onSubmit}
                variant="primary"
                disabled={loading}
            >
                {loading ? (
                    <>
                        <CircularProgress size={16} color="inherit" sx={{ mr: 1 }} />
                        Sending...
                    </>
                ) : (
                    'Send'
                )}
            </ModernButton>
        </Box>
    );
}
