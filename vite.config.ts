import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig((configEnv) => {
  const config = loadEnv(configEnv.mode, './')
  return {
    plugins: [
      vue(),
      AutoImport({
        // 自动导入vue相关函数
        imports: ['vue'],
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: 'Icon'
          })
        ],
        dts: 'src/typings/auto-imports.d.ts'
      }),
      Components({
        // 自动导入自定义组件
        dirs: ['src/components'],
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            enabledCollections: ['ep']
          })
        ],
        dts: 'src/typings/components.d.ts'
      }),
      Icons({
        autoInstall: true
      })
    ],
    resolve: {
      // 配置别名
      alias: {
        '@': resolve(__dirname, 'src')
      }
    }
  }
})
