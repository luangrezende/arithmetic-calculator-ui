import { useRef, useState, useEffect, useCallback } from 'react';

import { useLocalUser } from 'src/hooks/use-local-user';

import { logout } from 'src/utils/auth-manager';

import { useThemeMode } from 'src/context/theme-context';
import { logoutUser } from 'src/services/api/auth-service';

import { Iconify } from 'src/components/iconify';
import { Tooltip } from 'src/components/tooltip';

interface AccountPopoverProps {
    className?: string;
}

export function AccountPopover({ 
    className
}: AccountPopoverProps) {
    const user = useLocalUser();
    const { mode, toggleTheme } = useThemeMode();
    const [photoUrl] = useState('');
    const [openPopover, setOpenPopover] = useState(false);
    const [loading, setLoading] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    const handleOpenPopover = useCallback(() => {
        setOpenPopover(prev => !prev);
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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                handleClosePopover();
            }
        };

        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClosePopover();
            }
        };

        if (openPopover) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscapeKey);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [openPopover, handleClosePopover]);

    return (
        <div className="relative" ref={popoverRef}>
            <Tooltip content="Open account menu">
                <button
                    type="button"
                    onClick={handleOpenPopover}
                    className={`w-10 h-10 xl:w-11 xl:h-11 p-0.5 xl:p-1 rounded-full bg-slate-100 dark:bg-slate-800 backdrop-blur-sm shadow-sm transition-all duration-200 ease-out active:scale-95 sm:hover:scale-105 sm:hover:bg-slate-100 sm:dark:hover:bg-slate-800 sm:hover:shadow-md focus:outline-none focus:ring-0 active:outline-none active:ring-0 select-none ${className}`}
                >
                    <div className="w-full h-full rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                        {photoUrl ? (
                            <img
                                src={photoUrl}
                                alt={user?.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                            </span>
                        )}
                    </div>
                </button>
            </Tooltip>

            {openPopover && (
                <div 
                    className="absolute right-0 top-full mt-2 w-48 sm:w-52 bg-white dark:bg-slate-800 backdrop-blur-xl backdrop-saturate-150 rounded-xl shadow-xl z-50 overflow-hidden"
                    style={{ 
                        animation: 'fadeSlideIn 0.3s ease-out forwards',
                        opacity: 0 
                    }}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="profile-title"
                >
                    <div className="p-4 bg-slate-100/60 dark:bg-slate-700/60 backdrop-blur-xl">
                        <h3 id="profile-title" className="font-medium text-slate-900 dark:text-slate-100 truncate">
                            {user?.name}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                            {user?.username}
                        </p>
                    </div>

                    <div className="p-2 space-y-2">
                        <button
                            type="button"
                            onClick={() => {
                                toggleTheme();
                                handleClosePopover();
                            }}
                            className="lg:hidden w-full py-2 px-3 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/80 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            <Iconify 
                                icon={mode === 'dark' ? 'solar:sun-bold' : 'solar:moon-bold'} 
                                width={14} 
                                sx={{ color: mode === 'dark' ? '#eab308' : '#2563eb' }}
                            />
                            Toggle Theme
                        </button>
                        
                        <div className="lg:hidden w-full h-px bg-slate-200 dark:bg-slate-700" />
                        
                        <button
                            type="button"
                            onClick={handleLogout}
                            disabled={loading}
                            className="w-full py-2 px-3 text-sm font-medium text-red-600 dark:text-red-400 sm:hover:text-red-700 sm:dark:hover:text-red-300 sm:hover:bg-red-50 sm:dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <svg 
                                        className="animate-spin -ml-1 mr-2 h-4 w-4" 
                                        fill="none" 
                                        viewBox="0 0 24 24"
                                    >
                                        <circle 
                                            className="opacity-25" 
                                            cx="12" 
                                            cy="12" 
                                            r="10" 
                                            stroke="currentColor" 
                                            strokeWidth="4"
                                        />
                                        <path 
                                            className="opacity-75" 
                                            fill="currentColor" 
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    Logging out...
                                </>
                            ) : (
                                'Logout'
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
