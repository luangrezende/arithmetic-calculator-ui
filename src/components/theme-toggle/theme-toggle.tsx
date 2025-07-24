import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { Iconify } from 'src/components/iconify';
import { useThemeMode } from 'src/context/theme-context';

export function ThemeToggle() {
    const theme = useTheme();
    const { mode, toggleTheme } = useThemeMode();

    return (
        <IconButton
            onClick={toggleTheme}
            sx={{
                p: 1.5,
                borderRadius: 2,
                bgcolor: 'background.paper',
                border: `1px solid ${theme.palette.divider}`,
                transition: theme.transitions.create(['background-color', 'transform'], {
                    duration: theme.transitions.duration.short,
                }),
                '&:hover': {
                    transform: 'scale(1.05)',
                    bgcolor: 'action.hover',
                },
            }}
        >
            <Iconify
                icon={mode === 'dark' ? 'solar:sun-bold' : 'solar:moon-bold'}
                width={20}
                sx={{
                    color: mode === 'dark' ? 'warning.main' : 'primary.main',
                    transition: theme.transitions.create(['color'], {
                        duration: theme.transitions.duration.short,
                    }),
                }}
            />
        </IconButton>
    );
}
