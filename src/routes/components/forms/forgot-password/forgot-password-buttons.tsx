import { Box } from '@mui/material';

import { LoadingButton } from 'src/components/common/loading-button';

export interface ForgotPasswordButtonsProps {
    onCancel: () => void;
    onSubmit: () => void;
    loading: boolean;
}

export function ForgotPasswordButtons({ onCancel, onSubmit, loading }: ForgotPasswordButtonsProps) {
    return (
        <Box display="flex" justifyContent="space-between" width="100%">
            <LoadingButton
                size="large"
                color="inherit"
                variant="outlined"
                onClick={onCancel}
                loading={false}
                disabled={loading}
            >
                Cancel
            </LoadingButton>

            <LoadingButton
                size="large"
                color="inherit"
                variant="contained"
                onClick={onSubmit}
                loading={loading}
                disabled={loading}
            >
                Submit
            </LoadingButton>
        </Box>
    );
}
