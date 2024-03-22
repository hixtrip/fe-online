/*
 * @Author: chenhuang
 * @Date: 2024-03-21 10:24:58
 * @Description:
 */
import { defineConfig } from "vite";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import vue from "@vitejs/plugin-vue";
export default {
  build: {
    outDir: "docs",
  },
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false,
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      "~": "/src",
    },
  },
};
