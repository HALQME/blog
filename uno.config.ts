import {
  defineConfig,
  presetWind4,
  presetTypography,
  presetIcons,
  presetAttributify,
  transformerDirectives,
} from "unocss";

// ========================================
// Design Tokens
// ========================================
const tokens = {
  // Colors
  color: {
    primary: "#000000",
    secondary: "#ffffff",
    text: {
      base: "#111827", // neutral-900
      muted: "#6b7280", // neutral-500
      subtle: "#4b5563", // neutral-600
      light: "#9ca3af", // neutral-400
      lighter: "#d1d5db", // neutral-300
      dark: "#1f2937", // neutral-800
      darker: "#111827", // neutral-900
    },
    border: {
      base: "#e5e7eb", // neutral-200
      light: "#d1d5db", // neutral-300
      lighter: "#f3f4f6", // neutral-100
      dark: "#000000",
    },
    bg: {
      base: "#ffffff",
      subtle: "#f9fafb", // neutral-50
      hover: "#f3f4f6", // neutral-100
    },
    shadow: {
      base: "rgba(0,0,0,1)",
      subtle: "rgba(0,0,0,0.3)",
    },
  },
  // Dark mode colors
  dark: {
    primary: "#ffffff",
    secondary: "#000000",
    text: {
      base: "#f9fafb",
      muted: "#9ca3af",
      subtle: "#d1d5db",
      light: "#6b7280",
      lighter: "#4b5563",
      dark: "#e5e7eb",
      darker: "#f3f4f6",
    },
    border: {
      base: "#374151",
      light: "#4b5563",
      lighter: "#1f2937",
      dark: "#ffffff",
    },
    bg: {
      base: "#111827",
      subtle: "#1f2937",
      hover: "#374151",
    },
    shadow: {
      base: "rgba(255,255,255,0.1)",
      subtle: "rgba(255,255,255,0.05)",
    },
  },
  // Spacing Scale (4px base)
  space: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    "2xl": "3rem", // 48px
    "3xl": "4rem", // 64px
    "4xl": "5rem", // 80px
  },
  // Typography
  font: {
    sans: "ui-sans-serif, system-ui, sans-serif",
    size: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
      "5xl": "3rem", // 48px
      "6xl": "3.75rem", // 60px
      "7xl": "4.5rem", // 72px
    },
    weight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      black: "900",
    },
  },
  // Animation
  transition: {
    fast: "150ms ease-out",
    base: "300ms ease-out",
    slow: "500ms ease-out",
  },
  // Shadows
  shadow: {
    none: "none",
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    base: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    // Custom offset shadow for cards
    offset: "4px 4px 0px 0px rgba(0,0,0,1)",
    offsetSm: "2px 2px 0px 0px rgba(0,0,0,1)",
  },
  // Border Radius
  radius: {
    none: "0",
    xs: "0.125rem", // 2px
    sm: "0.25rem", // 4px
    base: "0.375rem", // 6px
    md: "0.5rem", // 8px
    lg: "0.75rem", // 12px
    full: "9999px",
  },
};

export default defineConfig({
  theme: {
    colors: {
      primary: tokens.color.primary,
    },
    spacing: tokens.space,
    fontSize: tokens.font.size,
    fontWeight: tokens.font.weight,
    borderRadius: tokens.radius,
    transitionDuration: {
      fast: "150ms",
      base: "300ms",
      slow: "500ms",
    },
  },
  presets: [
    presetWind4(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
    presetAttributify({
      prefix: "uno-",
    }),
    presetTypography({
      cssExtend: {
        p: {
          "line-height": "1.5",
        },
      },
    }),
  ],
  transformers: [transformerDirectives()],
  shortcuts: [
    {
      // ========================================
      // Color Utilities
      // ========================================
      // Text colors
      "text-primary": "text-black dark:text-white",
      "text-secondary": "text-white dark:text-black",
      "text-base": "text-neutral-900 dark:text-neutral-50",
      "text-muted": "text-neutral-500 dark:text-neutral-400",
      "text-subtle": "text-neutral-600 dark:text-neutral-300",
      "text-light": "text-neutral-400 dark:text-neutral-600",
      "text-lighter": "text-neutral-300 dark:text-neutral-700",

      // Border colors
      "border-base": "border-neutral-200 dark:border-neutral-700",
      "border-light": "border-neutral-300 dark:border-neutral-600",
      "border-lighter": "border-neutral-100 dark:border-neutral-800",
      "border-dark": "border-black dark:border-white",

      // Background colors
      "bg-base": "bg-white dark:bg-neutral-900",
      "bg-subtle": "bg-neutral-50 dark:bg-neutral-800",
      "bg-hover": "bg-neutral-100 dark:bg-neutral-700",
      "bg-primary": "bg-black dark:bg-white",

      // Shadow utilities
      "shadow-card":
        "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8)]",
      "shadow-card-sm":
        "shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.8)]",
      "shadow-card-subtle":
        "shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.7)]",

      // ========================================
      // Layout Primitives
      // ========================================
      // Container
      "container-main": "max-w-5xl mx-auto px-6 md:px-12",
      "container-wide": "max-w-7xl mx-auto px-6 md:px-12",
      "container-narrow": "max-w-3xl mx-auto px-6 md:px-12",

      // Page sections
      section: "py-8 md:py-5",
      "section-sm": "py-6 md:py-8",
      "section-lg": "py-10 md:py-14",
      "section-border": "border-t border-neutral-200 first:border-t-0",

      // Layout helpers
      stack: "flex flex-col",
      "stack-center": "stack items-center",
      row: "flex flex-row",
      "row-center": "row items-center",
      "grid-responsive": "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",

      // ========================================
      // Typography Scale
      // ========================================
      // Headings (Tight, Bold)
      "text-display": "text-5xl md:text-7xl font-bold tracking-tighter text-primary",
      "text-title": "text-3xl md:text-4xl font-bold tracking-tight text-primary",
      "text-headline": "text-2xl font-semibold tracking-tight text-primary",
      "text-subhead": "text-lg font-semibold tracking-tight text-primary",

      // Body text
      "text-body": "text-base leading-relaxed text-subtle",
      "text-body-sm": "text-sm leading-relaxed text-subtle",
      "text-caption": "text-xs text-muted",

      // Meta/Label
      "text-label": "text-xs uppercase tracking-wider font-semibold text-muted",

      // ========================================
      // Interactive Components
      // ========================================
      // Button base
      btn: "inline-flex items-center justify-center gap-2 px-5 py-2.5 font-medium transition-all duration-300 ease-out cursor-pointer border rounded-xs relative overflow-hidden z-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",

      // Button variants
      "btn-primary":
        "btn bg-primary text-secondary border-dark hover:bg-neutral-800 dark:hover:bg-neutral-200",
      "btn-secondary": "btn bg-base text-primary border-light hover:border-dark hover:bg-hover",
      "btn-ghost": "btn bg-transparent text-primary border-transparent hover:bg-base",

      // Link styles
      link: "text-primary underline underline-offset-4 hover:text-subtle transition-colors",
      "link-subtle": "text-subtle hover:text-primary transition-colors",
      "link-nav": "text-sm font-medium text-subtle hover:text-primary transition-colors",

      // ========================================
      // Card Components
      // ========================================
      card: "bg-base border border-base rounded-xs transition-all duration-300",
      "card-hover": "hover:border-dark hover:shadow-card",
      "card-interactive": "card card-hover cursor-pointer",
      "card-content": "p-6",

      // ========================================
      // Tag/Badge Components
      // ========================================
      tag: "inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-base text-primary border border-base rounded-xs transition-all duration-200",
      "tag-hover": "hover:border-dark hover:shadow-card-sm",

      // ========================================
      // Form Elements
      // ========================================
      input:
        "w-full px-4 py-2.5 bg-base border border-light rounded-xs text-base transition-all duration-200 focus:outline-none focus:border-dark focus:ring-2 focus:ring-primary focus:ring-offset-2",

      // ========================================
      // Visual Effects
      // ========================================
      "gradient-fill":
        "bg-gradient-to-r from-base to-base bg-no-repeat bg-[length:0%_100%] hover:bg-[length:100%_100%] bg-left-bottom transition-all duration-500",
      "pattern-dots":
        "bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2f48_1px,transparent_1px)] [background-size:16px_16px]",
    },
  ],
});
