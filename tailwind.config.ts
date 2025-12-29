// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#111827",     // gray-900
        secondary: "#374151",   // gray-700
        accent: "#15803d",      // green-700 (muted, serious)
        muted: "#6b7280",       // gray-500
        surface: "#f9fafb",     // gray-50
        border: "#e5e7eb",      // gray-200
      },
    },
  },
} satisfies Config;
