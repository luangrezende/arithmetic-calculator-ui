import { useState, useEffect } from 'react';

import { formatCurrency } from 'src/utils/format-number';

import { AddCreditModal } from 'src/features/add-credit';
import { useBalance } from 'src/context/balance-context';
import { useAuthContext } from 'src/context/auth-context';
import { useToast } from 'src/contexts/toast-context';

import { ThemeToggle } from 'src/components/theme-toggle';
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
    className?: string;
    children: React.ReactNode;
    header?: {
        className?: string;
    };
};

export function DashboardLayout({ className, children, header }: DashboardLayoutProps) {
    const { isLoaded } = useAuthContext();
    const { balance, isBalanceLoaded, fetchBalance } = useBalance();
    const { showToast } = useToast();

    const [navOpen, setNavOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleOpenSnackbar = (status: 'success' | 'error') => {
        setOpenModal(false);
        const message = status === 'success' ? 'Credit added successfully!' : 'Failed to add credit.';
        const type = status === 'success' ? 'success' : 'danger';
        showToast(message, type);
    };

    useEffect(() => {
        fetchBalance();
        isLoaded();
    });

    return (
        <LayoutSection
            headerSection={
                <HeaderSection
                    layoutQuery="lg"
                    slotProps={{
                        container: {
                            maxWidth: false,
                            className: 'px-0 lg:px-5',
                        },
                    }}
                    className={header?.className}
                    slots={{
                        leftArea: (
                            <>
                                <MenuButton
                                    onClick={() => setNavOpen(true)}
                                    className="ml-1 lg:hidden"
                                />
                                <NavMobile
                                    data={navData}
                                    open={navOpen}
                                    onClose={() => setNavOpen(false)}
                                />
                            </>
                        ),
                        rightArea: (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div
                                        className={`flex items-center justify-center px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                                            isBalanceLoaded
                                                ? balance || -1 > 0
                                                    ? 'bg-emerald-100 dark:bg-emerald-900/30 hover:bg-emerald-200 dark:hover:bg-emerald-900/50'
                                                    : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'
                                                : 'bg-slate-200 dark:bg-slate-700'
                                        }`}
                                        onClick={isBalanceLoaded ? handleOpenModal : undefined}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                if (isBalanceLoaded) handleOpenModal();
                                            }
                                        }}
                                        role="button"
                                        tabIndex={isBalanceLoaded ? 0 : -1}
                                        aria-label="Add credit"
                                    >
                                        {isBalanceLoaded ? (
                                            <span className={`text-lg font-bold ${
                                                balance || -1 > 0
                                                    ? 'text-emerald-700 dark:text-emerald-300'
                                                    : 'text-slate-600 dark:text-slate-400'
                                            }`}>
                                                {formatCurrency(
                                                    balance?.toFixed(2).toString() || '0'
                                                )}
                                            </span>
                                        ) : (
                                            <div className="w-6 h-6 border-2 border-slate-400 dark:border-slate-500 border-t-transparent rounded-full animate-spin" />
                                        )}
                                    </div>
                                </div>
                                <ThemeToggle />
                                <NotificationsPopover />
                                <AccountPopover />
                            </div>
                        ),
                }}
            />
        }
        sidebarSection={<NavDesktop data={navData} layoutQuery="lg" />}
        footerSection={null}
        cssVars={{
            '--layout-nav-vertical-width': '240px',
            '--layout-dashboard-content-pt': '8px',
            '--layout-dashboard-content-pb': '64px',
            '--layout-dashboard-content-px': '40px',
        }}
        sx={{
            [`& .${layoutClasses.hasSidebar}`]: {
                '@media (min-width: 1024px)': {
                    pl: 'var(--layout-nav-vertical-width)',
                },
            },
        }}
    >
        <Main>{children}</Main>

        <AddCreditModal
            open={openModal}
            onClose={handleCloseModal}
            onOpenSnackBar={handleOpenSnackbar}
        />
    </LayoutSection>
);
}
