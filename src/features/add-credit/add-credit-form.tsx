import { useState } from 'react';

import { Box, Button, TextField } from '@mui/material';

import { formatCurrency } from 'src/utils/format-number';
import { saveProfile, getProfileBankAccount } from 'src/utils/profile-manager';

import { addBalance } from 'src/services/api/balance-service';
import { getUserProfile } from 'src/services/api/auth-service';

import { InputFieldForm } from '../auth/shared';

import type { AddCreditFormProps } from './add-credit.types';

export function AddCreditForm({ onClose, onOpenSnackBar }: AddCreditFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const bankAccount = getProfileBankAccount();
    const [form, setForm] = useState({ amount: '' });
    const [fieldErrors, setFieldErrors] = useState({ amount: false });

    const handleFieldChange = (field: string, value: string) => {
        if (field === 'amount') {
            const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, '')) || 0;
            const formattedValue = formatCurrency(numericValue.toString());

            setForm((prev) => ({ ...prev, [field]: formattedValue }));
            setFieldErrors((prev) => ({
                ...prev,
                amount: numericValue <= 1 || numericValue > 500,
            }));
        } else {
            setForm((prev) => ({ ...prev, [field]: value }));
        }
    };

    const handleAddCredit = async () => {
        const amount = parseFloat(form.amount.replace(/[^0-9.-]+/g, ''));

        if (Number.isNaN(amount) || amount <= 1 || amount > 500) {
            setFieldErrors({ amount: true });
            return;
        }
        console.log(amount);

        setIsLoading(true);

        try {
            const response = await addBalance(amount, bankAccount!.id);
            if (response.statusCode === 200) {
                const profileResponse = await getUserProfile();
                saveProfile(profileResponse.data);
                onClose();
                onOpenSnackBar('success');
            } else {
                onOpenSnackBar('error');
            }
        } catch (error) {
            onOpenSnackBar('error');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box>
            <TextField
                fullWidth
                type="text"
                label="Cardholder Name"
                value="Test Env"
                disabled
                sx={{ mb: 2 }}
            />
            <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
                <img
                    src="/assets/icons/navbar/ic-lock.svg"
                    alt="Visa"
                    style={{ width: 40, height: 50 }}
                />
                <TextField
                    fullWidth
                    type="text"
                    label="Card Number"
                    value="5685 5524 5875 6254"
                    disabled
                />
            </Box>
            <Box display="flex" gap={2} sx={{ mb: 2 }}>
                <TextField fullWidth type="text" label="Expiry Date" value="12/28" disabled />
                <TextField fullWidth type="text" label="CVV" value="123" disabled />
            </Box>

            <InputFieldForm
                name="amount"
                label="Amount"
                value={form.amount}
                type="amount"
                onChange={(value) => handleFieldChange('amount', value)}
                error={fieldErrors.amount}
                helperText={fieldErrors.amount ? 'Amount must be between $1 and $500.' : ''}
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
        </Box>
    );
}
