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
            'w-full transition-all duration-200 focus:outline-none focus:ring-2',
            'disabled:opacity-50 disabled:cursor-not-allowed'
        ];

        const sizeClasses = {
            sm: 'px-3 py-1.5 text-sm',
            md: 'px-3 py-2 text-base',
            lg: 'px-4 py-3 text-lg'
        };

        const variantClasses = {
            default: [
                'bg-white focus:ring-primary-500',
                error ? 'focus:ring-red-500' : ''
            ],
            filled: [
                'bg-gray-50 focus:bg-white focus:ring-primary-500',
                error ? 'focus:ring-red-500' : ''
            ],
            ghost: [
                'bg-transparent focus:bg-white focus:ring-primary-500',
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
                            error ? 'text-red-700' : 'text-gray-700'
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
                    <p className="text-sm text-red-600">{error}</p>
                )}
            </div>
        );
    }
);

ModernInput.displayName = 'ModernInput';

export default ModernInput;
