import type { ReactNode } from 'react';

import { useEffect } from 'react';

export type AuthLayoutProps = {
    children: ReactNode;
    className?: string;
};

export function AuthLayout({ children, className }: AuthLayoutProps) {
    useEffect(() => {
        document.documentElement.classList.remove('dark');
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="min-h-screen">
                <div 
                    className={`min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 ${className || ''}`}
                    style={{
                        backgroundImage: `url(/assets/background/overlay.jpg)`
                    }}
                >
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md shadow-xl">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
