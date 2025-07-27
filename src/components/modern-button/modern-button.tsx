import type { ButtonHTMLAttributes } from 'react';

import { forwardRef } from 'react';

import { cn } from 'src/utils/cn';

export interface ModernButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
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
            sm: 'px-2 py-1.5 text-xs h-8 xl:px-3 xl:py-2 xl:text-sm xl:h-9',
            md: 'px-3 py-2 text-sm h-9 xl:px-4 xl:py-2.5 xl:text-base xl:h-10',
            lg: 'px-4 py-2.5 text-base h-10 xl:px-5 xl:py-3 xl:text-lg xl:h-11'
        };

        const variantClasses = {
            primary: [
                'bg-blue-600 sm:hover:bg-blue-700 active:bg-blue-800',
                'dark:bg-blue-500 sm:dark:hover:bg-blue-600 dark:active:bg-blue-700',
                'text-white dark:text-white',
                'shadow-sm sm:hover:shadow-md'
            ],
            secondary: [
                'bg-slate-100 sm:hover:bg-slate-200 active:bg-slate-300',
                'dark:bg-slate-700 sm:dark:hover:bg-slate-600 dark:active:bg-slate-500',
                'text-slate-900 dark:text-slate-100',
                'shadow-sm sm:hover:shadow-md'
            ],
            outline: [
                'bg-transparent sm:hover:bg-blue-50 active:bg-blue-100',
                'dark:bg-transparent sm:dark:hover:bg-blue-900/20 dark:active:bg-blue-900/30',
                'text-blue-600 sm:hover:text-blue-700 active:text-blue-800',
                'dark:text-blue-400 sm:dark:hover:text-blue-300 dark:active:text-blue-200',
                'shadow-sm sm:hover:shadow-md'
            ],
            ghost: [
                'bg-transparent sm:hover:bg-slate-100 active:bg-slate-200',
                'dark:bg-transparent sm:dark:hover:bg-slate-800 dark:active:bg-slate-700',
                'text-slate-700 sm:hover:text-slate-900 active:text-slate-900',
                'dark:text-slate-300 sm:dark:hover:text-slate-100 dark:active:text-slate-50'
            ],
            danger: [
                'bg-red-600 sm:hover:bg-red-700 active:bg-red-800',
                'dark:bg-red-500 sm:dark:hover:bg-red-600 dark:active:bg-red-700',
                'text-white dark:text-white',
                'shadow-sm sm:hover:shadow-md'
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
