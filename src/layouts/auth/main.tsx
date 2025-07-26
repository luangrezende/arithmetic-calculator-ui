import { layoutClasses } from 'src/layouts/classes';

interface MainProps {
    children: React.ReactNode;
    className?: string;
    layoutQuery: 'sm' | 'md' | 'lg' | 'xl';
}

export function Main({ children, className, layoutQuery }: MainProps) {
    const queryClass = {
        sm: 'sm:justify-center sm:p-0 sm:py-10',
        md: 'md:justify-center md:p-0 md:py-10', 
        lg: 'lg:justify-center lg:p-0 lg:py-10',
        xl: 'xl:justify-center xl:p-0 xl:py-10',
    }[layoutQuery];

    const renderContent = (
        <div className="py-10 px-6 w-full rounded-xl flex flex-col bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm max-w-md">
            {children}
        </div>
    );

    return (
        <main
            className={`${layoutClasses.main} flex flex-1 items-center flex-col p-6 pb-20 ${queryClass} ${className}`}
        >
            {renderContent}
        </main>
    );
}
