import { useState } from 'react';

export function useSnackbar(initialMessage = '') {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(initialMessage);

    const showSnackbar = (newMessage: string) => {
        setMessage(newMessage);
        setOpen(true);
    };

    const closeSnackbar = () => setOpen(false);

    return { open, message, showSnackbar, closeSnackbar };
}
