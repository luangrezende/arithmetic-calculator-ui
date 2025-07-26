import type { ReactNode } from 'react';

import { createContext, useContext, useState, useCallback, useMemo } from 'react';

import { Iconify } from 'src/components/iconify';

type ToastType = 'success' | 'warning' | 'danger';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
    duration?: number;
}

interface ToastContextType {
    showToast: (message: string, type: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

const ToastIcon = ({ type }: { type: ToastType }) => {
    const icons = {
        success: { icon: 'eva:checkmark-circle-2-fill', color: 'text-emerald-500' },
        warning: { icon: 'eva:alert-triangle-fill', color: 'text-yellow-500' },
        danger: { icon: 'eva:close-circle-fill', color: 'text-red-500' },
    };

    const { icon, color } = icons[type];

    return <Iconify icon={icon} width={20} sx={{ color: color === 'text-emerald-500' ? '#10B981' : color === 'text-yellow-500' ? '#F59E0B' : '#EF4444' }} />;
};

const ToastItem = ({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) => {
    const bgColors = {
        success: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800',
        warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
        danger: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    };

    const textColors = {
        success: 'text-emerald-800 dark:text-emerald-200',
        warning: 'text-yellow-800 dark:text-yellow-200',
        danger: 'text-red-800 dark:text-red-200',
    };

    return (
        <div
            className={`
                flex items-start gap-3 p-4 rounded-lg border backdrop-blur-sm shadow-lg
                animate-in slide-in-from-right-full duration-300
                ${bgColors[toast.type]} ${textColors[toast.type]}
                min-w-80 max-w-96
            `}
        >
            <ToastIcon type={toast.type} />
            <div className="flex-1 text-sm font-medium">
                {toast.message}
            </div>
            <button
                type="button"
                onClick={() => onRemove(toast.id)}
                className="text-current opacity-60 hover:opacity-100 transition-opacity p-1"
            >
                <Iconify icon="eva:close-fill" width={16} sx={{ color: 'currentColor' }} />
            </button>
        </div>
    );
};

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const showToast = useCallback((message: string, type: ToastType, duration = 3000) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newToast: Toast = { id, message, type, duration };

        setToasts((prev) => {
            const updated = [...prev, newToast];
            return updated.slice(-2);
        });

        setTimeout(() => {
            removeToast(id);
        }, duration);
    }, [removeToast]);

    const contextValue = useMemo(() => ({ showToast }), [showToast]);

    return (
        <ToastContext.Provider value={contextValue}>
            {children}
            
            <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2">
                {toasts.map((toast) => (
                    <ToastItem
                        key={toast.id}
                        toast={toast}
                        onRemove={removeToast}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
}
