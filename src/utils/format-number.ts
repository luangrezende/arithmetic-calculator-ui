export type InputNumberValue = string | number | null | undefined;

type Options = Intl.NumberFormatOptions | undefined;

const DEFAULT_LOCALE = { code: 'en-US', currency: 'USD' };

function processInput(inputValue: InputNumberValue): number | null {
    if (inputValue == null || Number.isNaN(inputValue)) return null;
    return Number(inputValue);
}

export function fNumber(inputValue: InputNumberValue, options?: Options) {
    const locale = DEFAULT_LOCALE;

    const number = processInput(inputValue);
    if (number === null) return '';

    const fm = new Intl.NumberFormat(locale.code, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        ...options,
    }).format(number);

    return fm;
}

export function fCurrency(inputValue: InputNumberValue, options?: Options) {
    const locale = DEFAULT_LOCALE;

    const number = processInput(inputValue);
    if (number === null) return '';

    const fm = new Intl.NumberFormat(locale.code, {
        style: 'currency',
        currency: locale.currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        ...options,
    }).format(number);

    return fm;
}

export function fPercent(inputValue: InputNumberValue, options?: Options) {
    const locale = DEFAULT_LOCALE;

    const number = processInput(inputValue);
    if (number === null) return '';

    const fm = new Intl.NumberFormat(locale.code, {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 1,
        ...options,
    }).format(number / 100);

    return fm;
}

export function formatLargeNumber(inputValue: InputNumberValue, options?: Options) {
    const locale = DEFAULT_LOCALE;

    const number = processInput(inputValue);
    if (number === null) return '';

    const fm = new Intl.NumberFormat(locale.code, {
        notation: 'compact',
        maximumFractionDigits: 2,
        ...options,
    }).format(number);

    return fm.replace(/[A-Z]/g, (match) => match.toUpperCase());
}

export const parseAmount = (value: string): number | null => {
    const sanitizedValue = value.replace(/[^0-9.-]+/g, '');

    const parsedValue = parseFloat(sanitizedValue);

    return Number.isNaN(parsedValue) ? null : parsedValue;
};

export const formatCurrency = (value: string) => {
    const numericValue = value.replace(/[^\d]/g, '');
    const number = parseFloat(numericValue) / 100;
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(number || 0);
};
