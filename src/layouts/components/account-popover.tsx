import { useState, useCallback } from 'react';

import { useLocalUser } from 'src/hooks/use-local-user';

import { logout } from 'src/utils/auth-manager';

import { logoutUser } from 'src/services/api/auth-service';

import { ModernButton } from 'src/components/modern-button';

interface AccountPopoverProps {
    className?: string;
}

export function AccountPopover({ className }: AccountPopoverProps) {
    const user = useLocalUser();
    const [photoUrl] = useState('');
    const [openPopover, setOpenPopover] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOpenPopover = useCallback(() => {
        setOpenPopover(true);
    }, []);

    const handleClosePopover = useCallback(() => {
        setOpenPopover(false);
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
        <div className="relative">
            <button
                type="button"
                onClick={handleOpenPopover}
                className={`w-10 h-10 p-0.5 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 ease-out hover:scale-105 active:scale-95 hover:shadow-md ${className}`}
            >
                <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                    {photoUrl ? (
                        <img
                            src={photoUrl}
                            alt={user?.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                    )}
                </div>
            </button>

            {openPopover && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={handleClosePopover}
                        onKeyDown={(e) => {
                            if (e.key === 'Escape') {
                                handleClosePopover();
                            }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-label="Close popover"
                    />
                    <div className="absolute right-0 top-full mt-2 w-48 sm:w-52 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 z-50">
                        <div className="p-4 pb-3">
                            <h3 className="font-medium text-slate-900 dark:text-slate-100 truncate">
                                {user?.name}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                                {user?.username}
                            </p>
                        </div>

                        <div className="border-t border-dashed border-slate-200 dark:border-slate-700" />

                        <div className="p-2">
                            <ModernButton
                                variant="outline"
                                onClick={handleLogout}
                                disabled={loading}
                                className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20 dark:hover:border-red-700 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-red-600/30 border-t-red-600 dark:border-red-400/30 dark:border-t-red-400 rounded-full animate-spin" />
                                        Logging out...
                                    </>
                                ) : (
                                    'Logout'
                                )}
                            </ModernButton>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
