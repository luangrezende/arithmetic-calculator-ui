export function FallbackLoader() {
    return (
        <div className="flex items-center justify-center flex-1">
            <div className="w-full max-w-80 h-1 bg-black/16 dark:bg-white/16 rounded-full overflow-hidden">
                <div className="h-full bg-slate-900 dark:bg-slate-100 rounded-full animate-pulse w-1/3" />
            </div>
        </div>
    );
}
