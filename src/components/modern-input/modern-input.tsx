import type { InputHTMLAttributes } from 'react';

import { forwardRef } from 'react';

import { cn } from 'src/utils/cn';

export interface ModernInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    rounded?: boolean;
    variant?: 'default' | 'filled' | 'ghost' | 'search';
    inputSize?: 'sm' | 'md' | 'lg';
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    onStartIconClick?: () => void;
    onEndIconClick?: () => void;
}

const ModernInput = forwardRef<HTMLInputElement, ModernInputProps>(
    ({ 
        className,
        label,
        error,
        rounded = false,
        variant = 'default',
        inputSize = 'md',
        startIcon,
        endIcon,
        onStartIconClick,
        onEndIconClick,
        id,
        ...props 
    }, ref) => {
        const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
        
        const baseClasses = [
            'w-full transition-all duration-200 border-0 outline-none focus:ring-0',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'placeholder-gray-400 dark:placeholder-gray-500'
        ];

        const sizeClasses = {
            sm: 'py-2 text-sm h-10 xl:py-2 xl:text-base xl:h-12',
            md: 'py-2 text-base h-12 xl:py-3 xl:text-lg xl:h-14',
            lg: 'py-3 text-lg h-14 xl:py-4 xl:text-xl xl:h-16'
        };

        const paddingClasses = {
            sm: startIcon ? (endIcon ? 'px-10 xl:px-12' : 'pl-10 pr-3 xl:pl-12 xl:pr-4') : (endIcon ? 'pl-3 pr-10 xl:pl-4 xl:pr-12' : 'px-3 xl:px-4'),
            md: startIcon ? (endIcon ? 'px-12 xl:px-14' : 'pl-12 pr-4 xl:pl-14 xl:pr-6') : (endIcon ? 'pl-4 pr-12 xl:pl-6 xl:pr-14' : 'px-4 xl:px-6'),
            lg: startIcon ? (endIcon ? 'px-14 xl:px-16' : 'pl-14 pr-6 xl:pl-16 xl:pr-8') : (endIcon ? 'pl-6 pr-14 xl:pl-8 xl:pr-16' : 'px-6 xl:px-8')
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
            ],
            search: [
                'bg-slate-200 dark:bg-slate-600 text-gray-900 dark:text-white focus:bg-slate-100 dark:focus:bg-slate-500'
            ]
        };

        const roundedClasses = rounded ? 'rounded-full' : 'rounded-lg';

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
                
                <div className="relative">
                    {startIcon && (
                        <div 
                            className={cn(
                                'absolute inset-y-0 left-0 flex items-center pointer-events-none',
                                inputSize === 'sm' ? 'pl-3 xl:pl-4' : 
                                inputSize === 'md' ? 'pl-4 xl:pl-6' : 'pl-6 xl:pl-8',
                                onStartIconClick && 'pointer-events-auto cursor-pointer'
                            )}
                            {...(onStartIconClick && {
                                onClick: onStartIconClick,
                                onKeyDown: (e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        onStartIconClick();
                                    }
                                },
                                role: 'button',
                                tabIndex: 0,
                                'aria-label': 'Icon action'
                            })}
                        >
                            {startIcon}
                        </div>
                    )}
                    
                    <input
                        ref={ref}
                        id={inputId}
                        className={cn(
                            baseClasses,
                            sizeClasses[inputSize],
                            paddingClasses[inputSize],
                            variantClasses[variant],
                            roundedClasses,
                            className
                        )}
                        {...props}
                    />
                    
                    {endIcon && (
                        <div 
                            className={cn(
                                'absolute inset-y-0 right-0 flex items-center pointer-events-none',
                                inputSize === 'sm' ? 'pr-3 xl:pr-4' : 
                                inputSize === 'md' ? 'pr-4 xl:pr-6' : 'pr-6 xl:pr-8',
                                onEndIconClick && 'pointer-events-auto cursor-pointer'
                            )}
                            {...(onEndIconClick && {
                                onClick: onEndIconClick,
                                onKeyDown: (e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        onEndIconClick();
                                    }
                                },
                                role: 'button',
                                tabIndex: 0,
                                'aria-label': 'Icon action'
                            })}
                        >
                            {endIcon}
                        </div>
                    )}
                </div>
                
                {error && (
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                )}
            </div>
        );
    }
);

ModernInput.displayName = 'ModernInput';

export default ModernInput;
