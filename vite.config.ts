import { ConfigEnv, defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from "path";
const pathSrc = path.resolve(__dirname,"./src");
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

// https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv)=>{
  return {
    root: process.cwd(),
    server: {
      port: 8888,
      /* 反向代理 */
      proxy:{
        /* 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发 */
        
      },
      open: false, /* 浏览器自动打开 */
      https: false, /* 是否开启 https */
      host: false, /* 监听本地ip host包含127.0.0.1 */
    },
    /* 路径别名 */
    resolve: {
      alias: {
        '@': pathSrc
      },
    },
    /* 插件 */
    plugins: [
      vue(),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue"],
        eslintrc:{
          enabled: true, // 是否自动生成 eslint 规则，建议生成之后设置 false 
          filepath: "./.eslintrc-auto-import.json", // 指定自动导入函数 eslint 规则的文件
        },
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({}),
        ],
        vueTemplate: true, // 是否在 vue 模板中自动导入
        dts: path.resolve(pathSrc, "types", "auto-imports.d.ts"), // 指定自动导入函数TS类型声明文件路径
      }),
      Components({
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ["ep"] // element-plus图标库，其他图标库 https://icon-sets.iconify.design/
          }),
        ],
        dts: path.resolve(pathSrc, "types", "components.d.ts"), // 指定自动导入组件TS类型声明文件路径
      }),
      Icons({
        // 自动安装图标库
        autoInstall: true,
      }),
    ],
    /* css预处理 路径最后要加上;不然会报错 */
    // css: {
    //   // CSS 预处理器
    //   preprocessorOptions: {
    //       //define global scss variable
    //       scss: {
    //           javascriptEnabled: true,
    //           additionalData: `@use "@/styles/variables.scss" as *;`
    //       }
    //   }
    // },
  }
})
