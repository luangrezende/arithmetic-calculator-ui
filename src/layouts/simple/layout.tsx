import { Logo } from 'src/components/logo';

import { Main, CompactContent } from './main';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';

export type SimpleLayoutProps = {
    className?: string;
    children: React.ReactNode;
    header?: {
        className?: string;
    };
    content?: {
        compact?: boolean;
    };
};

export function SimpleLayout({ className, children, header, content }: SimpleLayoutProps) {
    return (
        <LayoutSection
            headerSection={
                <HeaderSection
                    layoutQuery="md"
                    slotProps={{ 
                        container: { 
                            maxWidth: false,
                            className: 'px-3 sm:px-6 lg:px-8 xl:px-10',
                        } 
                    }}
                    className={header?.className}
                    slots={{
                        topArea: (
                            <div className="hidden bg-blue-50 dark:bg-blue-900/30 border-b border-blue-200 dark:border-blue-800 px-4 py-2">
                                <div className="text-sm text-blue-700 dark:text-blue-300">
                                    This is an info Alert.
                                </div>
                            </div>
                        ),
                        leftArea: <Logo />,
                    }}
                />
            }
            footerSection={null}
            cssVars={{
                '--layout-simple-content-compact-width': '448px',
            }}
        >
            <Main>
                {content?.compact ? (
                    <CompactContent layoutQuery="md">{children}</CompactContent>
                ) : (
                    children
                )}
            </Main>
        </LayoutSection>
    );
}
