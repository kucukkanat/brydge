// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
    root: resolve(__dirname, 'src'),

    build: {
        // copyPublicDir: "./public",
        minify: true,
        outDir: resolve(__dirname, 'docs'),
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                nested: resolve(__dirname, 'src/friendlist.html'),
                chat: resolve(__dirname, 'src/chat.html'),
            },
        },
        assetsInlineLimit:100000000
    },
    preview: {
        port: 8080,
    }
})
console.log("YEH")