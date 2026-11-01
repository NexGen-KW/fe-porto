<script setup lang="ts">
withDefaults(defineProps<{
  size?: 'sm' | 'md' | 'lg'
}>(), {
  size: 'md'
})

const copy = useCopy()

const heightClass = {
  sm: 'h-7 sm:h-8',
  md: 'h-9 sm:h-11',
  lg: 'h-11 sm:h-12'
}
</script>

<template>
  <span class="inline-flex shrink-0 items-center transition-transform duration-200 group-hover:scale-[1.04]">
    <img
      src="/images/ngs-mark-glow.png"
      :alt="copy.nav.logoAlt"
      :class="[heightClass[size], 'w-auto object-contain drop-shadow-[0_0_18px_rgba(76,175,80,0.35)]']"
    >
  </span>
</template>
