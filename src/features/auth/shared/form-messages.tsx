import { AlertSnackbar } from 'src/components/alert-snackbar';

interface FormMessagesProps {
    error?: string;
    success?: string;
    snackbarOpen: boolean;
    onCloseSnackbar: () => void;
}

export function FormMessages({ error, success, snackbarOpen, onCloseSnackbar }: FormMessagesProps) {
    return (
        <>
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            <AlertSnackbar
                open={snackbarOpen}
                message={success || ''}
                onClose={onCloseSnackbar}
                severity="success"
            />
        </>
    );
}
