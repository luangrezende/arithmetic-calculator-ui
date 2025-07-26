import { useState } from 'react';

import { Box, CircularProgress } from '@mui/material';

import { parseAmount } from 'src/utils/format-number';

import { addCredit } from 'src/services/api/balance-service';
import { getUserProfile } from 'src/services/api/auth-service';

import { ModernInput } from 'src/components/modern-input';
import { ModernButton } from 'src/components/modern-button';

import type { AddCreditFormProps } from '../types/add-credit.types';

export function AddCreditForm({ onClose, onOpenSnackBar }: AddCreditFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({ amount: '' });

    const onFieldChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        // Validação simples
        if (!form.amount || parseFloat(form.amount) <= 0) {
            onOpenSnackBar?.('error');
            return;
        }

        const amount = parseAmount(form.amount);

        setIsLoading(true);

        try {
            const userProfile = await getUserProfile();
            const accountId = userProfile.data?.accounts?.[0]?.id;
            
            if (!accountId) {
                throw new Error('No account found');
            }

            const response = await addCredit(amount!, accountId);
            if (response.statusCode === 200) {
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
            <ModernInput
                name="amount"
                label="Amount"
                value={form.amount}
                type="number"
                required
                onChange={(e) => onFieldChange('amount', e.target.value)}
            />

            <Box display="flex" justifyContent="flex-end" gap={2} sx={{ mt: 2 }}>
                <ModernButton onClick={onClose} variant="outline" disabled={isLoading}>
                    Cancel
                </ModernButton>
                <ModernButton
                    onClick={handleSubmit}
                    variant="primary"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <CircularProgress size={16} color="inherit" sx={{ mr: 1 }} />
                            Adding...
                        </>
                    ) : (
                        'Add'
                    )}
                </ModernButton>
            </Box>
        </Box>
    );
}
