// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
    root: resolve(__dirname, 'src'),
    
    build: {
        copyPublicDir: "./public",
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'src/client.ts'),
            name: 'Peer',
            // the proper extensions will be added
            fileName: 'peer-client',

        },
        minify: true,
        outDir: resolve(__dirname, '.dist'),
        emptyOutDir: true
    },
    preview: {
        port: 8080,
    }
})