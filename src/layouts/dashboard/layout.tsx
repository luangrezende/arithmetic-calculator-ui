import { useState, useEffect, useCallback } from 'react';

import { useCurrency } from 'src/hooks/use-currency';

import { useToast } from 'src/contexts/toast-context';
import { AddCreditModal } from 'src/features/add-credit';
import { useBalance } from 'src/context/balance-context';
import { useAuthContext } from 'src/context/auth-context';
import { addCredit } from 'src/services/api/balance-service';
import { getUserProfile } from 'src/services/api/auth-service';

import { ThemeToggle } from 'src/components/theme-toggle';
import { NavMobile, NavDesktop } from 'src/components/navigation';

import { Main } from './main';
import { layoutClasses } from '../classes';
import { navData } from '../config-nav-dashboard';
import { MenuButton } from '../components/menu-button';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';
import { AccountPopover } from '../components/account-popover';
import { BalancePopover } from '../components/balance-popover';
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
    const { currency } = useCurrency();
    const { showToast } = useToast();

    const [navOpen, setNavOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const handleCloseNav = useCallback(() => {
        setNavOpen(false);
    }, []);

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleAddCredit = async (amount: number) => {
        try {
            if (amount < 5 || amount > 100) {
                showToast('Amount must be between $5 and $100', 'danger');
                return;
            }

            const userProfile = await getUserProfile();
            const accountId = userProfile.data?.accounts?.[0]?.id;
            
            if (!accountId) {
                throw new Error('No account found');
            }

            const response = await addCredit(amount, accountId);
            if (response.statusCode === 200) {
                await fetchBalance();
                handleOpenSnackbar('success');
            } else {
                handleOpenSnackbar('error');
            }
        } catch (error) {
            console.error('Error adding credit:', error);
            handleOpenSnackbar('error');
        }
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
                            className: 'px-3 sm:px-6 lg:px-8 xl:px-10',
                        },
                    }}
                    className={header?.className}
                    slots={{
                        leftArea: (
                            <>
                                <MenuButton
                                    onClick={() => setNavOpen(true)}
                                    className="lg:hidden mr-2"
                                />
                                <NavMobile
                                    data={navData}
                                    open={navOpen}
                                    onClose={handleCloseNav}
                                />
                            </>
                        ),
                        rightArea: (
                            <>
                                {/* Desktop Layout */}
                                <div className="hidden sm:flex items-center gap-2 lg:gap-3">
                                    <BalancePopover 
                                        balance={balance}
                                        isBalanceLoaded={isBalanceLoaded}
                                        currency={currency}
                                        onAddCredit={handleAddCredit}
                                    />
                                    
                                    <div className="w-px h-6 bg-slate-300 dark:bg-slate-600" />
                                    
                                    <div className="flex items-center gap-2">
                                        <div className="hidden lg:block">
                                            <ThemeToggle />
                                        </div>
                                        <NotificationsPopover />
                                        <AccountPopover />
                                    </div>
                                </div>

                                {/* Mobile Layout */}
                                <div className="flex sm:hidden items-center gap-2">
                                    <BalancePopover 
                                        balance={balance}
                                        isBalanceLoaded={isBalanceLoaded}
                                        currency={currency}
                                        onAddCredit={handleAddCredit}
                                    />
                                    <NotificationsPopover />
                                    <AccountPopover />
                                </div>
                            </>
                        ),
                }}
            />
        }
        sidebarSection={<NavDesktop data={navData} />}
        footerSection={null}
        cssVars={{
            '--layout-nav-vertical-width': '288px',
            '--layout-dashboard-content-pt': '24px',
            '--layout-dashboard-content-pb': '48px',
            '--layout-dashboard-content-px': '24px',
        }}
        sx={{
            [`& .${layoutClasses.hasSidebar}`]: {
                '@media (min-width: 1024px)': {
                    pl: '288px',
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
