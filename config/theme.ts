export const themeConfig = {
  colors: {
    primary: {
      hex: "#0F172A",
      tw: "primary", // maps to bg-primary, text-primary, etc.
      slate: "slate-900"
    },
    accent: {
      hex: "#D4A017",
      tw: "accent", // maps to bg-accent, text-accent, etc.
      brass: "amber-600"
    },
    background: {
      hex: "#FFFFFF",
      tw: "white"
    },
    grayBg: {
      hex: "#F8FAFC",
      tw: "gray-bg",
      slate: "slate-50"
    }
  },
  typography: {
    fontSans: "Inter, sans-serif"
  },
  borderRadius: {
    lg: "0.75rem",
    xl: "1rem"
  },
  shadows: {
    soft: "0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 8px -1px rgba(15, 23, 42, 0.02)"
  }
};

export type ThemeConfig = typeof themeConfig;
