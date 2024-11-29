import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';

import { getProfileBankAccount } from 'src/utils/profile-manager';

import { _notifications } from 'src/_mock';
import { AddCreditModal } from 'src/features/add-credit';
import { useAuthContext } from 'src/context/auth-context';

import { Main } from './main';
import { layoutClasses } from '../classes';
import { NavMobile, NavDesktop } from './nav';
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
    const bankAccount = getProfileBankAccount();
    const { isBalanceLoaded, isLoaded } = useAuthContext();

    const [navOpen, setNavOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const layoutQuery: Breakpoint = 'lg';

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleAddCredit = (amount: number) => {};

    useEffect(() => {
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
                                                ? bankAccount?.balance || -1 > 0
                                                    ? 'success.light'
                                                    : 'grey.300'
                                                : 'grey.300',
                                            cursor: isBalanceLoaded ? 'pointer' : 'default',
                                            boxShadow: 1,
                                            '&:hover': {
                                                boxShadow: isBalanceLoaded ? 3 : 1,
                                            },
                                        }}
                                        onClick={isBalanceLoaded ? handleOpenModal : undefined}
                                    >
                                        {isBalanceLoaded ? (
                                            <Typography
                                                variant="h6"
                                                fontWeight="bold"
                                                sx={{
                                                    color:
                                                        bankAccount?.balance || -1 > 0
                                                            ? 'success.dark'
                                                            : 'text.secondary',
                                                }}
                                            >
                                                ${bankAccount?.balance.toFixed(2)}
                                            </Typography>
                                        ) : (
                                            <CircularProgress size={24} color="inherit" />
                                        )}
                                    </Box>
                                </Box>
                                <NotificationsPopover data={_notifications} />
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
                onAddCredit={handleAddCredit}
            />
        </LayoutSection>
    );
}
