// Utility to convert hex colors to RGB channels for use with varAlpha
export function hexToRgbChannels(hex: string): string {
    const cleanHex = hex.replace('#', '');
    
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    
    return `${r} ${g} ${b}`;
}

// Common color channels for the theme
export const colorChannels = {
    // Primary colors
    primary: '37 99 235',      // #2563EB
    primaryLight: '107 182 255', // #6BB6FF
    primaryDark: '30 64 175',   // #1E40AF
    
    // Secondary colors  
    secondary: '124 58 237',    // #7C3AED
    secondaryLight: '167 139 250', // #A78BFA
    secondaryDark: '91 33 182', // #5B21B6
    
    // Grey colors
    grey50: '248 250 252',     // #F8FAFC
    grey100: '241 245 249',    // #F1F5F9
    grey200: '226 232 240',    // #E2E8F0
    grey300: '203 213 225',    // #CBD5E1
    grey400: '148 163 184',    // #94A3B8
    grey500: '100 116 139',    // #64748B
    grey600: '71 85 105',      // #475569
    grey700: '51 65 85',       // #334155
    grey800: '30 41 59',       // #1E293B
    grey900: '15 23 42',       // #0F172A
    
    // Success colors
    success: '16 185 129',     // #10B981
    successLight: '110 231 183', // #6EE7B7
    successDark: '5 150 105',  // #059669
    
    // Info colors
    info: '16 185 129',        // #10B981 (same as success)
    infoLight: '110 231 183',  // #6EE7B7
    infoDark: '5 150 105',     // #059669
    
    // Warning colors
    warning: '245 158 11',     // #F59E0B
    warningLight: '252 211 77', // #FCD34D
    warningDark: '217 119 6',  // #D97706
    
    // Error colors
    error: '239 68 68',        // #EF4444
    errorLight: '252 165 165', // #FCA5A5
    errorDark: '220 38 38',    // #DC2626
    
    white: '255 255 255',      // #FFFFFF
    black: '0 0 0',           // #000000
} as const;
