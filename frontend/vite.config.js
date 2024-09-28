import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "memoize-notes-app-eu2q.vercel.app"
,
    }  
  } ,
  plugins: [react()],
})
