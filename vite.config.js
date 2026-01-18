import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      symbolId: '[name]',
      inject: 'body-last',
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "/src/assets/scss/main.scss";`
      }
    }
  }
})
