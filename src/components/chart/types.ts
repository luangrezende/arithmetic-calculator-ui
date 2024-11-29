import type { Props } from 'react-apexcharts';
import type { Theme, SxProps } from '@mui/material/styles';

export type ChartProps = {
    type: Props['type'];
    series: Props['series'];
    options: Props['options'];
    height?: number | string;
    width?: number | string;
    sx?: SxProps<Theme>;
};

export type ChartBaseProps = Props;

export type ChartOptions = Props['options'];

export type ChartLegendProps = {
    labels?: string[];
    colors?: string[];
    values?: string[];
    sublabels?: string[];
    icons?: React.ReactNode[];
};

export type ChartLoadingProps = {
    disabled?: boolean;
    sx?: SxProps<Theme>;
};
