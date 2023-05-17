import { fileURLToPath, URL } from 'node:url'
import path from "path"
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import svgLoader from "vite-svg-loader"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vueJsx(),
    svgLoader(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
      symbolId: "icon-[dir]-[name]"
    }),],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@import '@/styles/constant.sass';"
      }
    }
  },
  server: {
    https: false,
    port: 4132,
    open: true,
    cors: true,
    strictPort: false,
    proxy: {
      '/api': {
        target: 'https://service-p0ngyeui-1318284787.gz.apigw.tencentcs.com/release',
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace('/api', "")
      }
    }
  }
})
