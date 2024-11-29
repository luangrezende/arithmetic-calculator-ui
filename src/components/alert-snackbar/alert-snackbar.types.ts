export interface AlertSnackbarProps {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
    onClose: () => void;
}
