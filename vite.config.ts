import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "@svgr/rollup";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [react()],
  plugins: [react(), svgr()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: [
//       // { find: "@components", replacement: "/src/components" },
//       { find: "@", replacement: "/src" },
//     ],
//   },
// });
