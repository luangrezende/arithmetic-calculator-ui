// UI Component Heights
export const UI_HEIGHTS = {
  // Standard input and button heights
  sm: 'h-10 xl:h-12',
  md: 'h-12 xl:h-14',
  lg: 'h-14 xl:h-16',
  
  // Default height for most components
  default: 'h-12 xl:h-14',
} as const;

// UI Component Sizes
export const UI_SIZES = {
  input: {
    sm: 'py-2 text-sm h-10 xl:py-2 xl:text-base xl:h-12',
    md: 'py-2 text-base h-12 xl:py-3 xl:text-lg xl:h-14',
    lg: 'py-3 text-lg h-14 xl:py-4 xl:text-xl xl:h-16',
  },
  button: {
    sm: 'px-2 py-1.5 text-xs h-10 xl:px-3 xl:py-2 xl:text-sm xl:h-12',
    md: 'px-3 py-2 text-sm h-12 xl:px-4 xl:py-2.5 xl:text-base xl:h-14',
    lg: 'px-4 py-2.5 text-base h-14 xl:px-5 xl:py-3 xl:text-lg xl:h-16',
  },
} as const;
