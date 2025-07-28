import { useRef, useState, useEffect, useCallback } from 'react';

import { formatCurrencyWithSymbol } from 'src/utils/format-number';

import { Tooltip } from 'src/components/tooltip';
import { ModernInput } from 'src/components/modern-input';
import { ModernButton } from 'src/components/modern-button';

interface BalancePopoverProps {
    balance?: number | null;
    isBalanceLoaded?: boolean;
    currency?: string;
    onAddCredit?: (amount: number) => void;
}

export function BalancePopover({ 
    balance, 
    isBalanceLoaded, 
    currency,
    onAddCredit 
}: BalancePopoverProps) {
    const [openPopover, setOpenPopover] = useState(false);
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    const isValidAmount = amount && parseFloat(amount) >= 5 && parseFloat(amount) <= 100;

    const handleOpenPopover = useCallback(() => {
        setOpenPopover(prev => !prev);
    }, []);

    const handleClosePopover = useCallback(() => {
        setOpenPopover(false);
    }, []);

    const handleAddCredit = useCallback(async () => {
        const numAmount = parseFloat(amount);
        if (numAmount > 0 && onAddCredit) {
            setLoading(true);
            try {
                await onAddCredit(numAmount);
                setAmount('');
                setOpenPopover(false);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    }, [amount, onAddCredit]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                handleClosePopover();
            }
        };

        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClosePopover();
            }
        };

        if (openPopover) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscapeKey);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [openPopover, handleClosePopover]);

    return (
        <div className="relative" ref={popoverRef}>
            <Tooltip content="Current Balance - Click to add credit" side="bottom" align="center">
                <button
                    type="button"
                    className="px-2 sm:px-3 h-9 sm:h-10 xl:h-11 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 backdrop-blur-sm shadow-sm transition-all duration-200 ease-out active:scale-95 sm:hover:scale-105 sm:hover:bg-emerald-100 sm:dark:hover:bg-emerald-900/50 sm:hover:shadow-md focus:outline-none focus:ring-0 active:outline-none active:ring-0 select-none"
                    onClick={handleOpenPopover}
                    disabled={!isBalanceLoaded}
                    aria-label="Add credit"
                >
                    {isBalanceLoaded ? (
                        <div className="text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-baseline">
                            <span className="text-xs mr-0.5 sm:mr-1">{formatCurrencyWithSymbol(balance?.toFixed(2).toString() || '0', currency || 'USD').currency}</span>
                            <span>{formatCurrencyWithSymbol(balance?.toFixed(2).toString() || '0', currency || 'USD').value}</span>
                        </div>
                    ) : (
                        <svg 
                            className="animate-spin h-3 w-3 sm:h-4 sm:w-4" 
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
                </button>
            </Tooltip>

            {openPopover && (
                <div 
                    className="absolute left-1/2 transform -translate-x-2/3 sm:left-auto sm:right-0 sm:transform-none top-full mt-2 w-80 max-w-[calc(100vw-1rem)] sm:max-w-[calc(100vw-2rem)] bg-white dark:bg-slate-800 backdrop-blur-xl backdrop-saturate-150 rounded-xl shadow-xl z-50 overflow-hidden balance-popover"
                    style={{ opacity: 0 }}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="balance-title"
                >
                    <div className="p-4 bg-slate-100/60 dark:bg-slate-700/60 backdrop-blur-xl">
                        <h3 id="balance-title" className="font-medium text-slate-900 dark:text-slate-100">
                            Add Credit
                        </h3>
                    </div>

                    <div className="p-4 space-y-4">
                        <ModernInput
                            label="Amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount to add"
                            min="5"
                            max="100"
                            step="0.01"
                            disabled={loading}
                            error={amount && !isValidAmount ? "Please enter an amount between $5 and $100" : undefined}
                        />
                        
                        <div className="flex gap-2">
                            <ModernButton
                                variant="outline"
                                size="sm"
                                onClick={handleClosePopover}
                                disabled={loading}
                                className="flex-1"
                            >
                                Cancel
                            </ModernButton>
                            
                            <ModernButton
                                variant="primary"
                                size="sm"
                                onClick={handleAddCredit}
                                disabled={loading || !isValidAmount}
                                loading={loading}
                                className="flex-1"
                            >
                                Add Credit
                            </ModernButton>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
