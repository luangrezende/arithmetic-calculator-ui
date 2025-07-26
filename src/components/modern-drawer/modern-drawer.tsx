import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

export interface ModernDrawerProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    className?: string;
}

export function ModernDrawer({ open, onClose, children, className = '' }: ModernDrawerProps) {
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && open) {
                onClose();
            }
        };

        if (open) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [open, onClose]);

    if (!open) return null;

    return createPortal(
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 dark:bg-black/70 z-[1200] transition-opacity duration-300"
                onClick={onClose}
                role="presentation"
            />
            
            {/* Drawer */}
            <div
                className={`
                    fixed top-0 left-0 h-full w-80
                    z-[1300] transform transition-transform duration-300 ease-out
                    pt-10 px-10 overflow-y-auto overflow-x-hidden
                    bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                    ${className}
                `}
                role="dialog"
                aria-modal="true"
            >
                {children}
            </div>
        </>,
        document.body
    );
}
