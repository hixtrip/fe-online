/// <reference types="vite/client" />
declare module '*.vue' {
    import { App, defineComponent } from 'vue';
    const component: ReturnType<typeof defineComponent> & {
        install(app: App): void;
    };
    export default component;
}
declare module 'pinia-plugin-persist';
declare module '@element-plus/icons-vue';
declare module 'qs';
declare module 'lodash';
