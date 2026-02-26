import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
import { visualizer } from 'rollup-plugin-visualizer'
import compression from 'vite-plugin-compression'
import { VitePWA } from 'vite-plugin-pwa'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-react-components/vite'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const isAnalyze = mode === 'analyze'
  const isProd = mode === 'production'

  return {
    plugins: [
      react(),
      tsconfigPaths(),
      svgr(),
      AutoImport({
        imports: ['react', 'react-router-dom'],
        dts: 'src/shared/types/auto-imports.d.ts',
        eslintrc: {
          enabled: true,
        },
      }),
      Components({
        dts: true,
      }),
      isProd &&
        compression({
          algorithm: 'gzip',
        }),
      isProd &&
        compression({
          algorithm: 'brotliCompress',
        }),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg'],
        manifest: {
          name: 'React FSD Template',
          short_name: 'FSD Template',
          theme_color: '#ffffff',
          background_color: '#ffffff',
          display: 'standalone',
        },
      }),
      isAnalyze &&
        visualizer({
          open: true,
          filename: 'dist/stats.html',
          gzipSize: true,
          brotliSize: true,
        }),
    ].filter(Boolean),

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    server: {
      port: 5187,
      open: true,
      strictPort: true,
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/app/styles/common/reset.scss" as *;
            @use "@/app/styles/common/variables.scss" as *;
            @use "@/app/styles/common/mixins.scss" as *;
            @use "@/app/styles/common/typography.scss" as *;
            @use "@/app/styles/common/fonts.scss" as *;
          `,
        },
      },
    },

    build: {
      outDir: 'dist',
      sourcemap: !isProd,
      minify: 'esbuild',
      target: 'esnext',
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              if (id.includes('react')) return 'react-vendor'
              if (id.includes('zustand')) return 'state-vendor'
              if (id.includes('axios')) return 'api-vendor'
              return 'vendor'
            }
          },
        },
      },
    },

    define: {
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV),
    },

    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
    },

    preview: {
      port: 4173,
      strictPort: true,
    },
  }
})
