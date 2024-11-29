export interface AddCreditModalProps {
    open: boolean;
    onClose: () => void;
    onAddCredit: (amount: number) => void;
}

export interface AddCreditFormProps {
    onClose: () => void;
    onAddCredit: (amount: number) => void;
}
