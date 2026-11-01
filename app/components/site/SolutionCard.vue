<script setup lang="ts">
import { useIntervalFn, useMediaQuery } from '@vueuse/core'
import type { CatalogItem } from '~/data/catalog'

const props = withDefaults(defineProps<{
  item: CatalogItem
  index: number
  featured?: boolean
}>(), {
  featured: false
})

const copy = useCopy()
const localePath = useLocalePath()
const { isRtl } = useLocaleInfo()
const { el, handlePointerMove, handlePointerLeave } = useCardInteraction(3)
const pad = (n: number) => String(n).padStart(2, '0')

// featured card only: the benefit chips orbit the illustration, one lit at a time.
// Each chip sits in a corner of the stage; `x`/`y` is where its connector line ends (viewBox 0–100).
// Positions are logical (start/end), so the SVG line ends mirror with them in RTL.
const chipSpots = [
  { position: 'start-0 top-1', x: 16, y: 8 },
  { position: 'end-0 top-7', x: 84, y: 16 },
  { position: 'start-0 bottom-7', x: 16, y: 84 },
  { position: 'end-0 bottom-1', x: 84, y: 92 }
]
const chips = computed(() => props.item.benefits.slice(0, chipSpots.length).map((benefit, i) => {
  const spot = chipSpots[i]!
  return { ...benefit, ...spot, x: isRtl.value ? 100 - spot.x : spot.x }
}))

const activeChip = ref(0)
const hovering = ref(false)
const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
const { pause, resume } = useIntervalFn(() => {
  if (!hovering.value) activeChip.value = (activeChip.value + 1) % chips.value.length
}, 2600, { immediate: false })

onMounted(() => {
  if (props.featured && !reduceMotion.value) resume()
})
watch(reduceMotion, (reduced) => {
  if (reduced) pause()
  else if (props.featured) resume()
})

function focusChip(i: number) {
  hovering.value = true
  activeChip.value = i
}
</script>

<template>
  <div
    ref="el"
    class="spotlight-card tilt-card group relative h-full overflow-hidden rounded-3xl border transition-shadow duration-300 hover:shadow-2xl"
    :class="featured
      ? 'border-navy-900/10 bg-gradient-to-br from-navy-700 via-navy-800 to-navy-950 text-white hover:shadow-navy-700/30 dark:border-signal-400/20 dark:from-navy-800 dark:via-navy-900 dark:to-navy-950 dark:hover:shadow-signal-500/10'
      : 'border-default bg-default hover:shadow-signal-500/10'"
    @pointermove="handlePointerMove"
    @pointerleave="handlePointerLeave"
  >
    <span
      class="border-beam absolute inset-0 transition-opacity duration-500 group-hover:opacity-100"
      :class="featured ? 'opacity-40' : 'opacity-0'"
      aria-hidden="true"
    />

    <!-- featured: brand glows in opposite corners -->
    <template v-if="featured">
      <div
        class="pointer-events-none absolute -end-20 -top-24 size-80 animate-aurora rounded-full bg-signal-400/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute -start-20 -bottom-28 size-80 rounded-full bg-navy-400/30 blur-3xl"
        aria-hidden="true"
      />
    </template>

    <!-- dotted backdrop -->
    <div
      class="pointer-events-none absolute inset-0"
      :class="featured ? 'opacity-70' : 'opacity-60'"
      :style="{
        backgroundImage: `radial-gradient(${featured ? 'rgb(255 255 255 / 0.16)' : 'var(--ui-border-accented)'} 1px, transparent 1px)`,
        backgroundSize: '18px 18px',
        maskImage: featured
          ? 'radial-gradient(ellipse 75% 60% at 50% 40%, black, transparent)'
          : 'radial-gradient(ellipse 80% 70% at 100% 0%, black, transparent)'
      }"
      aria-hidden="true"
    />

    <!-- oversized index numeral -->
    <span
      v-if="!featured"
      class="pointer-events-none absolute -end-1 -bottom-6 font-display text-8xl leading-none font-bold text-navy-900/[0.05] transition-colors duration-500 select-none group-hover:text-primary/15 dark:text-white/[0.05]"
      aria-hidden="true"
    >{{ pad(index + 1) }}</span>

    <NuxtLink
      :to="localePath(`/products#${item.slug}`)"
      class="relative z-10 flex h-full flex-col p-6 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary sm:p-7"
      :class="featured && 'lg:p-9'"
    >
      <!-- featured: live product scene -->
      <template v-if="featured">
        <div class="flex items-center justify-between gap-4">
          <span class="font-mono text-xs font-semibold text-white/50">{{ pad(index + 1) }} / {{ copy.solutionCard.product }}</span>
          <span class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[11px] text-signal-300 backdrop-blur-sm">
            <span class="relative flex size-1.5">
              <span class="absolute inline-flex size-full animate-ping rounded-full bg-signal-400 opacity-75" />
              <span class="relative inline-flex size-1.5 rounded-full bg-signal-400" />
            </span>
            {{ copy.solutionCard.flagship }}
          </span>
        </div>

        <div
          class="relative my-6 min-h-72 flex-1 sm:min-h-80"
          @pointerleave="hovering = false"
        >
          <!-- connectors from the illustration to each benefit -->
          <svg
            class="absolute inset-0 size-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <line
              v-for="(chip, i) in chips"
              :key="chip.title"
              x1="50"
              y1="50"
              :x2="chip.x"
              :y2="chip.y"
              class="animate-dash-march transition-[stroke,opacity] duration-500"
              :class="activeChip === i ? 'stroke-signal-400 opacity-100' : 'stroke-white opacity-20'"
              :stroke-width="activeChip === i ? 1.5 : 1"
              stroke-dasharray="4 5"
              stroke-linecap="round"
              vector-effect="non-scaling-stroke"
            />
          </svg>

          <!-- stage: rings, glow and the illustration -->
          <div
            class="pointer-events-none absolute inset-0"
            aria-hidden="true"
          >
            <span class="absolute top-1/2 left-1/2 size-64 -translate-1/2 animate-spin-slow rounded-full border border-dashed border-white/15 sm:size-80" />
            <span class="absolute top-1/2 left-1/2 size-48 -translate-1/2 rounded-full border border-white/10 sm:size-60" />
            <span class="absolute top-1/2 left-1/2 size-40 -translate-1/2 animate-pulse-glow rounded-full bg-signal-400/25 blur-3xl sm:size-48" />
            <span class="absolute top-1/2 left-1/2 flex size-32 -translate-1/2 items-center justify-center rounded-full bg-navy-900/60 shadow-2xl ring-1 shadow-navy-950/50 ring-white/15 backdrop-blur-sm transition-transform duration-500 group-hover:scale-105 sm:size-40">
              <SiteMotif
                :kind="item.motif"
                class="size-24 text-signal-300 sm:size-28"
              />
            </span>
          </div>

          <ul>
            <li
              v-for="(chip, i) in chips"
              :key="chip.title"
              class="absolute"
              :class="chip.position"
            >
              <span
                class="flex max-w-[8.75rem] animate-bob items-center gap-2 rounded-xl border px-3 py-1.5 font-mono text-[11px] leading-tight backdrop-blur-md transition-colors duration-500 sm:max-w-none sm:rounded-full"
                :class="activeChip === i
                  ? 'border-signal-400/60 bg-signal-400/15 text-white shadow-lg shadow-signal-500/20'
                  : 'border-white/10 bg-navy-900/50 text-white/65'"
                :style="{ animationDelay: `${i * -0.8}s` }"
                @pointerenter="focusChip(i)"
              >
                <span
                  class="size-1.5 shrink-0 rounded-full transition-colors duration-500"
                  :class="activeChip === i ? 'bg-signal-400' : 'bg-white/30'"
                />
                {{ chip.title }}
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {{ item.name }}
          </h3>
          <p class="mt-2 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
            {{ item.summary }}
          </p>
          <span class="mt-6 inline-flex items-center gap-3 font-mono text-xs font-semibold text-white">
            <span class="inline-flex size-10 items-center justify-center rounded-full bg-signal-400 text-navy-950 transition-transform duration-300 group-hover:scale-110">
              <UIcon
                name="i-lucide-arrow-up-right"
                class="size-4 transition-transform duration-300 group-hover:rotate-45"
              />
            </span>
            <span class="relative">
              {{ copy.solutionCard.explore }}
              <span class="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-signal-400 transition-transform duration-500 group-hover:scale-x-100 rtl:origin-right" />
            </span>
          </span>
        </div>
      </template>

      <!-- compact card -->
      <template v-else>
        <div class="flex items-start justify-between gap-4">
          <span class="relative inline-flex size-20 items-center justify-center rounded-2xl bg-primary/[0.07] ring-1 ring-primary/15 transition-[translate,rotate,background-color] duration-500 group-hover:-translate-y-1 group-hover:-rotate-3 group-hover:bg-primary/[0.12]">
            <span
              class="absolute inset-2 rounded-full bg-signal-400/30 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
              aria-hidden="true"
            />
            <SiteMotif
              :kind="item.motif"
              class="relative size-14 text-signal-600 dark:text-signal-400"
            />
          </span>
          <span class="inline-flex size-9 items-center justify-center rounded-full border border-default text-muted transition-all duration-300 group-hover:border-signal-400 group-hover:bg-signal-400 group-hover:text-navy-950">
            <UIcon
              name="i-lucide-arrow-up-right"
              class="size-4 transition-transform duration-300 group-hover:rotate-45"
            />
          </span>
        </div>

        <div class="mt-6 flex flex-1 flex-col">
          <p class="font-mono text-[11px] text-dimmed">
            {{ pad(index + 1) }} / {{ copy.solutionCard.product }}
          </p>
          <h3 class="mt-1 font-display text-lg font-semibold tracking-tight text-highlighted">
            {{ item.name }}
          </h3>
          <p class="mt-2 text-sm leading-relaxed text-muted">
            {{ item.summary }}
          </p>
          <p class="mt-auto flex items-center gap-2 pt-5 font-mono text-[11px] text-dimmed transition-colors duration-300 group-hover:text-primary">
            <span class="h-px w-4 shrink-0 bg-current transition-[width] duration-500 group-hover:w-7" />
            <span class="truncate">{{ item.benefits[0]?.title }}</span>
          </p>
        </div>
      </template>
    </NuxtLink>
  </div>
</template>
