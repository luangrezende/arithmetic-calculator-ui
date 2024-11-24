import { useState } from 'react';
import { Box, Modal, Fade, Backdrop, TextField, Button, Typography } from '@mui/material';

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
    const [addAmount, setAddAmount] = useState('');
    const [validationError, setValidationError] = useState<string | null>(null);

    const handleAddCredit = () => {
        const amount = parseFloat(addAmount);

        // eslint-disable-next-line no-restricted-globals
        if (isNaN(amount) || amount <= 0 || amount > 300) {
            setValidationError(
                amount > 300
                    ? 'The maximum amount you can add is $300.'
                    : 'Please enter a valid amount greater than $0.'
            );
            return;
        }

        onAddCredit(amount);
        setAddAmount('');
        setValidationError(null);
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}
        >
            <Fade in={open}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" mb={2}>
                        Add Balance
                    </Typography>

                    {/* Campos do cartão de crédito desativados */}
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
                        sx={{ mt: 2, mb: 2 }}
                        error={!!validationError}
                        helperText={validationError}
                    />

                    <Box display="flex" justifyContent="flex-end" gap={2}>
                        <Button onClick={onClose} variant="outlined">
                            Cancel
                        </Button>
                        <Button onClick={handleAddCredit} variant="contained" color="primary">
                            Add
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
}
