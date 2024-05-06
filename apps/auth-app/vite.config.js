import {defineConfig} from 'vite'
import reactRefresh from '@vitejs/plugin-react'
import qiankun from 'vite-plugin-qiankun'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        // reactRefresh(),
        qiankun('auth-app',{
            useDevMode:true
        }),
        // react(),
    ],
    server: {
        port: 3002,
    },
})
