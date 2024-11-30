import type { IconButtonProps } from '@mui/material/IconButton';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { MenuItem, MenuList, menuItemClasses } from '@mui/material';

import { useLocalUser } from 'src/hooks/use-local-user';

import { logout } from 'src/utils/auth-manager';

import { _myAccount } from 'src/_mock';
import { logoutUser } from 'src/services/api/auth-service';

export type AccountPopoverProps = IconButtonProps & {};

export function AccountPopover({ sx, ...other }: AccountPopoverProps) {
    const user = useLocalUser();
    const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

    const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setOpenPopover(event.currentTarget);
    }, []);

    const handleClosePopover = useCallback(() => {
        setOpenPopover(null);
    }, []);

    const handleLogout = useCallback(async () => {
        try {
            await logoutUser();
            logout();
        } catch (error) {
            console.error(error);
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
                        `conic-gradient(${theme.vars.palette.primary.light}, ${theme.vars.palette.warning.light}, ${theme.vars.palette.primary.light})`,
                    ...sx,
                }}
                {...other}
            >
                <Avatar src={_myAccount.photoURL} alt={user?.name} sx={{ width: 1, height: 1 }}>
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

                <MenuList
                    disablePadding
                    sx={{
                        p: 1,
                        gap: 0.5,
                        display: 'flex',
                        flexDirection: 'column',
                        [`& .${menuItemClasses.root}`]: {
                            px: 1,
                            gap: 2,
                            borderRadius: 0.75,
                            color: 'text.secondary',
                            '&:hover': { color: 'text.primary' },
                            [`&.${menuItemClasses.selected}`]: {
                                color: 'text.primary',
                                bgcolor: 'action.selected',
                                fontWeight: 'fontWeightSemiBold',
                            },
                        },
                    }}
                >
                    <MenuItem key="Profile" selected={false}>
                        <img
                            src="/assets/icons/navbar/ic-user.svg"
                            alt="Visa"
                            style={{ width: 25, height: 25 }}
                        />
                        Profile
                    </MenuItem>
                </MenuList>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Box sx={{ p: 1 }}>
                    <Button
                        fullWidth
                        color="error"
                        size="medium"
                        variant="text"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Box>
            </Popover>
        </>
    );
}
