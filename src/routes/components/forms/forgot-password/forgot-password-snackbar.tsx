import { AlertSnackbar } from 'src/components/common/alert-snackbar';

export interface ForgotPasswordSnackbarProps {
    open: boolean;
    onClose: () => void;
}

export function ForgotPasswordSnackbar({ open, onClose }: ForgotPasswordSnackbarProps) {
    return (
        <AlertSnackbar
            open={open}
            message="Request submitted successfully!"
            onClose={onClose}
            severity="success"
        />
    );
}
