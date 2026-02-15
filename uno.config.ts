import {
  defineConfig,
  presetWind4,
  presetTypography,
  presetIcons,
  presetAttributify,
  transformerDirectives,
} from "unocss";

export default defineConfig({
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
      // Layout & Section
      "layout-container": "max-w-5xl mx-auto px-6 py-6 md:px-12 md:py-20",
      "section-base": "py-16 border-t border-gray-200 first:border-t-0",
      "flex-center": "flex justify-center items-center",

      // Typography (Solid & Tight)
      "heading-1":
        "text-5xl md:text-7xl font-bold tracking-tighter text-black mb-6",
      "heading-2":
        "text-2xl font-semibold flex items-center gap-3 mb-8 tracking-tight text-black",
      "heading-3": "text-lg font-semibold tracking-tight text-black",
      "text-sub": "text-gray-600 leading-relaxed text-base",
      "text-meta":
        "text-xs uppercase tracking-wider font-medium text-gray-500 flex items-center gap-2",

      btn: "px-5 py-2.5 transition-all duration-300 ease-out flex items-center gap-2 cursor-pointer border relative overflow-hidden z-10",
      "btn-primary":
        "btn bg-black text-white border-black bg-gradient-to-r from-white to-white bg-no-repeat bg-[length:0%_100%] hover:bg-[length:100%_100%] hover:text-black bg-left-bottom",
      "btn-secondary":
        "btn bg-white text-black border-gray-300 bg-gradient-to-r from-black to-black bg-no-repeat bg-[length:0%_100%] hover:bg-[length:100%_100%] hover:text-white hover:border-black bg-left-bottom",

      "card-base":
        "block bg-white border border-gray-200 rounded-xs transition-all duration-300 ease-out",
      "card-hover":
        "hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
      "card-interactive": "card-base p-6 card-hover",

      "nav-link":
        "relative px-3 py-1.5 text-sm font-bold text-gray-600 transition-all duration-300 rounded-sm hover:text-white bg-gradient-to-r from-black to-black bg-no-repeat bg-[length:0%_100%] hover:bg-[length:100%_100%] bg-left-bottom",

      "link-icon":
        "text-gray-400 hover:text-black transition-colors duration-200",
      icon: "inline-block align-middle",
      tag: "border px-3 py-1 text-sm font-medium duration-200",
      "tag-base":
        "underline-0 inline-flex items-center gap-1.5 border border-gray-150 rounded-xs px-3 py-1.5 text-sm font-medium transition-all duration-200 hover:border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
      "tag-active":
        "border-black bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]",
    },
  ],
});
