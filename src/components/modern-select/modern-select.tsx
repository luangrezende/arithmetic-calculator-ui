import type { SelectHTMLAttributes } from 'react';

import { forwardRef } from 'react';

import { cn } from 'src/utils/cn';

export interface ModernSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    rounded?: boolean;
    variant?: 'default' | 'filled' | 'ghost';
    inputSize?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

const ModernSelect = forwardRef<HTMLSelectElement, ModernSelectProps>(
    ({ 
        className,
        label,
        error,
        rounded = false,
        variant = 'default',
        inputSize = 'md',
        id,
        children,
        ...props 
    }, ref) => {
        const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
        
        const baseClasses = [
            'w-full transition-all duration-200 border-0 outline-none focus:ring-0',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'appearance-none cursor-pointer'
        ];

        const sizeClasses = {
            sm: 'py-2 text-sm h-10 xl:py-2 xl:text-base xl:h-12',
            md: 'py-2 text-base h-12 xl:py-3 xl:text-lg xl:h-14',
            lg: 'py-3 text-lg h-14 xl:py-4 xl:text-xl xl:h-16'
        };

        const paddingClasses = {
            sm: 'px-3 xl:px-4 pr-8 xl:pr-10',
            md: 'px-4 xl:px-6 pr-10 xl:pr-12',
            lg: 'px-6 xl:px-8 pr-12 xl:pr-14'
        };

        const variantClasses = {
            default: [
                'bg-slate-100 dark:bg-slate-600 text-gray-900 dark:text-white'
            ],
            filled: [
                'bg-slate-100 dark:bg-slate-700 focus:bg-white dark:focus:bg-slate-800 text-gray-900 dark:text-white'
            ],
            ghost: [
                'bg-transparent focus:bg-slate-100 dark:focus:bg-slate-800 text-gray-900 dark:text-white'
            ]
        };

        const roundedClasses = rounded ? 'rounded-full' : 'rounded-lg';

        return (
            <div className="space-y-1">
                {label && (
                    <label 
                        htmlFor={selectId}
                        className={cn(
                            'block text-sm font-medium',
                            error ? 'text-red-700 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'
                        )}
                    >
                        {label}
                    </label>
                )}
                
                <div className="relative">
                    <select
                        ref={ref}
                        id={selectId}
                        className={cn(
                            baseClasses,
                            sizeClasses[inputSize],
                            paddingClasses[inputSize],
                            variantClasses[variant],
                            roundedClasses,
                            className
                        )}
                        {...props}
                    >
                        {children}
                    </select>
                    
                    {/* Dropdown arrow icon */}
                    <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3 xl:pr-4">
                        <svg 
                            className="w-4 h-4 xl:w-5 xl:h-5 text-gray-400 dark:text-gray-500" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                {error && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

ModernSelect.displayName = 'ModernSelect';

export { ModernSelect };
