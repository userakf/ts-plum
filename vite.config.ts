import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform:true
    }),
    AutoImport({
      imports:['vue'],
      dts: 'src/auto-import.d.ts'
    }),
    Components({
      dirs:['src/components'],
      extensions:['vue'],
      dts:'src/components.d.ts'
    })
  ]
})
