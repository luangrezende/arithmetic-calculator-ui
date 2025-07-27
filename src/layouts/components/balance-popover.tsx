import { useState, useCallback, useEffect, useRef } from 'react';

import { formatCurrencyWithSymbol } from 'src/utils/format-number';

import { Tooltip } from 'src/components/tooltip';
import { Iconify } from 'src/components/iconify';
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
                    className="px-2 sm:px-3 h-9 sm:h-10 xl:h-11 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 backdrop-blur-sm shadow-sm transition-all duration-200 ease-out sm:hover:scale-105 active:scale-95 sm:hover:bg-emerald-100 sm:dark:hover:bg-emerald-900/50 sm:hover:shadow-md focus:outline-none focus:ring-0 active:outline-none active:ring-0 select-none"
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
                        <div className="w-3 h-3 sm:w-4 sm:h-4 border border-emerald-300/30 border-t-emerald-600 dark:border-emerald-400/30 dark:border-t-emerald-400 rounded-full animate-spin" />
                    )}
                </button>
            </Tooltip>

            {openPopover && (
                <div 
                    className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 w-72 max-w-[calc(100vw-2rem)] bg-white dark:bg-slate-800 backdrop-blur-xl backdrop-saturate-150 rounded-xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 z-50 overflow-hidden animate-in slide-in-from-top-2 fade-in-0 duration-200 ease-out"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="balance-title"
                >
                    <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-100/60 dark:bg-slate-700/60 backdrop-blur-xl">
                        <h3 id="balance-title" className="font-medium text-slate-900 dark:text-slate-100">
                            Add Credit
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Current balance: {formatCurrencyWithSymbol(balance?.toFixed(2).toString() || '0', currency || 'USD').currency} {formatCurrencyWithSymbol(balance?.toFixed(2).toString() || '0', currency || 'USD').value}
                        </p>
                    </div>

                    <div className="p-4 space-y-4">
                        <ModernInput
                            label="Amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount to add"
                            min="0"
                            step="0.01"
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
                                disabled={loading || !amount || parseFloat(amount) <= 0}
                                loading={loading}
                                className="flex-1"
                            >
                                {loading ? 'Adding...' : 'Add Credit'}
                            </ModernButton>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
