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
            <Typography 
                variant="h4" 
                className="text-slate-700 dark:text-slate-100 font-semibold"
                sx={{ fontWeight: 600, fontSize: '1.75rem' }}
            >
                {title}
            </Typography>
            {subtitle && (
                <Typography 
                    variant="body2" 
                    className="text-slate-500 dark:text-slate-200"
                    sx={{ fontWeight: 400 }}
                >
                    {subtitle}{' '}
                    {actionText && (
                        <Link
                            component="button"
                            variant="subtitle2"
                            className="text-slate-600 dark:text-slate-100 hover:text-slate-700 dark:hover:text-slate-50"
                            sx={{ 
                                ml: 0.5, 
                                fontWeight: 500,
                                textDecoration: 'none',
                                '&:hover': { textDecoration: 'none' }
                            }}
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
