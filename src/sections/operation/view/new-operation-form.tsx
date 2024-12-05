import { useState } from 'react';

import { Box, Alert, Button, MenuItem, TextField, CircularProgress } from '@mui/material';

import { saveProfile, getProfileBankAccount } from 'src/utils/profile-manager';

import { useBalance } from 'src/context/balance-context';
import { getUserProfile } from 'src/services/api/auth-service';
import { addOperationRecord } from 'src/services/api/operation-service';

interface NewOperationFormProps {
    onClose: () => void;
    onAddOperation: () => void;
}

const operationOptions = [
    { id: 'arithmetic', description: 'Arithmetic Operation' },
    { id: 'random', description: 'Random String' },
];

export function NewOperationForm({ onClose, onAddOperation }: NewOperationFormProps) {
    const [operationType, setOperationType] = useState<{
        id: string;
        description: string;
    } | null>(null);
    const [expression, setExpression] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [fieldError, setFieldError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { fetchBalance } = useBalance();
    const bankAccount = getProfileBankAccount();

    const validateFields = () => {
        if (!operationType) {
            setErrorMessage('Please select an operation');
            return false;
        }

        if (operationType.description === 'Arithmetic Operation' && !expression.trim()) {
            setFieldError('Expression is required');
            return false;
        }

        setFieldError(null);
        return true;
    };

    const handleSubmit = async () => {
        if (!validateFields()) return;

        setIsLoading(true);

        try {
            await addOperationRecord(bankAccount!.id, expression);

            const profileResponse = await getUserProfile();
            saveProfile(profileResponse.data);
            fetchBalance();
            onClose();
            onAddOperation();
        } catch (error) {
            setErrorMessage(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOperationChange = (operationId: string) => {
        const selectedOp = operationOptions.find((op) => op.id === operationId);
        setOperationType(selectedOp || null);

        if (selectedOp?.description === 'Random String') {
            setExpression('random_string');
        } else {
            setExpression('');
        }

        setFieldError(null);
        setErrorMessage(null);
    };

    return (
        <Box component="form" display="flex" flexDirection="column" gap={2}>
            <TextField
                select
                label="Operation"
                value={operationType?.id || ''}
                onChange={(e) => handleOperationChange(e.target.value)}
                required
                fullWidth
            >
                {operationOptions.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.description}
                    </MenuItem>
                ))}
            </TextField>

            {operationType?.description === 'Arithmetic Operation' && (
                <TextField
                    label="Expression"
                    value={expression}
                    onChange={(e) => setExpression(e.target.value)}
                    error={!!fieldError}
                    helperText={fieldError}
                    required
                    fullWidth
                />
            )}

            {operationType?.description === 'Random String' && (
                <Alert severity="info">A new random string will be generated automatically.</Alert>
            )}

            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            <Box display="flex" justifyContent="flex-end" gap={2}>
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
                    {isLoading ? 'Processing...' : 'Submit'}
                </Button>
            </Box>
        </Box>
    );
}
