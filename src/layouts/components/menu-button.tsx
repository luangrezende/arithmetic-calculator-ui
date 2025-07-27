import type { ButtonHTMLAttributes } from 'react';

import { Tooltip } from 'src/components/tooltip';

export interface MenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

export function MenuButton({ className = '', onClick, ...other }: MenuButtonProps) {
    return (
        <Tooltip content="Open navigation menu">
            <button
                type="button"
                className={`
                    inline-flex items-center justify-center 
                    w-10 h-10 xl:w-11 xl:h-11 rounded-full 
                    bg-slate-100/95 dark:bg-slate-800/95 backdrop-blur-sm
                    shadow-sm text-gray-600 dark:text-gray-300
                    sm:hover:bg-slate-200 sm:dark:hover:bg-slate-800 sm:hover:shadow-md
                    focus:outline-none focus:ring-0 active:outline-none active:ring-0 select-none
                    transition-all duration-200 ease-out sm:hover:scale-105 active:scale-95
                    ${className}
                `}
                onClick={onClick}
                {...other}
            >
                <svg 
                    className="w-5 h-5 xl:w-5 xl:h-5 transition-transform duration-200" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path
                        opacity="0.32"
                        d="M15.7798 4.5H5.2202C4.27169 4.5 3.5 5.06057 3.5 5.75042C3.5 6.43943 4.27169 7 5.2202 7H15.7798C16.7283 7 17.5 6.43943 17.5 5.75042C17.5 5.06054 16.7283 4.5 15.7798 4.5Z"
                    />
                    <path
                        d="M18.7798 10.75H8.2202C7.27169 10.75 6.5 11.3106 6.5 12.0004C6.5 12.6894 7.27169 13.25 8.2202 13.25H18.7798C19.7283 13.25 20.5 12.6894 20.5 12.0004C20.5 11.3105 19.7283 10.75 18.7798 10.75Z"
                    />
                    <path
                        d="M15.7798 17H5.2202C4.27169 17 3.5 17.5606 3.5 18.2504C3.5 18.9394 4.27169 19.5 5.2202 19.5H15.7798C16.7283 19.5 17.5 18.9394 17.5 18.2504C17.5 17.5606 16.7283 17 15.7798 17Z"
                    />
                </svg>
            </button>
        </Tooltip>
    );
}
