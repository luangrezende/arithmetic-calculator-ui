import { useBalance } from 'src/context/balance-context';

interface CurrencyFormatOptions {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    showSymbol?: boolean;
}

export const useCurrency = () => {
    const { currency } = useBalance();
    
    const formatCurrency = (
        value: number | string | null | undefined,
        options: CurrencyFormatOptions = {}
    ): string => {
        const {
            minimumFractionDigits = 0,
            maximumFractionDigits = 2,
            showSymbol = true
        } = options;

        if (value == null || Number.isNaN(value)) return '';
        
        const numericValue = typeof value === 'string' ? parseFloat(value) : value;
        const currentCurrency = currency || 'USD';
        
        if (showSymbol) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currentCurrency,
                minimumFractionDigits,
                maximumFractionDigits,
            }).format(numericValue);
        }
        
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits,
            maximumFractionDigits,
        }).format(numericValue);
    };

    const getCurrencySymbol = (): string => {
        const currentCurrency = currency || 'USD';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currentCurrency,
            currencyDisplay: 'symbol',
        }).formatToParts(0).find(part => part.type === 'currency')?.value || '$';
    };

    return {
        currency: currency || 'USD',
        formatCurrency,
        getCurrencySymbol,
    };
};
