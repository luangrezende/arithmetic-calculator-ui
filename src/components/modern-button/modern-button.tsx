import type { ButtonHTMLAttributes } from 'react';

import { forwardRef } from 'react';

import { cn } from 'src/utils/cn';

export interface ModernButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    glow?: boolean;
    rounded?: boolean;
    fullWidth?: boolean;
    loading?: boolean;
}

const ModernButton = forwardRef<HTMLButtonElement, ModernButtonProps>(
    ({ 
        className, 
        variant = 'primary', 
        size = 'md', 
        glow = false,
        rounded = false,
        fullWidth = false,
        loading = false,
        disabled,
        children,
        ...props 
    }, ref) => {
        
        const baseClasses = [
            'inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out',
            'focus:outline-none focus:ring-0 active:outline-none active:ring-0 select-none',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
            !disabled && 'sm:hover:shadow-md sm:hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm'
        ];

        const sizeClasses = {
            sm: 'px-3 py-2 text-sm h-10 xl:px-4 xl:py-2 xl:text-base xl:h-12',
            md: 'px-4 py-2 text-base h-12 xl:px-6 xl:py-3 xl:text-lg xl:h-14',
            lg: 'px-6 py-3 text-lg h-14 xl:px-8 xl:py-4 xl:text-xl xl:h-16'
        };

        const variantClasses = {
            primary: [
                'bg-primary-600 sm:hover:bg-primary-700 active:bg-primary-800',
                'dark:bg-primary-500 sm:dark:hover:bg-primary-600 dark:active:bg-primary-700',
                'text-white dark:text-white',
                'shadow-button sm:hover:shadow-button-hover',
                'border border-transparent'
            ],
            secondary: [
                'bg-slate-100 sm:hover:bg-slate-200 active:bg-slate-300',
                'dark:bg-slate-700 sm:dark:hover:bg-slate-600 dark:active:bg-slate-500',
                'text-slate-900 sm:hover:text-slate-900 dark:text-slate-100 sm:dark:hover:text-slate-50',
                'shadow-sm sm:hover:shadow-button',
                'border border-transparent'
            ],
            outline: [
                'bg-transparent sm:hover:bg-primary-50 active:bg-primary-100',
                'dark:bg-transparent sm:dark:hover:bg-primary-900/20 dark:active:bg-primary-900/30',
                'text-primary-600 sm:hover:text-primary-700 active:text-primary-800',
                'dark:text-primary-400 sm:dark:hover:text-primary-300 dark:active:text-primary-200',
                'border-2 border-primary-600 sm:hover:border-primary-700 dark:border-primary-400 sm:dark:hover:border-primary-300',
                'shadow-sm sm:hover:shadow-button'
            ],
            ghost: [
                'bg-transparent sm:hover:bg-slate-100 active:bg-slate-200',
                'dark:bg-transparent sm:dark:hover:bg-slate-800 dark:active:bg-slate-700',
                'text-slate-700 sm:hover:text-slate-900 active:text-slate-900',
                'dark:text-slate-300 sm:dark:hover:text-slate-100 dark:active:text-slate-50',
                'border border-transparent'
            ]
        };

        const roundedClasses = rounded ? 'rounded-full' : 'rounded-lg';
        const widthClasses = fullWidth ? 'w-full' : '';
        const glowClasses = glow && !disabled ? 'shadow-primary-glow' : '';

        return (
            <button
                ref={ref}
                type="button"
                className={cn(
                    baseClasses,
                    sizeClasses[size],
                    variantClasses[variant],
                    roundedClasses,
                    widthClasses,
                    glowClasses,
                    className
                )}
                disabled={disabled || loading}
                {...props}
            >
                {loading && (
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
                )}
                {children}
            </button>
        );
    }
);

ModernButton.displayName = 'ModernButton';

export default ModernButton;
