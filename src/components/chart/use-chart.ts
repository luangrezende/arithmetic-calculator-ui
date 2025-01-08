import { useTheme } from '@mui/material/styles';

import type { ChartOptions } from './types.js';

export function useChart(options?: ChartOptions): ChartOptions {
    const theme = useTheme();

    const responsiveOptions = [
        {
            breakpoint: theme.breakpoints.values.sm,
            options: {
                plotOptions: {
                    bar: {
                        borderRadius: 3,
                        columnWidth: '80%',
                    },
                },
            },
        },
        {
            breakpoint: theme.breakpoints.values.md,
            options: {
                plotOptions: {
                    bar: {
                        columnWidth: '60%',
                    },
                },
            },
        },
    ];

    return {
        ...options,
        chart: {
            toolbar: { show: false },
            zoom: { enabled: false },
            fontFamily: theme.typography.fontFamily,
            foreColor: theme.palette.text.disabled,
            ...options?.chart,
        },
        colors: options?.colors || [
            theme.palette.primary.main,
            theme.palette.warning.main,
            theme.palette.info.main,
            theme.palette.success.main,
            theme.palette.error.main,
        ],
        grid: {
            borderColor: theme.palette.divider,
            strokeDashArray: 3,
            ...options?.grid,
        },
        responsive: [...responsiveOptions, ...(options?.responsive || [])],
    };
}
