import { defineConfig } from "vite";
import path from "path";
import typescript from "@rollup/plugin-typescript";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.join(__dirname, "lib/index.ts"),
      name: "react-sensible",
    },
    rollupOptions: {
      external: Object.keys(require("./package.json").dependencies),
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: "React",
        },
        dir: path.resolve(__dirname, "./dist"),
      },
      plugins: [
        typescript({
          target: "es2020",
          rootDir: path.resolve(__dirname, "./lib"),
          declaration: true,
          declarationDir: path.resolve(__dirname, "./dist"),
          exclude: path.resolve(__dirname, "./node_modules/**"),
          allowSyntheticDefaultImports: true,
        }),
      ],
    },
  },
  plugins: [reactRefresh()],
});
