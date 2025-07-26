import type { ReactNode } from 'react';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export interface ModernDrawerProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    className?: string;
}

export function ModernDrawer({ open, onClose, children, className = '' }: ModernDrawerProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (open) {
            setIsVisible(true);
            setIsAnimating(true);
        } else if (isVisible) {
            setIsAnimating(false);
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 300);
            return () => clearTimeout(timer);
        }
        return undefined;
    }, [open, isVisible]);

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

    if (!isVisible) return null;

    return createPortal(
        <>
            <div
                className={`
                    fixed inset-0 bg-black/50 dark:bg-black/70 z-[1200] 
                    transition-opacity duration-300 ease-out
                    ${isAnimating ? 'opacity-100' : 'opacity-0'}
                `}
                onClick={onClose}
                role="presentation"
            />
            
            <div
                className={`
                    fixed top-0 left-0 h-full w-72
                    z-[1300] overflow-y-auto overflow-x-hidden
                    pt-6 px-4
                    bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                    transform transition-transform duration-300 ease-out
                    ${isAnimating ? 'translate-x-0' : '-translate-x-full'}
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
