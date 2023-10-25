// vite.config.ts
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  build: {
    target: "ESNext",
    lib: {
      formats: ["es", "cjs"],
      entry: "src/index.ts",
      fileName: "index",
    },
    minify: "terser",
    sourcemap: true,
    emptyOutDir: false,
  },
  plugins: [nodePolyfills()],
});
