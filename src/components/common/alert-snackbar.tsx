import { Alert, Snackbar } from '@mui/material';

interface AlertSnackbarProps {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
    onClose: () => void;
}

export function AlertSnackbar({ open, message, severity, onClose }: AlertSnackbarProps) {
    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
            <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}
