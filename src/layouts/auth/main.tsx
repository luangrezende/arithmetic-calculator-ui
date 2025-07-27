import { layoutClasses } from 'src/layouts/classes';

interface MainProps {
    children: React.ReactNode;
    className?: string;
    layoutQuery: 'sm' | 'md' | 'lg' | 'xl';
}

export function Main({ children, className, layoutQuery }: MainProps) {
    const queryClass = {
        sm: 'sm:justify-center sm:px-0 sm:py-10',
        md: 'md:justify-center md:px-0 md:py-10', 
        lg: 'lg:justify-center lg:px-0 lg:py-10',
        xl: 'xl:justify-center xl:px-0 xl:py-10',
    }[layoutQuery];

    const renderContent = (
        <div className="py-10 px-6 w-full rounded-xl flex flex-col bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm max-w-md">
            {children}
        </div>
    );

    return (
        <main
            className={`${layoutClasses.main} flex flex-1 items-center flex-col px-3 sm:px-6 lg:px-8 xl:px-10 py-6 pb-20 ${queryClass} ${className}`}
        >
            {renderContent}
        </main>
    );
}
