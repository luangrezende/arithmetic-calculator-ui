import { Box, Link, Typography } from '@mui/material';

export interface AuthTitleProps {
    title: string;
    subtitle?: string;
    actionText?: string;
    onAction?: () => void;
}

export function AuthTitle({ title, subtitle, actionText, onAction }: AuthTitleProps) {
    return (
        <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
            <Typography variant="h5">{title}</Typography>
            {subtitle && (
                <Typography variant="body2" color="text.secondary">
                    {subtitle}{' '}
                    {actionText && (
                        <Link
                            component="button"
                            variant="subtitle2"
                            sx={{ ml: 0.5 }}
                            onClick={onAction}
                        >
                            {actionText}
                        </Link>
                    )}
                </Typography>
            )}
        </Box>
    );
}
