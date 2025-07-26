import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';

import { formatCurrency } from 'src/utils/format-number';

import { AddCreditModal } from 'src/features/add-credit';
import { useBalance } from 'src/context/balance-context';
import { useAuthContext } from 'src/context/auth-context';

import { ThemeToggle } from 'src/components/theme-toggle';
import { AlertSnackbar } from 'src/components/alert-snackbar';
import { NavMobile, NavDesktop } from 'src/components/navigation';

import { Main } from './main';
import { layoutClasses } from '../classes';
import { navData } from '../config-nav-dashboard';
import { MenuButton } from '../components/menu-button';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';
import { AccountPopover } from '../components/account-popover';
import { NotificationsPopover } from '../components/notifications-popover';

export type DashboardLayoutProps = {
    sx?: SxProps<Theme>;
    children: React.ReactNode;
    header?: {
        sx?: SxProps<Theme>;
    };
};

export function DashboardLayout({ sx, children, header }: DashboardLayoutProps) {
    const theme = useTheme();
    const { isLoaded } = useAuthContext();
    const { balance, isBalanceLoaded, fetchBalance } = useBalance();
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error',
    });

    const [navOpen, setNavOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const layoutQuery: Breakpoint = 'lg';

    const handleOpenModal = () => setOpenModal(true);

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleOpenSnackbar = (status: 'success' | 'error') => {
        setOpenModal(false);
        setSnackbar({
            open: true,
            message: status === 'success' ? 'Credit added successfully!' : 'Failed to add credit.',
            severity: status,
        });
    };

    useEffect(() => {
        fetchBalance();
        isLoaded();
    });

    return (
        <LayoutSection
            headerSection={
                <HeaderSection
                    layoutQuery={layoutQuery}
                    slotProps={{
                        container: {
                            maxWidth: false,
                            sx: { px: { [layoutQuery]: 5 } },
                        },
                    }}
                    sx={header?.sx}
                    slots={{
                        leftArea: (
                            <>
                                <MenuButton
                                    onClick={() => setNavOpen(true)}
                                    sx={{
                                        ml: -1,
                                        [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
                                    }}
                                />
                                <NavMobile
                                    data={navData}
                                    open={navOpen}
                                    onClose={() => setNavOpen(false)}
                                />
                            </>
                        ),
                        rightArea: (
                            <Box gap={2} display="flex" alignItems="center">
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Typography
                                        variant="body1"
                                        fontWeight="medium"
                                        sx={{
                                            color: 'text.secondary',
                                        }}
                                    >
                                        Credit:
                                    </Typography>

                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        sx={{
                                            px: 2,
                                            py: 1,
                                            borderRadius: 1,
                                            bgcolor: isBalanceLoaded
                                                ? balance || -1 > 0
                                                    ? 'success.light'
                                                    : 'grey.300'
                                                : 'grey.300',
                                            cursor: isBalanceLoaded ? 'pointer' : 'default',
                                        }}
                                        onClick={isBalanceLoaded ? handleOpenModal : undefined}
                                    >
                                        {isBalanceLoaded ? (
                                            <Typography
                                                variant="h6"
                                                fontWeight="bold"
                                                sx={{
                                                    color:
                                                        balance || -1 > 0
                                                            ? 'success.dark'
                                                            : 'text.secondary',
                                                }}
                                            >
                                                {formatCurrency(
                                                    balance?.toFixed(2).toString() || '0'
                                                )}
                                            </Typography>
                                        ) : (
                                            <CircularProgress size={24} color="inherit" />
                                        )}
                                    </Box>
                                </Box>
                                <ThemeToggle />
                                <NotificationsPopover />
                                <AccountPopover />
                            </Box>
                        ),
                    }}
                />
            }
            sidebarSection={<NavDesktop data={navData} layoutQuery={layoutQuery} />}
            footerSection={null}
            cssVars={{
                '--layout-nav-vertical-width': '300px',
                '--layout-dashboard-content-pt': theme.spacing(1),
                '--layout-dashboard-content-pb': theme.spacing(8),
                '--layout-dashboard-content-px': theme.spacing(5),
            }}
            sx={{
                [`& .${layoutClasses.hasSidebar}`]: {
                    [theme.breakpoints.up(layoutQuery)]: {
                        pl: 'var(--layout-nav-vertical-width)',
                    },
                },
                ...sx,
            }}
        >
            <Main>{children}</Main>

            <AddCreditModal
                open={openModal}
                onClose={handleCloseModal}
                onOpenSnackBar={handleOpenSnackbar}
            />

            <AlertSnackbar
                open={snackbar.open}
                message={snackbar.message}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                severity={snackbar.severity}
            />
        </LayoutSection>
    );
}
