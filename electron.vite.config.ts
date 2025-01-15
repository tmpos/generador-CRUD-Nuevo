// @ts-nocheck
import { resolve } from 'path'
//import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import Components from 'unplugin-vue-components/vite';
export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@': fileURLToPath(new URL('./src/renderer/src', import.meta.url))
      }
    },
    plugins: [
      vue(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: false,

        pwaAssets: {
          disabled: false,
          config: true
        },

        manifest: {
          name: 'sistema-app',
          short_name: 'sistema-app',
          description: 'Sistema Generacionde CRUD',
          theme_color: '#ffffff'
        },

        workbox: {
          globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
          cleanupOutdatedCaches: true,
          clientsClaim: true
        },

        devOptions: {
          enabled: false,
          navigateFallback: 'index.html',
          suppressWarnings: true,
          type: 'module'
        }
      }),
      vueI18n({
        include: fileURLToPath(new URL('./src/renderer/src/locales/**', import.meta.url))
      }),
        Components({
        resolvers: [PrimeVueResolver()]
      })

    ],
  }
})
