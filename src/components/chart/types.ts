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

export type ChartOptions = Props['options'];
