import type { OperationType } from 'src/models/operation-type';

import { useState, useEffect } from 'react';

import {
    Box,
    Alert,
    Button,
    MenuItem,
    TextField,
    Typography,
    CircularProgress,
} from '@mui/material';

import { parseAmount } from 'src/utils/format-number';
import { saveProfile, getProfileBankAccount } from 'src/utils/profile-manager';

import { useBalance } from 'src/context/balance-context';
import { getUserProfile } from 'src/services/api/auth-service';
import { getOperationTypes, addOperationRecord } from 'src/services/api/operation-service';

import { Iconify } from 'src/components/iconify';

interface NewOperationFormProps {
    onClose: () => void;
    onAddOperation: () => void;
}

const operationIcons: { [key: string]: string } = {
    addition: 'mdi:plus',
    subtraction: 'mdi:minus',
    multiplication: 'mdi:close',
    division: 'mdi:division',
    square_root: 'mdi:square-root',
    random_string: 'mdi:shuffle-variant',
};

const operationLabels: { [key: string]: string } = {
    addition: 'Addition',
    subtraction: 'Subtraction',
    multiplication: 'Multiplication',
    division: 'Division',
    square_root: 'Square Root',
    random_string: 'Random String',
};

export function NewOperationForm({ onClose, onAddOperation }: NewOperationFormProps) {
    const [operationType, setOperationType] = useState<OperationType | null>(null);
    const { fetchBalance, balance } = useBalance();
    const bankAccount = getProfileBankAccount();
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [fieldError, setFieldError] = useState<{ value1?: string; value2?: string }>({});
    const [operationTypes, setOperationTypes] = useState<OperationType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingOperationTypes, setIsLoadingOperationTypes] = useState(true);

    useEffect(() => {
        const fetchOperationTypes = async () => {
            try {
                setIsLoadingOperationTypes(true);
                const response = await getOperationTypes();
                setOperationTypes(response.data);
            } catch (error) {
                console.error('Failed to fetch operation types:', error);
                setErrorMessage('Failed to load operation types.');
            } finally {
                setIsLoadingOperationTypes(false);
            }
        };

        fetchOperationTypes();
    }, []);

    const handleValueChange = (
        value: string,
        setValue: React.Dispatch<React.SetStateAction<string>>,
        min: number = 0,
        max: number = 999999
    ) => {
        const numericValue = parseFloat(value);

        if (Number.isNaN(numericValue)) {
            setValue('');
            return;
        }

        if (numericValue < min) {
            setValue(String(min));
        } else if (numericValue > max) {
            setValue(String(max));
        } else {
            setValue(value);
        }
    };

    const validateFields = () => {
        const errors: { value1?: string; value2?: string } = {};

        if (!operationType) {
            setErrorMessage('Please select an operation');
            return false;
        }

        if (!value1 && operationType.description !== 'Random String') {
            errors.value1 = 'Value 1 is required';
        }

        if (
            !value2 &&
            operationType.description !== 'Square Root' &&
            operationType.description !== 'Random String'
        ) {
            errors.value2 = 'Value 2 is required';
        }

        if (operationType.description === 'Division' && value2 === '0') {
            errors.value2 = 'Division by zero is not allowed';
        }

        setFieldError(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateFields()) return;

        setIsLoading(true);

        const operationCost = operationType?.cost || 0;

        if (balance! < operationCost) {
            setErrorMessage('Insufficient credit for this operation');
            setIsLoading(false);
            return;
        }

        try {
            const response = await addOperationRecord(
                operationType?.id || '',
                bankAccount!.id,
                parseAmount(value1),
                parseAmount(value2)
            );

            const profileResponse = await getUserProfile();
            saveProfile(profileResponse.data);

            if (response.statusCode === 200) {
                onClose();
                onAddOperation();
            } else {
                setErrorMessage('Failed to process the operation.');
            }

            fetchBalance();
        } catch (error) {
            console.error(error);
            setErrorMessage('An error occurred while processing the operation.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOperationChange = (operationId: string) => {
        const selectedOp = operationTypes.find((op) => op.id === operationId);
        setOperationType(selectedOp || null);
        setValue1('');
        setValue2('');
        setFieldError({});
        setErrorMessage(null);
    };

    return (
        <Box component="form" display="flex" flexDirection="column" gap={2}>
            {isLoadingOperationTypes ? (
                <Box display="flex" justifyContent="center" alignItems="center" height={56}>
                    <CircularProgress size={32} />
                </Box>
            ) : (
                <TextField
                    select
                    label="Operation"
                    value={operationType?.id || ''}
                    onChange={(e) => handleOperationChange(e.target.value)}
                    required
                    fullWidth
                >
                    {operationTypes.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {operationLabels[option.description.toLowerCase()] ||
                                option.description}{' '}
                            ($
                            {option.cost})
                        </MenuItem>
                    ))}
                </TextField>
            )}

            {operationType && (
                <Box display="flex" flexDirection="column" gap={2}>
                    {operationType.description === 'Random String' && (
                        <Typography variant="body2" color="textSecondary">
                            A new random string will be generated using the <b>RANDOM.ORG</b>{' '}
                            service.
                        </Typography>
                    )}

                    {operationType.description === 'Square Root' && (
                        <Box display="flex" alignItems="center" gap={1}>
                            <Iconify icon={operationIcons.square_root} width={24} sx={{ mx: 1 }} />
                            <TextField
                                label="Value"
                                type="number"
                                value={value1}
                                onChange={(e) => handleValueChange(e.target.value, setValue1)}
                                error={!!fieldError.value1}
                                helperText={fieldError.value1}
                                required
                                sx={{ flex: 1 }}
                            />
                        </Box>
                    )}

                    {operationType.description !== 'Random String' &&
                        operationType.description !== 'Square Root' && (
                            <Box display="flex" alignItems="center" gap={1}>
                                <TextField
                                    label="Value 1"
                                    type="number"
                                    value={value1}
                                    onChange={(e) => handleValueChange(e.target.value, setValue1)}
                                    error={!!fieldError.value1}
                                    helperText={fieldError.value1}
                                    required
                                    sx={{ flex: 1 }}
                                />
                                <Iconify
                                    icon={
                                        operationIcons[
                                            operationType.description.toLowerCase() || ''
                                        ]
                                    }
                                    width={24}
                                    sx={{ mx: 1 }}
                                />
                                <TextField
                                    label="Value 2"
                                    type="number"
                                    value={value2}
                                    onChange={(e) => handleValueChange(e.target.value, setValue2)}
                                    error={!!fieldError.value2}
                                    helperText={fieldError.value2}
                                    required
                                    sx={{ flex: 1 }}
                                />
                            </Box>
                        )}
                </Box>
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
                    {isLoading ? 'Calculating...' : 'Calculate'}
                </Button>
            </Box>
        </Box>
    );
}
