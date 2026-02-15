import {
  defineConfig,
  presetWind4,
  presetTypography,
  presetIcons,
  presetAttributify,
  transformerDirectives,
} from "unocss";

// ========================================
// Design Tokens - 単一ソース・オブ・トゥルース
// ========================================
const tokens = {
  // Colors
  color: {
    primary: "#000000",
    secondary: "#ffffff",
    text: {
      base: "#111827", // gray-900
      muted: "#6b7280", // gray-500
      subtle: "#4b5563", // gray-600
    },
    border: {
      base: "#e5e7eb", // gray-200
      light: "#d1d5db", // gray-300
      lighter: "#e5e7eb", // gray-150相当
    },
    bg: {
      base: "#ffffff",
      subtle: "#f9fafb", // gray-50
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
      "section-border": "border-t border-gray-200 first:border-t-0",

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
      "text-display":
        "text-5xl md:text-7xl font-bold tracking-tighter text-black",
      "text-title": "text-3xl md:text-4xl font-bold tracking-tight text-black",
      "text-headline": "text-2xl font-semibold tracking-tight text-black",
      "text-subhead": "text-lg font-semibold tracking-tight text-black",

      // Body text
      "text-body": "text-base leading-relaxed text-gray-600",
      "text-body-sm": "text-sm leading-relaxed text-gray-600",
      "text-caption": "text-xs text-gray-500",

      // Meta/Label
      "text-label":
        "text-xs uppercase tracking-wider font-semibold text-gray-500",

      // ========================================
      // Interactive Components
      // ========================================
      // Button base
      btn: "inline-flex items-center justify-center gap-2 px-5 py-2.5 font-medium transition-all duration-300 ease-out cursor-pointer border rounded-xs relative overflow-hidden z-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black",

      // Button variants
      "btn-primary": "btn bg-black text-white border-black hover:bg-gray-800",
      "btn-secondary":
        "btn bg-white text-black border-gray-300 hover:border-black hover:bg-gray-50",
      "btn-ghost":
        "btn bg-transparent text-black border-transparent hover:bg-white",

      // Link styles
      link: "text-black underline underline-offset-4 hover:text-gray-600 transition-colors",
      "link-subtle": "text-gray-600 hover:text-black transition-colors",
      "link-nav":
        "text-sm font-medium text-gray-600 hover:text-black transition-colors",

      // ========================================
      // Card Components
      // ========================================
      card: "bg-white border border-gray-200 rounded-xs transition-all duration-300",
      "card-hover":
        "hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
      "card-interactive": "card card-hover cursor-pointer",
      "card-content": "p-6",

      // ========================================
      // Tag/Badge Components
      // ========================================
      tag: "inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-white border border-gray-200 rounded-xs transition-all duration-200",
      "tag-hover":
        "hover:border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",

      // ========================================
      // Form Elements
      // ========================================
      input:
        "w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xs text-base transition-all duration-200 focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-offset-2",

      // ========================================
      // Visual Effects
      // ========================================
      "gradient-fill":
        "bg-gradient-to-r from-white to-white bg-no-repeat bg-[length:0%_100%] hover:bg-[length:100%_100%] bg-left-bottom transition-all duration-500",
      "pattern-dots":
        "bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]",
    },
  ],
});
