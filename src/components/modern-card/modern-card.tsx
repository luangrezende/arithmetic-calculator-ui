import type { HTMLAttributes } from 'react';

import { forwardRef } from 'react';

import { cn } from 'src/utils/cn';

export interface ModernCardProps extends HTMLAttributes<HTMLDivElement> {
    hoverable?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const ModernCard = forwardRef<HTMLDivElement, ModernCardProps>(
    ({ 
        className, 
        hoverable = false, 
        padding = 'md',
        children, 
        ...props 
    }, ref) => {
        
        const baseClasses = [
            'bg-white rounded-xl shadow-sm transition-all duration-200 border-0',
            'dark:bg-slate-700'
        ];

        const paddingClasses = {
            none: '',
            sm: 'p-3 xl:p-4',
            md: 'p-4 xl:p-6',
            lg: 'p-6 xl:p-8',
            xl: 'p-8 xl:p-10'
        };

        const hoverClasses = hoverable ? [
            'sm:hover:shadow-lg sm:hover:-translate-y-1 cursor-pointer',
        ] : [];

        return (
            <div
                ref={ref}
                className={cn(
                    baseClasses,
                    paddingClasses[padding],
                    hoverClasses,
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

ModernCard.displayName = 'ModernCard';

export default ModernCard;
