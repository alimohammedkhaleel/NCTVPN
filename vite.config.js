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
        manualChunks: (id) => {
          // React core libraries
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom') || 
              id.includes('node_modules/react-router-dom')) {
            return 'react-vendor';
          }
          // Animation libraries
          if (id.includes('node_modules/framer-motion') || 
              id.includes('node_modules/gsap')) {
            return 'animation-vendor';
          }
          // Icons libraries
          if (id.includes('node_modules/lucide-react') || 
              id.includes('node_modules/@fortawesome')) {
            return 'icons-vendor';
          }
          // Other large libraries
          if (id.includes('node_modules/canvas-confetti')) {
            return 'effects-vendor';
          }
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
