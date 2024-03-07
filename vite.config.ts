import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

function pathResolve(dir) {
    return resolve(__dirname, ".", dir);
}

// https://vitejs.dev/config/
export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    return defineConfig({
        plugins: [vue()],
        base: env.VITE_BASEURL,
        resolve: {
            alias: {
                "@": pathResolve("src"),
            },
        },
    });
};
