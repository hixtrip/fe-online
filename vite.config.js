import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite';
const config = () =>{
    return {
        plugins:[
            vue(),
            // 本来想规范jsx的
            vueJsx({}),
            AutoImport({
                resolvers: [ElementPlusResolver()],
              }),
              Components({
                resolvers: [ElementPlusResolver()],
              }),
        ]
    }
}
export default defineConfig(config);