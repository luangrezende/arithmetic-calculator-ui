import { useRef, useState, useEffect, useCallback } from 'react';

import { useRouter } from 'src/routes/hooks';

import { useCurrency } from 'src/hooks/use-currency';

import { fToNow } from 'src/utils/format-time';
import { formatCurrencyWithSymbol } from 'src/utils/format-number';

import { useNotifications, type OperationNotification } from 'src/context/notifications-context';

import { Tooltip } from 'src/components/tooltip';
import { Iconify } from 'src/components/iconify';

export function NotificationsPopover() {
    const { notifications, markAllAsRead, clearNotifications } = useNotifications();
    const { currency } = useCurrency();
    const router = useRouter();
    const popoverRef = useRef<HTMLDivElement>(null);
    
    const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;

    const [openPopover, setOpenPopover] = useState(false);
    const [markingAsRead, setMarkingAsRead] = useState(false);
    const [clearing, setClearing] = useState(false);

    const handleOpenPopover = useCallback(() => {
        setOpenPopover(prev => !prev);
    }, []);

    const handleClosePopover = useCallback(() => {
        setOpenPopover(false);
    }, []);

    const handleMarkAllAsRead = useCallback(async () => {
        setMarkingAsRead(true);
        try {
            markAllAsRead();
        } finally {
            setMarkingAsRead(false);
        }
    }, [markAllAsRead]);

    const handleClearAll = useCallback(async () => {
        setClearing(true);
        try {
            clearNotifications();
            setOpenPopover(false);
        } finally {
            setClearing(false);
        }
    }, [clearNotifications]);

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
            <Tooltip content="View notifications">
                <button
                    type="button"
                    onClick={handleOpenPopover}
                    className="relative w-10 h-10 xl:w-11 xl:h-11 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 backdrop-blur-sm shadow-sm transition-all duration-200 ease-out active:scale-95 sm:hover:scale-105 sm:hover:bg-slate-100 sm:dark:hover:bg-slate-800 sm:hover:shadow-md focus:outline-none focus:ring-0 active:outline-none active:ring-0 select-none"
                >
                    <Iconify 
                        icon="solar:letter-unread-bold"
                        width={16}
                        sx={{
                            color: 'primary.main',
                            '.dark &': {
                                color: '#e2e8f0',
                            },
                            transition: 'color 0.2s ease-out',
                            width: { xs: 16, xl: 18 },
                            height: { xs: 16, xl: 18 },
                        }}
                    />
                    {totalUnRead > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                            {totalUnRead > 9 ? '9+' : totalUnRead}
                        </span>
                    )}
                </button>
            </Tooltip>

            {openPopover && (
                <div 
                    className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-slate-800 backdrop-blur-xl backdrop-saturate-150 rounded-xl shadow-xl z-50 overflow-hidden"
                    style={{ 
                        animation: 'fadeSlideIn 0.3s ease-out forwards',
                        opacity: 0 
                    }}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="notifications-title"
                >
                    <div className="p-4 bg-slate-100/60 dark:bg-slate-700/60 backdrop-blur-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 id="notifications-title" className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                    Notifications
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {totalUnRead > 0 
                                        ? `${totalUnRead} new notification${totalUnRead > 1 ? 's' : ''}`
                                        : 'All caught up!'
                                    }
                                </p>
                            </div>
                            <div className="flex gap-2">
                                {totalUnRead > 0 && (
                                    <Tooltip content="Mark all as read">
                                        <button
                                            type="button"
                                            onClick={handleMarkAllAsRead}
                                            disabled={markingAsRead}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/50 text-blue-500 dark:text-blue-300 sm:hover:bg-blue-100 sm:dark:hover:bg-blue-900/70 transition-colors disabled:opacity-50"
                                        >
                                            {markingAsRead ? (
                                                <svg 
                                                    className="animate-spin h-4 w-4" 
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
                                            ) : (
                                                <Iconify icon="solar:check-read-outline" width={16} />
                                            )}
                                        </button>
                                    </Tooltip>
                                )}
                                {notifications.length > 0 && (
                                    <Tooltip content="Clear all notifications">
                                        <button
                                            type="button"
                                            onClick={handleClearAll}
                                            disabled={clearing}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 dark:bg-red-900/50 text-red-500 dark:text-red-400 sm:hover:bg-red-100 sm:dark:hover:bg-red-900/70 transition-colors disabled:opacity-50"
                                        >
                                            {clearing ? (
                                                <svg 
                                                    className="animate-spin h-4 w-4" 
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
                                            ) : (
                                                <Iconify icon="solar:trash-bin-trash-outline" width={16} />
                                            )}
                                        </button>
                                    </Tooltip>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 px-4">
                                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
                                    <Iconify
                                        icon="solar:bell-line-duotone"
                                        width={24}
                                        sx={{ color: 'text.disabled' }}
                                    />
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 text-center">
                                    No notifications yet
                                </p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-200/50 dark:divide-slate-700/50">
                                {notifications.map((notification) => (
                                    <NotificationItem 
                                        key={notification.id} 
                                        notification={notification} 
                                        currency={currency}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {notifications.length > 0 && (
                        <div className="p-2 bg-slate-100/60 dark:bg-slate-700/60 backdrop-blur-xl">
                            <button
                                type="button"
                                onClick={() => {
                                    router.push('/operation');
                                    handleClosePopover();
                                }}
                                className="w-full py-1.5 px-3 text-xs font-medium text-slate-600 dark:text-slate-400 sm:hover:text-slate-900 sm:dark:hover:text-slate-100 sm:hover:bg-slate-100 sm:dark:hover:bg-slate-800 rounded-lg transition-colors"
                            >
                                View All Operations
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function NotificationItem({ notification, currency }: { notification: OperationNotification; currency: string }) {
    const { markAsRead } = useNotifications();
    
    const handleClick = () => {
        if (notification.isUnRead) {
            markAsRead(notification.id);
        }
    };

    const getOperationIcon = (operation: string) => {
        if (operation.toLowerCase().includes('addition')) {
            return { icon: 'solar:add-circle-outline', color: 'bg-emerald-500/90 dark:bg-emerald-600/90' };
        }
        if (operation.toLowerCase().includes('subtraction')) {
            return { icon: 'solar:minus-circle-outline', color: 'bg-orange-500/90 dark:bg-orange-600/90' };
        }
        if (operation.toLowerCase().includes('multiplication')) {
            return { icon: 'solar:close-circle-outline', color: 'bg-blue-500/90 dark:bg-blue-700/90' };
        }
        if (operation.toLowerCase().includes('division')) {
            return { icon: 'solar:divide-outline', color: 'bg-violet-500/90 dark:bg-violet-600/90' };
        }
        if (operation.toLowerCase().includes('square')) {
            return { icon: 'solar:calculator-outline', color: 'bg-indigo-500/90 dark:bg-indigo-600/90' };
        }
        if (operation.toLowerCase().includes('random')) {
            return { icon: 'solar:shuffle-bold', color: 'bg-purple-500/90 dark:bg-purple-400/90' };
        }
        return { icon: 'solar:calculator-minimalistic-outline', color: 'bg-blue-500/90 dark:bg-blue-400/90' };
    };

    const { icon, color } = getOperationIcon(notification.operation);
    
    const isUnread = Boolean(notification.isUnRead);
    const unreadStyles = isUnread 
        ? 'bg-blue-100/70 dark:bg-blue-900/20' 
        : '';

    return (
        <button
            type="button"
            onClick={handleClick}
            className={`w-full p-3 text-left sm:hover:bg-slate-50 sm:dark:hover:bg-slate-800/50 transition-colors ${unreadStyles}`}
        >
            <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center flex-shrink-0`}>
                    <Iconify icon={icon} width={16} sx={{ color: 'white' }} />
                </div>
                
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                            {notification.operation}
                        </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                            <span className="text-xs">{formatCurrencyWithSymbol(notification.amount, currency).currency}</span>
                            <span className="font-medium">{formatCurrencyWithSymbol(notification.amount, currency).value}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                            <span>{fToNow(notification.createdAt)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </button>
    );
}
