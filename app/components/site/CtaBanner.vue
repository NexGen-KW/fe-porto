<script setup lang="ts">
import { motion } from 'motion-v'

withDefaults(defineProps<{
  eyebrow?: string
  title: string
  /** phrase inside `title` rendered in the gradient accent, as on the hero sections */
  highlight?: string
  description?: string
  primaryLabel?: string
  primaryTo?: string
  secondaryLabel?: string
  secondaryTo?: string
  navLabel?: string
}>(), {
  eyebrow: undefined,
  highlight: undefined,
  primaryLabel: undefined,
  primaryTo: '/contact',
  secondaryLabel: undefined,
  secondaryTo: '/contact',
  navLabel: undefined
})

const copy = useCopy()
const localePath = useLocalePath()

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]
const { target, isVisible } = useRevealAnimation()
</script>

<template>
  <section
    :data-nav-label="navLabel ?? copy.sections.letsTalk"
    class="px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
  >
    <div
      ref="target"
      class="reveal group relative isolate mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-navy-950 px-6 py-16 text-center sm:px-12 sm:py-20"
      :class="isVisible && 'reveal-visible'"
    >
      <SiteHeroBackdrop variant="banner" />
      <span
        class="border-beam absolute inset-0 opacity-50"
        aria-hidden="true"
      />

      <div class="relative">
        <motion.span
          class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-xs font-medium text-signal-300/90 backdrop-blur-sm"
          :initial="{ opacity: 0, y: 10 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ once: true }"
          :transition="{ duration: 0.5, ease }"
        >
          <span class="relative flex size-1.5">
            <span class="absolute inline-flex size-full animate-ping rounded-full bg-signal-400 opacity-75" />
            <span class="relative inline-flex size-1.5 rounded-full bg-signal-400" />
          </span>
          {{ eyebrow ?? copy.common.readyWhenYouAre }}
        </motion.span>

        <SiteHeroTitle
          class="mx-auto mt-6 max-w-3xl"
          tag="h2"
          size="md"
          :title="title"
          :highlight="highlight"
          :play="isVisible"
        />

        <motion.p
          v-if="description"
          class="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
          :initial="{ opacity: 0, y: 16 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ once: true }"
          :transition="{ duration: 0.5, delay: 0.3, ease }"
        >
          {{ description }}
        </motion.p>

        <motion.div
          class="mt-9 flex flex-col justify-center gap-3 sm:flex-row"
          :initial="{ opacity: 0, y: 16 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ once: true }"
          :transition="{ duration: 0.5, delay: 0.4, ease }"
        >
          <UButton
            :to="localePath(primaryTo)"
            size="xl"
            color="primary"
            trailing-icon="i-lucide-arrow-right"
            class="justify-center"
          >
            {{ primaryLabel ?? copy.common.getStarted }}
          </UButton>
          <UButton
            :to="localePath(secondaryTo)"
            size="xl"
            variant="outline"
            color="neutral"
            class="justify-center bg-white/10 text-white ring-white/25 hover:text-navy-700"
          >
            {{ secondaryLabel ?? copy.common.bookDemo }}
          </UButton>
        </motion.div>
      </div>
    </div>
  </section>
</template>
