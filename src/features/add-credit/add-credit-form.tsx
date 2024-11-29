import { useState } from 'react';

import { Box, Button, TextField } from '@mui/material';

import { saveProfile, getProfileBankAccount } from 'src/utils/profile-manager';

import { addBalance } from 'src/services/api/balance-service';
import { getUserProfile } from 'src/services/api/auth-service';

import { AlertSnackbar } from 'src/components/alert-snackbar';

import type { AddCreditFormProps } from './add-credit.types';

export function AddCreditForm({ onClose, onAddCredit }: AddCreditFormProps) {
    const [addAmount, setAddAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error',
    });

    const bankAccount = getProfileBankAccount();

    const formatCurrency = (value: string) => {
        const numericValue = value.replace(/[^\d]/g, '');
        const number = parseFloat(numericValue) / 100;
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(number || 0);
    };

    const handleAddAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setAddAmount(formatCurrency(input));
    };

    const handleAddCredit = async () => {
        const amount = parseFloat(addAmount.replace(/[^0-9.-]+/g, ''));

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

                setSnackbar({
                    open: true,
                    message: 'Credit added successfully!',
                    severity: 'success',
                });
            } else {
                setSnackbar({
                    open: true,
                    message: 'Failed to add balance. Please try again.',
                    severity: 'error',
                });
            }
        } catch (error) {
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

            <AlertSnackbar
                open={snackbar.open}
                message={snackbar.message}
                onClose={handleSnackbarClose}
                severity={snackbar.severity}
            />
        </>
    );
}
