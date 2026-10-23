import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: 'src/',
  dir: {
    pages: 'routes'
  },
  runtimeConfig: {
    public: {
      apiBase: ''
    }
  },
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  css: [
    'modern-normalize/modern-normalize.css',
    '~/assets/css/style.css'
  ],
  devServer: {
    host: '0.0.0.0',
    port: 3000
  }
})
