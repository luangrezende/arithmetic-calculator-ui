import type { ChartOptions } from 'src/components/chart';

import { fNumber, fPercent, formatLargeNumber } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';
import { Chart, useChart } from 'src/components/chart';
import { ModernCard } from 'src/components/modern-card';

type ColorType = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

type Props = {
    title: string;
    total: number;
    isCurrency?: boolean;
    percent: number;
    color?: ColorType;
    icon: React.ReactNode;
    chart: {
        series: number[];
        categories: string[];
        options?: ChartOptions;
    };
    className?: string;
};

export function AnalyticsWidgetSummary({
    icon,
    title,
    total,
    isCurrency,
    chart,
    percent,
    color = 'primary',
    className,
}: Props) {
    const chartColors = ['#1e40af'];

    const chartOptions = useChart({
        chart: { sparkline: { enabled: true } },
        colors: chartColors,
        xaxis: { categories: chart.categories },
        grid: {
            padding: {
                top: 6,
                left: 6,
                right: 6,
                bottom: 6,
            },
        },
        tooltip: {
            y: { formatter: (value: number) => fNumber(value), title: { formatter: () => '' } },
        },
        ...chart.options,
    });

    const renderTrending = (
        <div className="absolute top-4 right-4 flex items-center gap-2">
            <Iconify
                width={20}
                icon={percent < 0 ? 'eva:trending-down-fill' : 'eva:trending-up-fill'}
                sx={{ color: percent < 0 ? 'error.main' : 'success.main' }}
            />
            <span className="text-sm font-semibold">
                {percent > 0 && '+'}
                {fPercent(percent)}
            </span>
        </div>
    );

    return (
        <ModernCard 
            className={`relative p-6 ${className}`}
            hoverable
        >
            <div className="w-12 h-12 mb-6">{icon}</div>

            {renderTrending}

            <div className="flex flex-wrap items-end justify-end">
                <div className="flex-grow min-w-28">
                    <div className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">{title}</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {isCurrency ? `$${formatLargeNumber(total)}` : formatLargeNumber(total)}
                    </div>
                </div>

                <Chart
                    type="line"
                    series={[{ data: chart.series }]}
                    options={chartOptions}
                    width={84}
                    height={56}
                />
            </div>

            <SvgColor
                src="/assets/background/shape-square.svg"
                className="absolute top-0 -left-5 w-60 h-60 opacity-10 text-blue-500 -z-10"
            />
        </ModernCard>
    );
}
