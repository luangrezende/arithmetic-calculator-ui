import type { Theme } from '@mui/material/styles';

import { createTheme as muiCreateTheme } from '@mui/material/styles';

import { shadows, components, customShadows, lightPalette } from './core';

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

function shouldSkipGeneratingVar(keys: string[], value: string | number): boolean {
    const skipGlobalKeys = [
        'mixins',
        'overlays',
        'direction',
        'typography',
        'breakpoints',
        'transitions',
        'cssVarPrefix',
        'unstable_sxConfig',
    ];

    const skipPaletteKeys: {
        [key: string]: string[];
    } = {
        global: ['tonalOffset', 'dividerChannel', 'contrastThreshold'],
        grey: ['A100', 'A200', 'A400', 'A700'],
        text: ['icon'],
    };

    const isPaletteKey = keys[0] === 'palette';

    if (isPaletteKey) {
        const paletteType = keys[1];
        const skipKeys = skipPaletteKeys[paletteType] || skipPaletteKeys.global;

        return keys.some((key) => skipKeys?.includes(key));
    }

    return keys.some((key) => skipGlobalKeys?.includes(key));
}
