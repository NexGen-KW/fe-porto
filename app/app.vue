<script setup lang="ts">
import { ar, en } from '@nuxt/ui/locale'

const { locale } = useI18n()
const copy = useCopy()

// <html lang/dir>, hreflang alternates and og:locale for the active locale
const i18nHead = useLocaleHead()

useHead(() => ({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs?.lang,
    dir: i18nHead.value.htmlAttrs?.dir
  },
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ...(i18nHead.value.meta ?? [])
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap' },
    ...(i18nHead.value.link ?? [])
  ]
}))

useSeoMeta({
  title: () => copy.value.meta.title,
  description: () => copy.value.meta.description,
  ogTitle: () => copy.value.meta.title,
  ogDescription: () => copy.value.meta.description,
  ogImage: '/images/nexgen-mark-512.png',
  twitterCard: 'summary_large_image'
})

// Nuxt UI's own strings (and the direction of its portals/overlays) follow the site locale
const uiLocale = computed(() => (locale.value === 'ar' ? ar : en))
</script>

<template>
  <UApp :locale="uiLocale">
    <SiteCustomCursor />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
