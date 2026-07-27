import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteImagemin from 'vite-plugin-imagemin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.8, 0.9], speed: 4 },
      svgo: {
        plugins: [
          { name: 'removeViewBox', active: false },
          { name: 'removeEmptyAttrs', active: true },
        ],
      },
    }),
  ],
  build: {
    // تحسين حجم الـ bundle
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // إزالة console.log في الـ production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'], // إزالة دوال معينة
      },
    },
    // تقسيم الكود لتحميل أسرع
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation-vendor': ['framer-motion', 'gsap'],
          'icons-vendor': ['lucide-react', '@fortawesome/react-fontawesome', '@fortawesome/free-solid-svg-icons'],
        },
      },
    },
    // ضغط الملفات
    cssCodeSplit: true,
    sourcemap: false, // تعطيل sourcemaps للـ production
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096, // تحويل الصور الصغيرة لـ base64
  },
  // تحسين الـ development
  server: {
    port: 3000,
    strictPort: false,
    open: true,
  },
  // Pre-bundling optimization
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'gsap'],
  },
})
