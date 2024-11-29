import { Box, Fade, Modal, Typography } from '@mui/material';

import { modalStyle } from './add-credit.styles';
import { AddCreditForm } from './add-credit-form';

import type { AddCreditModalProps } from './add-credit.types';

export function AddCreditModal({ open, onClose, onAddCredit }: AddCreditModalProps) {
    return (
        <Modal open={open} onClose={onClose} closeAfterTransition>
            <Fade in={open}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" mb={2}>
                        Add Credit
                    </Typography>
                    <AddCreditForm onClose={onClose} onAddCredit={onAddCredit} />
                </Box>
            </Fade>
        </Modal>
    );
}
