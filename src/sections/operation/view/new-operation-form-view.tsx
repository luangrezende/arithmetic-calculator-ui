import { useState } from 'react';

import { Box, Alert, Button, MenuItem, TextField } from '@mui/material';

const operations = [
    { value: 'addition', label: 'Addition', cost: 10 },
    { value: 'subtraction', label: 'Subtraction', cost: 10 },
    { value: 'multiplication', label: 'Multiplication', cost: 15 },
    { value: 'division', label: 'Division', cost: 15 },
    { value: 'square_root', label: 'Square Root', cost: 5 },
    { value: 'random_string', label: 'Random String', cost: 5 },
];

export function NewOperationForm({ onClose }: { onClose: () => void }) {
    const [operationType, setOperationType] = useState('');
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [result, setResult] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [fieldError, setFieldError] = useState<{ value1?: string; value2?: string }>({});
    const [credit, setCredit] = useState(0);

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

    const handleSubmit = async () => {
        if (!validateFields()) return;

        try {
            setErrorMessage(null);

            const operationCost = operations.find((op) => op.value === operationType)?.cost || 0;

            if (credit < operationCost) {
                setErrorMessage('Insufficient credit for this operation');
                return;
            }

            const response = await fetch('/api/operations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ operationType, value1, value2 }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({
                    message: response.statusText,
                }));
                throw new Error(errorData.message || 'An error occurred');
            }

            const data = await response.json();
            setResult(data.result);

            setCredit((prev) => Math.max(prev - operationCost, 0));
        } catch (error: any) {
            setErrorMessage(error.message || 'Failed to perform operation');
        }
    };

    return (
        <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap={2}
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
        >
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

            {operationType !== 'square_root' && operationType !== 'random_string' && (
                <>
                    <TextField
                        label="Value 1"
                        type="number"
                        value={value1}
                        onChange={(e) => setValue1(e.target.value)}
                        error={!!fieldError.value1}
                        helperText={
                            fieldError.value1 && (
                                <span style={{ color: 'red' }}>{fieldError.value1}</span>
                            )
                        }
                    />
                    <TextField
                        label="Value 2"
                        type="number"
                        value={value2}
                        onChange={(e) => setValue2(e.target.value)}
                        error={!!fieldError.value2}
                        helperText={
                            fieldError.value2 && (
                                <span style={{ color: 'red' }}>{fieldError.value2}</span>
                            )
                        }
                    />
                </>
            )}

            {result && <Alert severity="success">Result: {result}</Alert>}

            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button onClick={onClose} variant="outlined">
                    Cancel
                </Button>
                <Button type="submit" variant="contained">
                    Submit
                </Button>
            </Box>
        </Box>
    );
}
