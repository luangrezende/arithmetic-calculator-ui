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
        : 'pt-8 sm:pt-6 lg:pt-8 xl:pt-10 pb-16 sm:pb-20 lg:pb-[--layout-dashboard-content-pb] px-3 sm:px-6 lg:px-8 xl:px-10';

    return (
        <div
            className={`${layoutClasses.content} ${maxWidthClass} mx-auto flex flex-1 flex-col w-full ${paddingClass} ${className || ''}`}
        >
            {children}
        </div>
    );
}
