// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
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
  ],
  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: 'first' }],
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
  shadcn: { componentDir: './components/ui' },
})
