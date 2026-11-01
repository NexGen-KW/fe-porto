<script setup lang="ts">
// Sits next to the colour-mode button and mirrors its look: shows the *other* language ("ع" on English pages, "EN" on Arabic)
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const copy = useCopy()

const target = computed(() => (locale.value === 'ar' ? 'en' : 'ar'))
</script>

<template>
  <!-- :locale="false": Nuxt UI would otherwise re-localize the target path into the *current* locale -->
  <UButton
    :to="switchLocalePath(target)"
    :locale="false"
    no-prefetch
    variant="ghost"
    color="neutral"
    square
    :aria-label="copy.nav.switchLanguageLabel"
    :title="copy.nav.switchLanguage"
    :hreflang="target"
  >
    <span
      class="flex size-5 items-center justify-center font-semibold"
      :class="target === 'ar' ? 'pb-0.5 font-[IBM_Plex_Sans_Arabic] text-lg leading-none' : 'font-mono text-[11px]'"
      :lang="target"
      aria-hidden="true"
    >{{ copy.nav.switchLanguageShort }}</span>
  </UButton>
</template>
