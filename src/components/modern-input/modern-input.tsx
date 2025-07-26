import type { InputHTMLAttributes } from 'react';

import { forwardRef } from 'react';

import { cn } from 'src/utils/cn';

export interface ModernInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    rounded?: boolean;
    variant?: 'default' | 'filled' | 'ghost';
    inputSize?: 'sm' | 'md' | 'lg';
}

const ModernInput = forwardRef<HTMLInputElement, ModernInputProps>(
    ({ 
        className,
        label,
        error,
        rounded = false,
        variant = 'default',
        inputSize = 'md',
        id,
        ...props 
    }, ref) => {
        const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
        
        const baseClasses = [
            'w-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 border-0',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'placeholder-gray-400 dark:placeholder-gray-500'
        ];

        const sizeClasses = {
            sm: 'px-3 py-1.5 text-sm',
            md: 'px-3 py-2 text-base',
            lg: 'px-4 py-3 text-lg'
        };

        const variantClasses = {
            default: [
                'bg-white dark:bg-slate-800 focus:ring-primary-500 text-gray-900 dark:text-white',
                error ? 'focus:ring-red-500' : ''
            ],
            filled: [
                'bg-gray-50 dark:bg-slate-700 focus:bg-white dark:focus:bg-slate-800 focus:ring-primary-500 text-gray-900 dark:text-white',
                error ? 'focus:ring-red-500' : ''
            ],
            ghost: [
                'bg-transparent focus:bg-white dark:focus:bg-slate-800 focus:ring-primary-500 text-gray-900 dark:text-white',
                error ? 'focus:ring-red-500' : ''
            ]
        };

        const roundedClasses = rounded ? 'rounded-full' : 'rounded-md';

        return (
            <div className="space-y-1">
                {label && (
                    <label 
                        htmlFor={inputId}
                        className={cn(
                            'block text-sm font-medium',
                            error ? 'text-red-700 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'
                        )}
                    >
                        {label}
                    </label>
                )}
                
                <input
                    ref={ref}
                    id={inputId}
                    className={cn(
                        baseClasses,
                        sizeClasses[inputSize],
                        variantClasses[variant],
                        roundedClasses,
                        className
                    )}
                    {...props}
                />
                
                {error && (
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                )}
            </div>
        );
    }
);

ModernInput.displayName = 'ModernInput';

export default ModernInput;
