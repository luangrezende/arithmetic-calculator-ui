import axios from 'axios';
import { useState } from 'react';

import { Box, Fade, Modal, Button, TextField, Typography } from '@mui/material';

import { useAuth } from 'src/context/auth-context';
import { getUserProfile } from 'src/services/api/auth';

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
};

export function AddCreditModal({ open, onClose, onAddCredit }: any) {
    const { bankAccount, reloadUserProfile } = useAuth();

    const [addAmount, setAddAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [apiError, setApiError] = useState<string | null>(null);

    const handleAddCredit = async () => {
        const amount = parseFloat(addAmount);

        // Validações
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
            const token = localStorage.getItem('token');

            // Faz a chamada à API para adicionar crédito
            const response = await axios.post(
                'https://hw830ty0zi.execute-api.us-east-1.amazonaws.com/develop/v1/user/account/add-balance',
                {
                    accountId: bankAccount.id,
                    amount,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                // Atualiza o perfil após adicionar o saldo
                const profileResponse = await getUserProfile(token!);
                reloadUserProfile(profileResponse.data.data);

                setAddAmount('');
                setValidationError(null);
                setApiError(null);
                onAddCredit(amount);
                onClose();
            } else {
                setApiError('Failed to add balance. Please try again.');
            }
        } catch (error: any) {
            setApiError(error.response?.data?.error || 'An error occurred while adding balance.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
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
                        value="4111 1111 1111 1111"
                        disabled
                        sx={{ mb: 2 }}
                    />
                    <Box display="flex" gap={2}>
                        <TextField
                            fullWidth
                            type="text"
                            label="Expiry Date"
                            value="12/25"
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

                    {/* Exibição de erro da API */}
                    {apiError && (
                        <Typography variant="body2" color="error" sx={{ mt: 1, textAlign: 'left' }}>
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
    );
}
