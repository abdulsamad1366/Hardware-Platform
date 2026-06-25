export const spacing = {
  // Absolute values
  none: "0px",
  xs: "0.25rem",    // 4px
  sm: "0.5rem",     // 8px
  md: "1rem",       // 16px
  lg: "1.5rem",     // 24px
  xl: "2rem",       // 32px
  xxl: "3rem",      // 48px
  
  // Tailwind equivalent spacing scale
  scale: {
    px: "1px",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    32: "8rem"
  },

  // Semantic layout spacing
  layout: {
    containerPadding: "1.5rem",
    sectionGapMobile: "3rem",
    sectionGapDesktop: "6rem",
    gridGap: "2rem"
  }
} as const;

export type Spacing = typeof spacing;
