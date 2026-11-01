<script setup lang="ts">
import { motion } from 'motion-v'

withDefaults(defineProps<{
  eyebrow?: string
  title: string
  /** phrase inside `title` rendered in the gradient accent, as on the home hero */
  highlight?: string
  description?: string
  navLabel?: string
}>(), {
  eyebrow: undefined,
  highlight: undefined,
  description: undefined,
  navLabel: undefined
})

const copy = useCopy()

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]
</script>

<template>
  <section
    :data-nav-label="navLabel ?? copy.sections.overview"
    class="relative isolate overflow-hidden pt-16 lg:pt-20"
  >
    <SiteHeroBackdrop variant="page" />

    <div class="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
      <motion.span
        v-if="eyebrow"
        class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-xs font-medium text-signal-300/90 backdrop-blur-sm"
        :initial="{ opacity: 0, y: 12 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5, ease }"
      >
        <span class="relative flex size-1.5">
          <span class="absolute inline-flex size-full animate-ping rounded-full bg-signal-400 opacity-75" />
          <span class="relative inline-flex size-1.5 rounded-full bg-signal-400" />
        </span>
        {{ eyebrow }}
      </motion.span>

      <SiteHeroTitle
        class="mt-6"
        size="lg"
        :title="title"
        :highlight="highlight"
      />

      <motion.p
        v-if="description"
        class="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70"
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.5, ease }"
      >
        {{ description }}
      </motion.p>

      <motion.div
        v-if="$slots.default"
        class="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.6, ease }"
      >
        <slot />
      </motion.div>
    </div>
  </section>
</template>
