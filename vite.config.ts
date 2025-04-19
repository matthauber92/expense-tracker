import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext'
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src/'),
      '@common': path.resolve(__dirname, './src/common/'),
      '@features': path.resolve(__dirname, './src/features/'),
      '@assets': path.resolve(__dirname, './src/common/assets'),
      '@components': path.resolve(__dirname, './src/common/components/'),
      '@utils': path.resolve(__dirname, './src/common/utils/'),
      '@context': path.resolve(__dirname, './src/context/'),
    }
  },
  server: {
    open: true,
    port: 3000
  }
})
