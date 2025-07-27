import { SvgColor } from 'src/components/svg-color';
import { Iconify } from 'src/components/iconify';

const icon = (name: string) => (
    <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

const iconifyIcon = (iconName: string) => (
    <Iconify icon={iconName} width="100%" />
);

export const navData = [
    {
        title: 'Dashboard',
        path: '/',
        icon: iconifyIcon('solar:user-bold'),
    },
    {
        title: 'Operations',
        path: '/operation',
        icon: icon('ic-analytics'),
    },
];
