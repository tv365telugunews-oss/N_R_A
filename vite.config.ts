import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    // Custom plugin to ignore markdown files
    {
      name: 'ignore-markdown',
      resolveId(id) {
        if (id.endsWith('.md')) {
          return { id, external: true };
        }
      },
    },
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Asset handling for web (Netlify) and Android (APK)
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Optimize for both web and mobile
    target: 'es2015',
    minify: 'terser',
    sourcemap: false,
    // Asset handling
    assetsInlineLimit: 4096, // 4kb - inline small assets
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return undefined;
          }

          const [, modulePath = ''] = id.split('node_modules/');
          const parts = modulePath.split('/');
          const packageName = parts[0]?.startsWith('@') ? `${parts[0]}/${parts[1] || ''}` : parts[0];

          if (id.includes('/xlsx/')) {
            return 'vendor-xlsx';
          }

          if (id.includes('/recharts/') || id.includes('/d3-')) {
            return 'vendor-charts';
          }

          if (id.includes('/react-icons/') || id.includes('/lucide-react/')) {
            return 'vendor-icons';
          }

          if (packageName === '@mui/material' || packageName === '@mui/icons-material' || packageName === '@emotion/react' || packageName === '@emotion/styled' || packageName.startsWith('@radix-ui/')) {
            return 'vendor-ui';
          }

          return 'vendor';
        },
        // Consistent asset naming for Android
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
    // Copy public files properly
    copyPublicDir: true,
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    // CORS for Firebase
    cors: true,
  },
  // Base URL handling
  base: './',
});