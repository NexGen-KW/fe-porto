<script setup lang="ts">
withDefaults(defineProps<{
  icon: string
  title: string
  description: string
  index?: number
  delay?: number
}>(), {
  index: undefined,
  delay: 0
})

const { el, handlePointerMove, handlePointerLeave } = useCardInteraction(5)
</script>

<template>
  <div
    ref="el"
    class="spotlight-card tilt-card group relative overflow-hidden rounded-2xl border border-default bg-elevated/50 p-6 transition-shadow duration-300 hover:shadow-xl hover:shadow-signal-500/10"
    :style="{ transitionDelay: `${delay}ms` }"
    @pointermove="handlePointerMove"
    @pointerleave="handlePointerLeave"
  >
    <div
      class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style="background-image: linear-gradient(to right, var(--ui-border) 1px, transparent 1px), linear-gradient(to bottom, var(--ui-border) 1px, transparent 1px); background-size: 20px 20px; mask-image: radial-gradient(circle 120px at var(--spot-x, 50%) var(--spot-y, 50%), black, transparent);"
    />

    <span class="pointer-events-none absolute start-3 top-3 size-3 border-s border-t border-primary/30 transition-colors duration-300 group-hover:border-primary/70" />
    <span class="pointer-events-none absolute end-3 bottom-3 size-3 border-e border-b border-primary/30 transition-colors duration-300 group-hover:border-primary/70" />

    <div class="relative z-10">
      <div class="flex items-start justify-between">
        <div class="inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
          <UIcon
            :name="icon"
            class="size-6"
          />
        </div>
        <span
          v-if="index !== undefined"
          class="font-mono text-xs font-semibold text-dimmed"
        >
          {{ String(index + 1).padStart(2, '0') }}
        </span>
      </div>
      <h3 class="mt-5 text-lg font-semibold text-highlighted">
        {{ title }}
      </h3>
      <p class="mt-2 text-sm leading-relaxed text-muted">
        {{ description }}
      </p>
    </div>
  </div>
</template>
