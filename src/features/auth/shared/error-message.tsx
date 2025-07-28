export interface ErrorMessageProps {
    message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
    return (
        <div className="mb-3">
            <div className="bg-red-50/70 dark:bg-red-900/15 border border-red-200/60 dark:border-red-800/30 rounded-md px-3 py-2 shadow-sm">
                <div className="flex items-center space-x-2">
                    <div className="flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-red-500 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <p className="text-xs font-medium text-red-600 dark:text-red-300">{message}</p>
                </div>
            </div>
        </div>
    );
}
