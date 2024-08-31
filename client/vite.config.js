import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config();

console.log("hello", process.env.BACKEND_URL)

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.BACKEND_URL,
  plugins: [react()],
})
