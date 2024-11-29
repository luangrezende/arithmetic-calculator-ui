import { useState } from 'react';

import { Box, Button } from '@mui/material';

import { parseAmount } from 'src/utils/format-number';
import { saveProfile, getProfileBankAccount } from 'src/utils/profile-manager';

import { addBalance } from 'src/services/api/balance-service';
import { getUserProfile } from 'src/services/api/auth-service';

import { CardDetails } from './card-details';
import { AmountInput } from './amount-input';

import type { AddCreditFormProps } from '../types/add-credit.types';

export function AddCreditForm({ onClose, onOpenSnackBar }: AddCreditFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const bankAccount = getProfileBankAccount();
    const [form, setForm] = useState({ amount: '' });
    const [fieldErrors, setFieldErrors] = useState({ amount: false });

    const handleFieldChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (field === 'amount') {
            const numericValue = parseAmount(value) || 0;
            setFieldErrors((prev) => ({
                ...prev,
                amount: numericValue <= 1 || numericValue > 500,
            }));
        }
    };

    const handleAddCredit = async () => {
        const amount = parseFloat(form.amount.replace(/[^0-9.-]+/g, ''));

        if (Number.isNaN(amount) || amount <= 1 || amount > 500) {
            return;
        }

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
            <CardDetails />
            <AmountInput
                value={form.amount}
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
