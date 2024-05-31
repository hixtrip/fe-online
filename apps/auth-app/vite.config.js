import { defineConfig } from "vite";
import qiankun from "vite-plugin-qiankun";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    qiankun("auth-app", {
      useDevMode: true,
    }),
  ],
  server: {
    port: 3002,
    origin: "http://localhost:3002",
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
