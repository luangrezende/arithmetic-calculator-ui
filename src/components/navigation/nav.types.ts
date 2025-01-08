import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

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

export type NavDesktopProps = NavContentProps & { layoutQuery: Breakpoint };

export type NavMobileProps = NavContentProps & { open: boolean; onClose: () => void };
