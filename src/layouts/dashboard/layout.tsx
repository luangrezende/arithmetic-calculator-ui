import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { _notifications } from 'src/_mock';

import { Iconify } from 'src/components/iconify';

import { AddCreditModal } from 'src/sections/credit/view/add-credit-modal';

import { Main } from './main';
import { layoutClasses } from '../classes';
import { NavMobile, NavDesktop } from './nav';
import { navData } from '../config-nav-dashboard';
import { _workspaces } from '../config-nav-workspace';
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

    const [navOpen, setNavOpen] = useState(false);
    const [credit, setCredit] = useState(100); // Saldo inicial
    const [openModal, setOpenModal] = useState(false);

    const layoutQuery: Breakpoint = 'lg';

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleAddCredit = (amount: number) => {
        setCredit((prev) => prev + amount);
    };

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
                        topArea: (
                            <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                                This is an info Alert.
                            </Alert>
                        ),
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
                                    workspaces={_workspaces}
                                />
                            </>
                        ),
                        rightArea: (
                            <Box gap={2} display="flex" alignItems="center">
                                {/* Exibição do saldo com clique para abrir o modal */}
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    sx={{
                                        px: 2,
                                        py: 1,
                                        borderRadius: 1,
                                        bgcolor: credit > 0 ? 'success.light' : 'error.light',
                                        cursor: 'pointer',
                                    }}
                                    onClick={handleOpenModal}
                                >
                                    <Typography
                                        variant="body1"
                                        fontWeight="bold"
                                        sx={{
                                            color: credit > 0 ? 'green' : 'red',
                                        }}
                                    >
                                        Credit: ${credit.toFixed(2)}
                                    </Typography>
                                </Box>

                                {/* Ícones de notificações e perfil */}
                                <NotificationsPopover data={_notifications} />
                                <AccountPopover
                                    data={[
                                        {
                                            label: 'Home',
                                            href: '/',
                                            icon: (
                                                <Iconify
                                                    width={22}
                                                    icon="solar:home-angle-bold-duotone"
                                                />
                                            ),
                                        },
                                        {
                                            label: 'Profile',
                                            href: '#',
                                            icon: (
                                                <Iconify
                                                    width={22}
                                                    icon="solar:shield-keyhole-bold-duotone"
                                                />
                                            ),
                                        },
                                    ]}
                                />
                            </Box>
                        ),
                    }}
                />
            }
            sidebarSection={
                <NavDesktop data={navData} layoutQuery={layoutQuery} workspaces={_workspaces} />
            }
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

            {/* Modal para adicionar saldo */}
            <AddCreditModal
                open={openModal}
                onClose={handleCloseModal}
                onAddCredit={handleAddCredit}
            />
        </LayoutSection>
    );
}
