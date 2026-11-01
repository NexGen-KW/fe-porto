<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow?: string
  title: string
  description?: string
  align?: 'center' | 'left'
  light?: boolean
}>(), {
  align: 'center',
  light: false
})

const { target, isVisible } = useRevealAnimation()
</script>

<template>
  <div
    ref="target"
    class="reveal mx-auto max-w-2xl"
    :class="[isVisible && 'reveal-visible', align === 'center' ? 'text-center' : 'mx-0 text-start']"
  >
    <span
      v-if="eyebrow"
      class="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs font-semibold tracking-wide uppercase"
      :class="light
        ? 'border-white/15 bg-white/5 text-signal-400'
        : 'border-primary/20 bg-primary/5 text-primary'"
    >
      {{ eyebrow }}
    </span>
    <h2
      class="mt-4 text-3xl font-bold tracking-tight sm:text-4xl"
      :class="light ? 'text-white' : 'text-highlighted'"
    >
      {{ title }}
    </h2>
    <p
      v-if="description"
      class="mt-4 text-base leading-relaxed sm:text-lg"
      :class="light ? 'text-white/65' : 'text-muted'"
    >
      {{ description }}
    </p>
  </div>
</template>
