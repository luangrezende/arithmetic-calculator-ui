import type { Theme } from '@mui/material/styles';

import { createTheme as muiCreateTheme } from '@mui/material/styles';

import { shadows, components, lightPalette, customShadows } from './core';

export function createTheme(): Theme {
    const initialTheme = {
        palette: lightPalette,
        shadows: shadows(),
        customShadows: customShadows(),
        shape: { 
            borderRadius: 12
        },
        components,
    };

    const theme = muiCreateTheme(initialTheme);

    return theme;
}
