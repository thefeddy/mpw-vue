import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue({
        template: {
            compilerOptions: {
                isCustomElement: (tag) => [
                    'movie',
                    'trending',
                    'name',
                    'ranking',
                    'search',
                    'movies',
                    'pagination',
                    'info',
                    'genre',
                    'genres',
                    'sidebar',
                    'top',
                    'detail',
                    'rating',
                    'cast',
                    'actor',
                    'circle',
                    'searching',
                    'radio',
                    'season',
                    'episode',
                    'episodes',
                    'seasons',
                    'radios',
                    'FourOhFour',
                    'communities',
                    'community',
                    'photo',
                    'panel',
                    'line',
                    'sub-header',
                    'lines',
                    'list',
                    'slide',
                    'slider',
                    'slides',
                    'modal',
                    'close',
                    'modal-body',
                    'networks',
                    'trailers',
                    'trailer'
                ].includes(tag),
            }
        }
    },

    )],
    esbuild: {
        drop: ['debugger'],
        pure: ['console.log', 'console.error', 'console.warn', 'console.debug', 'console.trace'],
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        rollupOptions: {
            output: {
                entryFileNames: `static/vue/[name].js`,
                chunkFileNames: `static/vue/[name].js`,
                assetFileNames: `static/vue/[name].[ext]`
            }
        }
    },
    define: {
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': true // or false depending on your needs
    }
})
