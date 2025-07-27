import type { Theme, SxProps, CSSObject } from '@mui/material/styles';

import Box from '@mui/material/Box';
import GlobalStyles from '@mui/material/GlobalStyles';

import { layoutClasses } from '../classes';
import { useLayoutVars } from '../config-vars';

export type LayoutSectionProps = {
    sx?: SxProps<Theme>;
    cssVars?: CSSObject;
    children?: React.ReactNode;
    footerSection?: React.ReactNode;
    headerSection?: React.ReactNode;
    sidebarSection?: React.ReactNode;
};

export function LayoutSection({
    sx,
    cssVars,
    children,
    footerSection,
    headerSection,
    sidebarSection,
}: LayoutSectionProps) {
    const layoutVars = useLayoutVars();

    const inputGlobalStyles = (
        <GlobalStyles
            styles={{
                body: {
                    ...layoutVars,
                    ...cssVars,
                },
            }}
        />
    );

    return (
        <>
            {inputGlobalStyles}
            <Box id="root__layout" className={layoutClasses.root} sx={sx}>
                {sidebarSection}
                {headerSection}
                <Box
                    display="flex"
                    flex="1 1 auto"
                    flexDirection="column"
                    className={layoutClasses.hasSidebar}
                    sx={{
                        minHeight: '100vh',
                        pl: { lg: 'var(--layout-nav-vertical-width)' },
                        pt: { xs: 'var(--layout-header-mobile-height)', md: 'var(--layout-header-desktop-height)' },
                        transition: 'padding 0.2s',
                    }}
                >
                    {children}
                    {footerSection}
                </Box>
            </Box>
        </>
    );
}
