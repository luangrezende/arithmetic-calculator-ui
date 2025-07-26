import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import { CONFIG } from 'src/config-global';

import { ModernCard } from 'src/components/modern-card';
import { ModernButton } from 'src/components/modern-button';

export default function NotFoundPage() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <>
            <Helmet>
                <title>404 - Page Not Found | {CONFIG.appName}</title>
            </Helmet>

            <div className="min-h-screen flex items-center justify-center bg-blue-50 dark:bg-blue-900 p-3">
                <ModernCard
                    className="max-w-lg text-center p-8"
                >
                    <div className="mb-4 text-8xl md:text-9xl font-bold text-primary-500 dark:text-primary-400 leading-none">
                        404
                    </div>

                    <h1 className="text-2xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-2">
                        Page Not Found
                    </h1>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved. 
                        Don&apos;t worry, let&apos;s get you back on track.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        <ModernButton
                            variant="primary"
                            onClick={handleGoHome}
                            className="min-w-36"
                        >
                            Go to Home
                        </ModernButton>

                        <ModernButton
                            variant="outline"
                            onClick={handleGoBack}
                            className="min-w-36"
                        >
                            Go Back
                        </ModernButton>
                    </div>
                </ModernCard>
            </div>
        </>
    );
}
