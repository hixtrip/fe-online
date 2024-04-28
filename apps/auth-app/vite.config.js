import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import qiankun from "vite-plugin-qiankun";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // react(),
    qiankun("auth-app", {
      useDevMode: true,
    }),
  ],
  server: {
    port: 3002,
    proxy: {
      "/api": {
        target: "http://localhost:5000/app/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
