import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";

const config = {
  input: "src/index.ts",
  plugins: [
    json(),
    commonjs({
      // required for @opentelemetry/resources which pretends to be an ESM build while using dynamic `require()`
      transformMixedEsModules: true,
    }),
    resolve({
      preferBuiltins: false,
    }),
    typescript(),
    terser(),
  ],
  output: [
    {
      file: "dist/index.js",
      format: "es",
      sourcemap: true,
    },
    {
      file: "dist/index.cjs",
      format: "cjs",
      sourcemap: true,
    },
  ],
};

export default config;
