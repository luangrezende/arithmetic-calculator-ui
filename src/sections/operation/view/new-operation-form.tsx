import { useState } from 'react';

import { Box, Alert, Button, MenuItem, TextField } from '@mui/material';

import { Iconify } from 'src/components/iconify';

const operations = [
    { value: 'addition', label: 'Addition', cost: 10 },
    { value: 'subtraction', label: 'Subtraction', cost: 10 },
    { value: 'multiplication', label: 'Multiplication', cost: 15 },
    { value: 'division', label: 'Division', cost: 15 },
    { value: 'square_root', label: 'Square Root', cost: 5 },
    { value: 'random_string', label: 'Random String', cost: 5 },
];

interface NewOperationFormProps {
    onClose: () => void;
    credit: number;
    onAddOperation: () => void;
}

const operationIcons: { [key: string]: string } = {
    addition: 'mdi:plus',
    subtraction: 'mdi:minus',
    multiplication: 'mdi:close',
    division: 'mdi:division',
    square_root: 'mdi:root',
    random_string: 'mdi:shuffle-variant',
};

export function NewOperationForm({ onClose, credit, onAddOperation }: NewOperationFormProps) {
    const [operationType, setOperationType] = useState('');
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [fieldError, setFieldError] = useState<{ value1?: string; value2?: string }>({});

    const validateFields = () => {
        const errors: { value1?: string; value2?: string } = {};

        if (!operationType) {
            setErrorMessage('Please select an operation');
            return false;
        }

        if (!value1 && operationType !== 'square_root' && operationType !== 'random_string') {
            errors.value1 = 'Value 1 is required';
        }

        if (!value2 && operationType !== 'square_root' && operationType !== 'random_string') {
            errors.value2 = 'Value 2 is required';
        }

        if (operationType === 'division' && value2 === '0') {
            errors.value2 = 'Division by zero is not allowed';
        }

        setFieldError(errors);
        return Object.keys(errors).length === 0;
    };

    const calculateResult = () => {
        const num1 = parseFloat(value1);
        const num2 = parseFloat(value2);

        switch (operationType) {
            case 'addition':
                return num1 + num2;
            case 'subtraction':
                return num1 - num2;
            case 'multiplication':
                return num1 * num2;
            case 'division':
                return num1 / num2;
            case 'square_root':
                return Math.sqrt(num1);
            case 'random_string':
                return Math.random().toString(36).substring(7);
            default:
                return null;
        }
    };

    const handleSubmit = () => {
        if (!validateFields()) return;

        const operationCost = operations.find((op) => op.value === operationType)?.cost || 0;

        if (credit < operationCost) {
            setErrorMessage('Insufficient credit for this operation');
            return;
        }

        const result = calculateResult();

        alert(result);
        onAddOperation();

        onClose();
    };

    return (
        <Box component="form" display="flex" flexDirection="column" gap={2}>
            <TextField
                select
                label="Operation"
                value={operationType}
                onChange={(e) => setOperationType(e.target.value)}
                required
            >
                {operations.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label} (${option.cost})
                    </MenuItem>
                ))}
            </TextField>

            {/* Exibir campos somente após selecionar o tipo */}
            {operationType && (
                <Box display="flex" alignItems="center" gap={1}>
                    {operationType !== 'random_string' && (
                        <TextField
                            label={operationType === 'square_root' ? 'Value' : 'Value 1'}
                            type="number"
                            value={value1}
                            onChange={(e) => setValue1(e.target.value)}
                            error={!!fieldError.value1}
                            helperText={fieldError.value1}
                            sx={{ flex: 1 }}
                        />
                    )}
                    {operationType !== 'square_root' && operationType !== 'random_string' && (
                        <>
                            <Iconify
                                icon={operationIcons[operationType]}
                                width={24}
                                sx={{ mx: 1 }}
                            />
                            <TextField
                                label="Value 2"
                                type="number"
                                value={value2}
                                onChange={(e) => setValue2(e.target.value)}
                                error={!!fieldError.value2}
                                helperText={fieldError.value2}
                                sx={{ flex: 1 }}
                            />
                        </>
                    )}
                </Box>
            )}

            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button onClick={onClose} variant="outlined">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} variant="contained">
                    Calculate
                </Button>
            </Box>
        </Box>
    );
}
