export interface AddCreditModalProps {
    open: boolean;
    onClose: () => void;
    onOpenSnackBar: (type: "success" | "error") => void;
}

export interface AddCreditFormProps {
    onClose: () => void;
    onOpenSnackBar: (type: "success" | "error") => void;
}
