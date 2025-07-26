import type { ReactNode } from 'react';
import { Logo } from 'src/components/logo';

export type AuthLayoutProps = {
    children: ReactNode;
    className?: string;
};

export function AuthLayout({ children, className }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Logo />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
                <div 
                    className={`min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 ${className || ''}`}
                    style={{
                        backgroundImage: `url(/assets/background/overlay.jpg)`
                    }}
                >
                    <div className="bg-white/95 rounded-2xl p-8 w-full max-w-md">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
