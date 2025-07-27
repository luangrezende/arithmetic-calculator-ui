import { useNavigate } from 'react-router-dom';

import { ModernButton } from 'src/components/modern-button';

export function NotFoundView() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
            <div className="max-w-md w-full text-center space-y-8">
                <div className="space-y-4">
                    <div className="w-24 h-24 mx-auto bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                        <svg
                            className="w-12 h-12 text-blue-600 dark:text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                            Page Not Found
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                            The page you&apos;re looking for doesn&apos;t exist.
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <ModernButton
                        onClick={handleGoHome}
                        variant="primary"
                        size="md"
                        className="w-full"
                    >
                        Go to Home
                    </ModernButton>

                    <ModernButton
                        onClick={handleGoBack}
                        variant="outline"
                        size="md"
                        className="w-full"
                    >
                        Go Back
                    </ModernButton>

                    <p className="text-xs text-slate-500 dark:text-slate-500">
                        You can navigate back or return to the homepage
                    </p>
                </div>
            </div>
        </div>
    );
}
