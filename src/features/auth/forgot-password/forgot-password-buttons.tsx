import { Box } from '@mui/material';

import { LoadingButton } from 'src/components/button/loading-button';

interface FormButtonsProps {
    onSubmit: () => void;
    onCancel: () => void;
    loading: boolean;
    submitLabel?: string;
    cancelLabel?: string;
}

export function FormButtons({
    onSubmit,
    onCancel,
    loading,
    submitLabel = 'Submit',
    cancelLabel = 'Cancel',
}: FormButtonsProps) {
    return (
        <Box display="flex" justifyContent="space-between" mt={2} width="100%">
            <LoadingButton
                size="large"
                color="inherit"
                variant="outlined"
                onClick={onCancel}
                loading={loading}
                disabled={loading}
            >
                {cancelLabel}
            </LoadingButton>
            <LoadingButton
                size="large"
                color="inherit"
                variant="contained"
                onClick={onSubmit}
                loading={loading}
                disabled={loading}
            >
                {submitLabel}
            </LoadingButton>
        </Box>
    );
}
