import { Box, ListItem, Typography, ListItemButton } from '@mui/material';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { Scrollbar } from 'src/components/scrollbar';

import { Logo } from '../logo';

import type { NavContentProps } from './nav.types';

export function NavContent({ data, slots, sx }: NavContentProps) {
    const pathname = usePathname();

    return (
        <>
            <Box sx={{ mb: 8, px: 1 }}>
                <Logo />
            </Box>

            <Typography
                variant="caption"
                sx={{
                    mb: 2,
                    px: 2,
                    textTransform: 'uppercase',
                    color: 'text.secondary',
                }}
            >
                Overview
            </Typography>

            {slots?.topArea}

            <Scrollbar fillContent>
                <Box component="nav" display="flex" flex="1 1 auto" flexDirection="column" sx={sx}>
                    <Box component="ul" gap={0.5} display="flex" flexDirection="column">
                        {data.map((item) => {
                            const isActive = item.path === pathname;

                            return (
                                <ListItem disableGutters disablePadding key={item.title}>
                                    <ListItemButton
                                        component={RouterLink}
                                        href={item.path}
                                        sx={{
                                            pl: 2,
                                            py: 1,
                                            gap: 2,
                                            pr: 1.5,
                                            borderRadius: 0.75,
                                            typography: 'body2',
                                            fontWeight: isActive
                                                ? 'fontWeightBold'
                                                : 'fontWeightMedium',
                                            color: isActive ? 'primary.main' : 'text.primary',
                                            bgcolor: isActive ? 'action.selected' : 'transparent',
                                            '&:hover': { bgcolor: 'action.hover' },
                                        }}
                                    >
                                        <Box component="span" sx={{ width: 24, height: 24 }}>
                                            {item.icon}
                                        </Box>
                                        <Box component="span" flexGrow={1}>
                                            {item.title}
                                        </Box>
                                        {item.info && item.info}
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </Box>
                </Box>
            </Scrollbar>

            {slots?.bottomArea}
        </>
    );
}
