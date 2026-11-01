<script setup lang="ts">
import { valueIcons } from '~/data/company'

const copy = useCopy()
const values = computed(() => copy.value.about.values.items.map((value, i) => ({ ...value, icon: valueIcons[i]! })))

const { target, isVisible, revealDelay } = useRevealAnimation({ threshold: 0.08 })
const { handlePointerMove, handlePointerLeave } = useListCardInteraction(3)

const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <!-- 1 per row on phones, 2 on tablets, 4 on desktop -->
  <ul
    ref="target"
    class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
  >
    <li
      v-for="(value, i) in values"
      :key="value.title"
      class="reveal"
      :class="isVisible && 'reveal-visible'"
      :style="{ transitionDelay: revealDelay(i, 60, 480) }"
    >
      <article
        class="spotlight-card tilt-card group relative flex h-full flex-col overflow-hidden rounded-3xl border border-default bg-default p-6 transition-[box-shadow,border-color] duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-navy-900/10 dark:hover:shadow-black/30"
        @pointermove="handlePointerMove"
        @pointerleave="handlePointerLeave"
      >
        <!-- accent line that draws in on hover -->
        <span
          class="absolute inset-x-6 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-primary/80 to-transparent transition-transform duration-500 group-hover:scale-x-100 rtl:origin-right rtl:bg-gradient-to-l"
          aria-hidden="true"
        />
        <!-- oversized icon, tucked into the corner, drifts in on hover -->
        <UIcon
          :name="value.icon"
          class="pointer-events-none absolute -end-6 -bottom-6 size-32 rotate-12 text-navy-700/[0.04] transition-[rotate,color,translate] duration-700 group-hover:-translate-y-1 group-hover:rotate-0 group-hover:text-primary/10 dark:text-white/[0.04]"
          aria-hidden="true"
        />

        <div class="relative z-10 flex flex-1 flex-col">
          <div class="flex items-start justify-between">
            <span class="inline-flex size-12 items-center justify-center rounded-2xl bg-navy-50 text-navy-700 ring-1 ring-navy-100 transition-[background-color,color,box-shadow,scale] duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-inverted group-hover:ring-primary dark:bg-white/5 dark:text-white/80 dark:ring-white/10">
              <UIcon
                :name="value.icon"
                class="size-5"
              />
            </span>
            <span class="font-mono text-[11px] text-dimmed transition-colors duration-300 group-hover:text-primary">{{ pad(i + 1) }}</span>
          </div>
          <h3 class="mt-6 font-display text-lg font-semibold text-highlighted">
            {{ value.title }}
          </h3>
          <span
            class="mt-2 block h-0.5 w-8 rounded-full bg-navy-700/20 transition-[width,background-color] duration-500 group-hover:w-14 group-hover:bg-primary dark:bg-white/20"
            aria-hidden="true"
          />
          <p class="mt-3 text-sm leading-relaxed text-muted">
            {{ value.text }}
          </p>
        </div>
      </article>
    </li>
  </ul>
</template>
