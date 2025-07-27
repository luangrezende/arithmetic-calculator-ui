import type { Theme, SxProps } from '@mui/material/styles';

export type NavItem = {
    path: string;
    title: string;
    icon: React.ReactNode;
    info?: React.ReactNode;
};

export type NavContentProps = {
    data: NavItem[];
    slots?: {
        topArea?: React.ReactNode;
        bottomArea?: React.ReactNode;
    };
    sx?: SxProps<Theme>;
};

export type NavDesktopProps = NavContentProps;

export type NavMobileProps = {
    data: NavItem[];
    slots?: {
        topArea?: React.ReactNode;
        bottomArea?: React.ReactNode;
    };
    open: boolean;
    onClose: () => void;
};
