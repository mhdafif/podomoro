/// <reference types="vitest" />
/// <reference types="vite/client" />
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), ViteImageOptimizer(), tailwindcss()],
  build: {
    minify: true,

    // uncomment below if your apps is webapp, to make sure it works on old devices and browsers
    // outDir: "dist", // Default output directory
    // assetsDir: "assets", // Ensures assets are grouped properly
    // target: ["es2015", "safari11", "safari12"],
    // rollupOptions: {
    //   output: {
    //     manualChunks: undefined,
    //   },
    // },
  },
  resolve: {
    alias: {
      // "@": "/src",
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5175,
    host: "0.0.0.0",
  },
  preview: {
    port: 5175,
    host: "0.0.0.0",
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/__test__/setup.ts"],
    coverage: {
      provider: "v8",
      enabled: true,
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "**/utils/**",
        "**/typings/**",
        "**/public/**",
        "**/coverage/**",
        "**/.million/**",
        "**/.vscode/**",
        "**/*.d.ts",
        "**/*.cjs",
      ],
    },
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/utils/**",
      "**/typings/**",
      "**/public/**",
      "**/coverage/**",
      "**/.million/**",
      "**/.vscode/**",
      "**/*.d.ts",
      "**/*.cjs",
    ],
  },
});
