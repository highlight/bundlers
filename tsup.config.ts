import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  target: "esnext",
  format: ["esm", "cjs"],
  // breaks build because opentelemetry exports are not actually ESM compatible
  // noExternal: [new RegExp('.*')],
  minify: "terser",
  sourcemap: true,
});
