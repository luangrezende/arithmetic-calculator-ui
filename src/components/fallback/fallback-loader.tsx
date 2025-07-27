export function FallbackLoader() {
    return (
        <div className="flex items-center justify-center min-h-96">
            <div className="w-full max-w-md mx-auto">
                <div className="bg-white dark:bg-slate-700 rounded-xl p-6">
                    <div className="text-center mb-4">
                        <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Loading...</div>
                    </div>
                    <div className="relative h-2 bg-slate-100 dark:bg-slate-600 rounded-full overflow-hidden">
                        <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-loading-bar" />
                    </div>
                </div>
            </div>
        </div>
    );
}
