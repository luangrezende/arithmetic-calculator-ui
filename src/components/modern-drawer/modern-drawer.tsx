import type { ReactNode} from 'react';

import { useEffect } from 'react';
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
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [open, onClose]);

    return createPortal(
        <>
            {/* Backdrop */}
            <div
                className={`
                    fixed inset-0 bg-black/50 dark:bg-black/70 z-[1200] 
                    transition-all duration-300 ease-out
                    ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}
                `}
                onClick={onClose}
                role="presentation"
            />
            
            {/* Drawer */}
            <div
                className={`
                    fixed top-0 left-0 h-full w-72
                    z-[1300] transform transition-all duration-300 ease-out
                    pt-6 px-4 overflow-y-auto overflow-x-hidden
                    bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                    ${open ? 'translate-x-0' : '-translate-x-full'}
                    ${className}
                `}
                role="dialog"
                aria-modal="true"
            >
                <div className={`
                    transition-all duration-300 ease-out delay-100
                    ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                `}>
                    {children}
                </div>
            </div>
        </>,
        document.body
    );
}
