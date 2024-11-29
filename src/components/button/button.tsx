import { Button as MuiButton } from '@mui/material';

import type { ButtonProps } from './button.types';

export function Button({ children, ...props }: ButtonProps) {
    return <MuiButton {...props}>{children}</MuiButton>;
}
