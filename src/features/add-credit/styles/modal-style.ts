import type { SxProps } from '@mui/material/styles';

export const modalStyle: SxProps = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    outline: 'none',
    width: '90%',
    maxWidth: 400,
};
