export const colors = {
  primary: "#0F172A",     // Slate 900 - Premium dark background/text
  secondary: "#D4A017",   // Gold/Brass - Accent color
  background: "#FFFFFF",  // Main background
  muted: "#F8FAFC",       // Slate 50 - Gray background highlights
  border: "#E2E8F0",      // Slate 200 - Subtle border
  text: "#1E293B",        // Slate 800 - Body text color
  textMuted: "#64748B",   // Slate 500 - Captions and secondary text
  success: "#10B981",     // Emerald 500
  error: "#EF4444",       // Red 500
  warning: "#F59E0B"      // Amber 500
} as const;

export type Colors = typeof colors;
