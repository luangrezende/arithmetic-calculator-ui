import { useNavigate } from 'react-router-dom';

import { ModernButton } from 'src/components/modern-button';

function SessionExpiredPage() {
    const navigate = useNavigate();

    const handleBackToLogin = () => {
        navigate('/sign-in', { replace: true });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
            <div className="max-w-md w-full text-center space-y-8">
                <div className="space-y-4">
                    <div className="w-24 h-24 mx-auto bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center">
                        <svg
                            className="w-12 h-12 text-amber-600 dark:text-amber-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 18.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                        </svg>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                            Session Expired
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                            Your session has expired for security reasons. 
                            Please sign in again to continue.
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <ModernButton
                        onClick={handleBackToLogin}
                        variant="primary"
                        size="md"
                        className="w-full"
                    >
                        Back to Sign In
                    </ModernButton>

                    <p className="text-xs text-slate-500 dark:text-slate-500">
                        You will be automatically redirected to the sign in page
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SessionExpiredPage;
