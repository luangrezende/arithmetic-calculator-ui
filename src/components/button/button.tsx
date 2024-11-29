import type { ButtonProps } from '@mui/material';

import { Button as MuiButton } from '@mui/material';

export function Button({ children, ...props }: ButtonProps) {
    return <MuiButton {...props}>{children}</MuiButton>;
}
