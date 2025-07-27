import { layoutClasses } from '../classes';

interface MainProps {
    children: React.ReactNode;
    className?: string;
}

interface CompactContentProps {
    children: React.ReactNode;
    className?: string;
    layoutQuery: 'sm' | 'md' | 'lg' | 'xl';
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

export function CompactContent({
    children,
    className,
    layoutQuery,
}: CompactContentProps) {
    const queryClass = {
        sm: 'sm:justify-center sm:p-0 sm:py-10',
        md: 'md:justify-center md:p-0 md:py-10',
        lg: 'lg:justify-center lg:p-0 lg:py-10',
        xl: 'xl:justify-center xl:p-0 xl:py-10',
    }[layoutQuery];

    return (
        <div
            className={`${layoutClasses.content} w-full mx-auto flex flex-1 text-center flex-col px-3 sm:px-6 lg:px-8 xl:px-10 py-6 pb-20 max-w-md ${queryClass} ${className}`}
        >
            {children}
        </div>
    );
}
