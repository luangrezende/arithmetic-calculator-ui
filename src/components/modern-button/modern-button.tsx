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
            'inline-flex items-center justify-center font-semibold transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
            !disabled && 'hover:-translate-y-0.5 active:translate-y-0'
        ];

        const sizeClasses = {
            sm: 'px-3 py-1.5 text-sm min-h-9',
            md: 'px-4 py-2 text-base min-h-12',
            lg: 'px-6 py-3 text-lg min-h-14'
        };

        const variantClasses = {
            primary: [
                'bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600',
                'text-white shadow-button hover:shadow-button-hover focus:ring-primary-500'
            ],
            secondary: [
                'bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100',
                'shadow-sm hover:shadow-button focus:ring-gray-500'
            ],
            outline: [
                'text-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-900/20',
                'hover:text-primary-700 dark:hover:text-primary-300 focus:ring-primary-500'
            ],
            ghost: [
                'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100',
                'focus:ring-gray-500'
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
