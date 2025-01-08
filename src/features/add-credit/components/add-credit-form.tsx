import { useRef, useState } from 'react';

import { Box, Button, CircularProgress } from '@mui/material';

import { parseAmount } from 'src/utils/format-number';
import { saveProfile, getProfileBankAccount } from 'src/utils/profile-manager';

import { useBalance } from 'src/context/balance-context';
import { addCredit } from 'src/services/api/balance-service';
import { getUserProfile } from 'src/services/api/auth-service';

import { InputField } from 'src/components/input-field.tsx/input-field';

import { CardDetails } from './card-details';

import type { AddCreditFormProps } from '../types/add-credit.types';

export function AddCreditForm({ onClose, onOpenSnackBar }: AddCreditFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const bankAccount = getProfileBankAccount();
    const [form, setForm] = useState({ amount: '' });

    const onFieldChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const amountRef = useRef<{ validateFields: () => boolean }>(null);

    const handleSubmit = async () => {
        const isAmountValid = amountRef.current?.validateFields();

        if (!isAmountValid) {
            return;
        }

        const amount = parseAmount(form.amount);

        setIsLoading(true);

        try {
            const response = await addCredit(amount!, bankAccount!.id);
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
            <InputField
                loading={isLoading}
                ref={amountRef}
                name="amount"
                label="Amount"
                value={form.amount}
                type="amount"
                isRequired
                onChange={(value) => onFieldChange('amount', value)}
            />

            <Box display="flex" justifyContent="flex-end" gap={2} sx={{ mt: 2 }}>
                <Button onClick={onClose} variant="outlined" disabled={isLoading}>
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    disabled={isLoading}
                    startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : null}
                >
                    {isLoading ? 'Adding...' : 'Add'}
                </Button>
            </Box>
        </Box>
    );
}
