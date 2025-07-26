import type { IconButtonProps } from '@mui/material/IconButton';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';

import { useLocalUser } from 'src/hooks/use-local-user';

import { logout } from 'src/utils/auth-manager';

import { logoutUser } from 'src/services/api/auth-service';

import { ModernButton } from 'src/components/modern-button';

export function AccountPopover({ sx, ...other }: IconButtonProps) {
    const user = useLocalUser();
    const [photoUrl] = useState('');
    const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
    const [loading, setLoading] = useState(false);

    const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setOpenPopover(event.currentTarget);
    }, []);

    const handleClosePopover = useCallback(() => {
        setOpenPopover(null);
    }, []);

    const handleLogout = useCallback(async () => {
        setLoading(true);
        try {
            await logoutUser();
            logout();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <>
            <IconButton
                onClick={handleOpenPopover}
                sx={{
                    p: '2px',
                    width: 40,
                    height: 40,
                    background: (theme) =>
                        `conic-gradient(${theme.palette.primary.light}, ${theme.palette.warning.light}, ${theme.palette.primary.light})`,
                    ...sx,
                }}
                {...other}
            >
                <Avatar src={photoUrl} alt={user?.name} sx={{ width: 1, height: 1 }}>
                    {user?.name.charAt(0).toUpperCase()}
                </Avatar>
            </IconButton>

            <Popover
                open={!!openPopover}
                anchorEl={openPopover}
                onClose={handleClosePopover}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                slotProps={{
                    paper: {
                        sx: { width: 200 },
                    },
                }}
            >
                <Box sx={{ p: 2, pb: 1.5 }}>
                    <Typography variant="subtitle2" noWrap>
                        {user?.name}
                    </Typography>

                    <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                        {user?.username}
                    </Typography>
                </Box>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Box sx={{ p: 1 }}>
                    <ModernButton
                        variant="secondary"
                        onClick={handleLogout}
                        disabled={loading}
                        className="w-full bg-red-500 hover:bg-red-600 text-white disabled:bg-gray-400"
                    >
                        {loading ? (
                            <>
                                <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                                Logging out...
                            </>
                        ) : (
                            'Logout'
                        )}
                    </ModernButton>
                </Box>
            </Popover>
        </>
    );
}
