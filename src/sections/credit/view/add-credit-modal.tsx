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
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [addAmount, setAddAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [apiError, setApiError] = useState<string | null>(null);
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

    const handleAddCredit = async () => {
        const amount = parseFloat(addAmount);

        // eslint-disable-next-line no-restricted-globals
        if (isNaN(amount) || amount <= 0 || amount > 300) {
            setValidationError(
                amount > 300
                    ? 'The maximum amount you can add is $300.'
                    : 'Please enter a valid amount greater than $0.'
            );
            setApiError(null);
            return;
        }

        if (!bankAccount?.id) {
            setValidationError('No account selected. Please select an account first.');
            setApiError(null);
            return;
        }

        setIsLoading(true);

        try {
            const response = await addBalance(amount, bankAccount?.id);

            if (response.statusCode === 200) {
                const profileResponse = await getUserProfile();
                saveProfile(profileResponse.data);

                setAddAmount('');
                setValidationError(null);
                setApiError(null);
                onAddCredit(amount);
                onClose();

                // Mostrar Snackbar de sucesso
                setSnackbar({
                    open: true,
                    message: 'Credit added successfully!',
                    severity: 'success',
                });
            } else {
                setApiError('Failed to add balance. Please try again.');
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
            setSnackbarOpen(true);
            setIsLoading(false);
        }
    };

    return (
        <>
            <Modal open={open} onClose={onClose} closeAfterTransition>
                <Fade in={open}>
                    <Box sx={modalStyle}>
                        <Typography variant="h6" mb={2}>
                            Add credit
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
                            type="number"
                            label="Amount"
                            value={addAmount}
                            onChange={(e) => setAddAmount(e.target.value)}
                            sx={{ mt: 2 }}
                            error={!!validationError}
                            helperText={validationError}
                        />

                        {apiError && (
                            <Typography
                                variant="body2"
                                color="error"
                                sx={{ mt: 1, textAlign: 'left' }}
                            >
                                {apiError}
                            </Typography>
                        )}

                        <Box display="flex" justifyContent="flex-end" gap={2} sx={{ mt: 2 }}>
                            <Button onClick={onClose} variant="outlined" disabled={isLoading}>
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
                open={snackbarOpen}
                message={snackbar.message}
                onClose={() => setSnackbarOpen(false)}
                severity={snackbar.severity}
            />
        </>
    );
}
