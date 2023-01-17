import { defineConfig } from 'vite'
import { fileURLToPath, URL } from "url";
import vue from "@vitejs/plugin-vue2";
import Components from "unplugin-vue-components/vite";
import { VuetifyResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  envDir: '../../',
  plugins: [
    vue(),
    Components({
      resolvers: [
        VuetifyResolver(),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: [
          '@import "./src/styles/variables"',
          '@import "vuetify/src/styles/settings/_variables"',
          '',
        ].join('\n'),
      },
    },
  },
})
