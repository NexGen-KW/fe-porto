// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    'motion-v/nuxt',
    'nuxt-charts'
  ],

  devtools: {
    enabled: true
  },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: ''
  },

  ui: {
    colorMode: true
  },

  routeRules: {
    '/': { prerender: true },
    '/products': { prerender: true },
    '/services': { prerender: true },
    '/about': { prerender: true },
    '/contact': { prerender: true },
    '/ar': { prerender: true },
    '/ar/products': { prerender: true },
    '/ar/services': { prerender: true },
    '/ar/about': { prerender: true },
    '/ar/contact': { prerender: true }
  },

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  // Arabic typeface: IBM Plex Sans Arabic — a geometric, technical sans that pairs with Inter / Space Grotesk
  fonts: {
    families: [
      { name: 'IBM Plex Sans Arabic', provider: 'google', weights: [400, 500, 600, 700], subsets: ['arabic'] },
      // no metric fallback for the mono face: the generated "Courier New" alias would otherwise catch Arabic
      // glyphs before IBM Plex Sans Arabic and render them unjoined
      { name: 'JetBrains Mono', fallbacks: [] }
    ]
  },

  // English at /, Arabic at /ar/… — each locale is prerendered in its own language (no client-side flash)
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    locales: [
      { code: 'en', language: 'en-US', dir: 'ltr', name: 'English', file: 'en.ts' },
      { code: 'ar', language: 'ar-KW', dir: 'rtl', name: 'العربية', file: 'ar.ts' }
    ],
    // remember the visitor's choice; only the bare root redirects, so shared deep links always open as sent
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'ngs_locale',
      redirectOn: 'root'
    }
  }
})
