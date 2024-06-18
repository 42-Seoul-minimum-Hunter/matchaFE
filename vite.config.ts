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
