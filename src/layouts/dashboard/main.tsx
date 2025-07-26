import { layoutClasses } from 'src/layouts/classes';

interface MainProps {
    children: React.ReactNode;
    className?: string;
}

interface DashboardContentProps {
    children: React.ReactNode;
    className?: string;
    disablePadding?: boolean;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | false;
}

export function Main({ children, className }: MainProps) {
    return (
        <main
            className={`${layoutClasses.main} flex flex-1 flex-col ${className}`}
        >
            {children}
        </main>
    );
}

export function DashboardContent({
    children,
    className,
    disablePadding,
    maxWidth = 'xl',
}: DashboardContentProps) {
    const maxWidthClass = maxWidth ? {
        sm: 'max-w-3xl',
        md: 'max-w-5xl',
        lg: 'max-w-7xl',
        xl: 'max-w-screen-xl',
    }[maxWidth] : '';

    const paddingClass = disablePadding 
        ? 'p-0' 
        : 'pt-8 pb-[--layout-dashboard-content-pb] lg:px-[--layout-dashboard-content-px]';

    return (
        <div
            className={`${layoutClasses.content} ${maxWidthClass} mx-auto flex flex-1 flex-col w-full ${paddingClass} ${className || ''}`}
        >
            {children}
        </div>
    );
}
