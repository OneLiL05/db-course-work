// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [
    './core',
    './layers/admin',
    './layers/auth',
    './layers/users',
    './layers/cities',
    './layers/site',
  ],

  devtools: { enabled: true },

  app: {
    head: {
      templateParams: {
        separator: '|',
      },
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@vee-validate/nuxt',
    '@nuxtjs/seo',
    'shadcn-nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],

  imports: {
    dirs: ['./core/types', './layers/**/types'],
  },

  pinia: {
    storesDirs: ['./core/stores/**', './layers/**/stores/**'],
  },

  tailwindcss: {
    cssPath: ['./core/assets/css/tailwind.css', { injectPosition: 'first' }],
  },

  icon: {
    provider: 'iconify',
    serverBundle: {
      collections: ['mynaui'],
    },
  },

  fonts: {
    defaults: {
      weights: [400],
      styles: ['normal', 'italic'],
      subsets: ['cyrillic-ext', 'cyrillic', 'latin-ext', 'latin'],
      fallbacks: {
        'sans-serif': ['Inter'],
      },
    },
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
  },

  site: {
    name: 'SkillSwap',
    description: '',
    defaultLocale: 'en',
  },

  shadcn: { componentDir: './core/components/ui', prefix: '' },

  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
    },
  },

  compatibilityDate: '2024-10-21',
})
