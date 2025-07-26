import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';

import { fToNow } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { useNotifications, type OperationNotification } from 'src/context/notifications-context';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

export function NotificationsPopover() {
    const { notifications, markAllAsRead, clearNotifications } = useNotifications();
    
    const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;

    const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

    const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setOpenPopover(event.currentTarget);
    }, []);

    const handleClosePopover = useCallback(() => {
        setOpenPopover(null);
    }, []);

    const handleMarkAllAsRead = useCallback(() => {
        markAllAsRead();
    }, [markAllAsRead]);

    const handleClearAll = useCallback(() => {
        clearNotifications();
        setOpenPopover(null);
    }, [clearNotifications]);

    return (
        <>
            <IconButton color={openPopover ? 'primary' : 'default'} onClick={handleOpenPopover}>
                <Badge badgeContent={totalUnRead} color="error">
                    <Iconify width={24} icon="solar:bell-bing-bold-duotone" />
                </Badge>
            </IconButton>

            <Popover
                open={!!openPopover}
                anchorEl={openPopover}
                onClose={handleClosePopover}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                slotProps={{
                    paper: {
                        sx: {
                            width: 360,
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                        },
                    },
                }}
            >
                <Box display="flex" alignItems="center" sx={{ py: 2, pl: 2.5, pr: 1.5 }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1">Operation Notifications</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {totalUnRead > 0 
                                ? `You have ${totalUnRead} new operations`
                                : 'No new operations'
                            }
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                        {totalUnRead > 0 && (
                            <Tooltip title="Mark all as read">
                                <IconButton color="primary" onClick={handleMarkAllAsRead}>
                                    <Iconify icon="solar:check-read-outline" />
                                </IconButton>
                            </Tooltip>
                        )}
                        
                        {notifications.length > 0 && (
                            <Tooltip title="Clear all">
                                <IconButton onClick={handleClearAll}>
                                    <Iconify icon="solar:trash-bin-trash-outline" />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Box>
                </Box>

                <Divider />

                {notifications.length === 0 ? (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            py: 4,
                            px: 2,
                        }}
                    >
                        <Iconify
                            icon="solar:bell-off-outline"
                            width={48}
                            sx={{ color: 'text.disabled', mb: 2 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                            No operations yet
                        </Typography>
                    </Box>
                ) : (
                    <Scrollbar sx={{ height: 360 }}>
                        <List disablePadding>
                            {notifications.map((notification) => (
                                <NotificationItem key={notification.id} notification={notification} />
                            ))}
                        </List>
                    </Scrollbar>
                )}
            </Popover>
        </>
    );
}

function NotificationItem({ notification }: { notification: OperationNotification }) {
    const { markAsRead } = useNotifications();
    
    const handleClick = () => {
        if (notification.isUnRead) {
            markAsRead(notification.id);
        }
    };

    return (
        <ListItemButton
            onClick={handleClick}
            sx={{
                py: 1.5,
                px: 2.5,
                mt: '1px',
                ...(notification.isUnRead && {
                    bgcolor: 'action.selected',
                }),
            }}
        >
            <ListItemAvatar>
                <Avatar sx={{ 
                    bgcolor: 'error.main',
                    color: 'error.contrastText'
                }}>
                    <Iconify icon="solar:wallet-money-outline" width={20} />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={`Operation: ${notification.operation}`}
                secondary={
                    <>
                        {`Cost: ${fCurrency(notification.amount)} • ${fToNow(notification.createdAt)}`}
                    </>
                }
                primaryTypographyProps={{
                    variant: 'subtitle2',
                    component: 'div'
                }}
                secondaryTypographyProps={{
                    variant: 'body2',
                    color: 'text.secondary',
                    component: 'div',
                    sx: { 
                        mt: 0.5,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                    }
                }}
            />
        </ListItemButton>
    );
}
