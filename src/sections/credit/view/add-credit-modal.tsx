import { useState } from 'react';

import { Box, Fade, Modal, Button, TextField, Typography } from '@mui/material';

import { saveProfile, getProfileBankAccount } from 'src/utils/profile-manager';

import { addBalance } from 'src/services/api/balance-service';
import { getUserProfile } from 'src/services/api/auth-service';

import { AlertSnackbar } from 'src/components/common/alert-snackbar';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    outline: 'none',
};

export function AddCreditModal({ open, onClose, onAddCredit }: any) {
    const [addAmount, setAddAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'error';
    }>({
        open: false,
        message: '',
        severity: 'success',
    });

    const bankAccount = getProfileBankAccount();

    const formatCurrency = (value: string) => {
        const numericValue = value.replace(/[^\d]/g, ''); // Remove caracteres não numéricos
        const number = parseFloat(numericValue) / 100; // Converte para centavos
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(number || 0);
    };

    const handleAddAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setAddAmount(formatCurrency(input));
    };

    const handleCloseModal = () => {
        setAddAmount('');
        onClose();
    };

    const handleAddCredit = async () => {
        const amount = parseFloat(addAmount.replace(/[^0-9.-]+/g, '')); // Remove formatação

        // Validação do valor inserido
        if (Number.isNaN(amount) || amount <= 0 || amount > 300) {
            setValidationError(
                amount > 300
                    ? 'The maximum amount you can add is $300.'
                    : 'Please enter a valid amount greater than $0.'
            );
            return;
        }

        if (!bankAccount?.id) {
            setValidationError('No account selected. Please select an account first.');
            return;
        }

        setIsLoading(true);
        setValidationError(null);

        try {
            const response = await addBalance(amount, bankAccount.id);

            if (response.statusCode === 200) {
                const profileResponse = await getUserProfile();
                saveProfile(profileResponse.data);

                setAddAmount('');
                onAddCredit(amount);
                onClose();

                // Snackbar de sucesso
                setSnackbar({
                    open: true,
                    message: 'Credit added successfully!',
                    severity: 'success',
                });
            } else {
                // Snackbar de erro
                setSnackbar({
                    open: true,
                    message: 'Failed to add balance. Please try again.',
                    severity: 'error',
                });
            }
        } catch (error: any) {
            console.error(error);
            setSnackbar({
                open: true,
                message: 'An error occurred. Please try again.',
                severity: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    return (
        <>
            <Modal open={open} onClose={onClose} closeAfterTransition>
                <Fade in={open}>
                    <Box sx={modalStyle}>
                        <Typography variant="h6" mb={2}>
                            Add Credit
                        </Typography>

                        <TextField
                            fullWidth
                            type="text"
                            label="Cardholder Name"
                            value="John Doe"
                            disabled
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            type="text"
                            label="Card Number"
                            value="4158 9999 5875 3245"
                            disabled
                            sx={{ mb: 2 }}
                        />
                        <Box display="flex" gap={2}>
                            <TextField
                                fullWidth
                                type="text"
                                label="Expiry Date"
                                value="12/28"
                                disabled
                            />
                            <TextField fullWidth type="text" label="CVV" value="123" disabled />
                        </Box>

                        <TextField
                            fullWidth
                            type="text"
                            label="Amount"
                            value={addAmount}
                            onChange={handleAddAmountChange}
                            sx={{ mt: 2 }}
                            error={!!validationError}
                            helperText={validationError}
                        />

                        <Box display="flex" justifyContent="flex-end" gap={2} sx={{ mt: 2 }}>
                            <Button
                                onClick={handleCloseModal}
                                variant="outlined"
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleAddCredit}
                                variant="contained"
                                color="primary"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Adding...' : 'Add'}
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>

            <AlertSnackbar
                open={snackbar.open}
                message={snackbar.message}
                onClose={handleSnackbarClose}
                severity={snackbar.severity}
            />
        </>
    );
}
