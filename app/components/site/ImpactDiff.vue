<script setup lang="ts">
import { useMediaQuery, useTimeoutFn } from '@vueuse/core'

interface Result {
  /** English, code-style identifier shown in the diff */
  slug: string
  metric: string
  before: number
  after: number
  unit?: string
  better?: 'higher' | 'lower'
}

const props = defineProps<{
  results: Result[]
}>()

const copy = useCopy()
const { isRtl } = useLocaleInfo()
const { target, isVisible } = useRevealAnimation()
const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
const scale = computed(() => Math.max(...props.results.flatMap(r => [r.before, r.after]), 1))

// Health score: each metric normalised so higher is always better, then averaged (0–100)
const health = (key: 'before' | 'after') => Math.round(
  props.results.reduce((sum, r) => sum + (r.better === 'lower' ? 100 - r[key] : r[key]), 0) / props.results.length
)
const scoreBefore = computed(() => health('before'))
const scoreAfter = computed(() => health('after'))
const improvedCount = computed(() => props.results.filter(r => (r.better === 'lower' ? r.after < r.before : r.after > r.before)).length)

const { el: scoreEl, display: scoreDisplay } = useCountUp(() => scoreAfter.value, { duration: 1.8 })

const R = 52
const C = 2 * Math.PI * R
const arc = (value: number) => C - (value / 100) * C

const highlights = computed(() => props.results.map((r) => {
  const ratio = r.better === 'lower' ? r.before / r.after : r.after / r.before
  return {
    metric: r.metric,
    text: ratio >= 2 ? `${ratio.toFixed(1)}×` : `${Math.round(Math.abs((r.after - r.before) / r.before) * 100)}%`,
    icon: r.better === 'lower' ? 'i-lucide-arrow-down-right' : 'i-lucide-arrow-up-right'
  }
}))

// status bar flips from "running" to "done" once the rows have counted up
const done = ref(false)
const { start } = useTimeoutFn(() => {
  done.value = true
}, 2600, { immediate: false })
watch(isVisible, (v) => {
  if (!v) return
  if (reduceMotion.value) done.value = true
  else start()
})

const command = 'ngs benchmark --clients=all --window=6mo'
const lineOf = (i: number) => 3 + i * 3
</script>

<template>
  <div
    ref="target"
    class="reveal grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
    :class="isVisible && 'reveal-visible'"
  >
    <!-- summary: health score ring -->
    <div
      ref="scoreEl"
      class="relative flex flex-col overflow-hidden rounded-2xl border border-default bg-default/70 p-6 shadow-xl backdrop-blur-md"
    >
      <span
        class="border-beam absolute inset-0 opacity-60"
        aria-hidden="true"
      />
      <p class="font-mono text-[11px] tracking-wider text-dimmed uppercase">
        {{ copy.services.results.healthScore }}
      </p>

      <div class="relative mx-auto my-6 size-40">
        <div class="absolute inset-4 animate-pulse-glow rounded-full bg-signal-500/15 blur-2xl" />
        <svg
          viewBox="0 0 120 120"
          class="relative size-full -rotate-90"
          role="img"
          :aria-label="fill(copy.services.results.healthAria, { before: scoreBefore, after: scoreAfter })"
        >
          <circle
            cx="60"
            cy="60"
            :r="R"
            fill="none"
            stroke-width="8"
            class="stroke-(--ui-bg-accented)"
          />
          <circle
            cx="60"
            cy="60"
            :r="R"
            fill="none"
            stroke-width="8"
            stroke-linecap="round"
            class="stroke-red-400/40"
            :stroke-dasharray="C"
            :stroke-dashoffset="arc(isVisible ? scoreBefore : 0)"
            style="transition: stroke-dashoffset 900ms cubic-bezier(0.16, 1, 0.3, 1);"
          />
          <circle
            cx="60"
            cy="60"
            :r="R"
            fill="none"
            stroke-width="8"
            stroke-linecap="round"
            class="stroke-signal-500"
            :stroke-dasharray="C"
            :stroke-dashoffset="arc(isVisible ? scoreAfter : 0)"
            style="transition: stroke-dashoffset 1800ms cubic-bezier(0.16, 1, 0.3, 1) 300ms; filter: drop-shadow(0 0 4px rgb(76 175 80 / 0.6));"
          />
        </svg>
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <span class="font-mono text-4xl font-bold text-highlighted tabular-nums">{{ scoreDisplay }}</span>
          <span class="font-mono text-[11px] text-dimmed">/ 100</span>
        </div>
      </div>

      <div class="flex items-center justify-center gap-2 font-mono text-xs">
        <span class="text-dimmed line-through decoration-red-400/60">{{ scoreBefore }}</span>
        <UIcon
          name="i-lucide-arrow-right"
          class="size-3.5 text-dimmed"
        />
        <span class="font-semibold text-primary">{{ scoreAfter }}</span>
        <span class="rounded-full bg-primary/10 px-2 py-0.5 font-semibold text-primary"><span dir="ltr">+{{ scoreAfter - scoreBefore }}</span> {{ copy.services.results.pts }}</span>
      </div>

      <ul class="mt-6 grid grid-cols-2 gap-2">
        <li
          v-for="(h, i) in highlights"
          :key="h.metric"
          class="rounded-xl border border-default bg-elevated/60 p-3"
          :class="isVisible ? 'animate-chip-in' : 'opacity-0'"
          :style="{ animationDelay: `${600 + i * 120}ms` }"
        >
          <p class="flex items-center gap-1 font-mono text-base font-bold text-highlighted">
            <UIcon
              :name="h.icon"
              class="size-4 text-primary"
            />
            <span dir="ltr">{{ h.text }}</span>
          </p>
          <p class="mt-0.5 truncate text-[11px] text-muted">
            {{ h.metric }}
          </p>
        </li>
      </ul>
    </div>

    <!-- editor window: code, so always left-to-right -->
    <div
      class="relative overflow-hidden rounded-2xl border border-white/10 bg-navy-950/95 shadow-2xl shadow-navy-950/30 backdrop-blur-md"
      dir="ltr"
    >
      <div
        v-if="!reduceMotion"
        class="pointer-events-none absolute inset-0 animate-scanline bg-gradient-to-b from-transparent via-signal-400/[0.05] to-transparent"
        aria-hidden="true"
      />

      <!-- tab bar -->
      <div class="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] pl-4">
        <span class="size-2.5 shrink-0 rounded-full bg-[#ff5f56]" />
        <span class="size-2.5 shrink-0 rounded-full bg-[#ffbd2e]" />
        <span class="size-2.5 shrink-0 rounded-full bg-[#27c93f]" />
        <div class="ml-3 flex min-w-0 overflow-hidden font-mono text-[11px]">
          <span class="relative flex shrink-0 items-center gap-1.5 border-x border-white/10 bg-navy-950 px-3 py-2.5 text-white/80">
            <UIcon
              name="i-lucide-git-compare"
              class="size-3.5 text-signal-400"
            />
            client-results.diff
            <span class="absolute inset-x-0 top-0 h-px bg-signal-400 shadow-[0_0_8px] shadow-signal-400" />
          </span>
          <span class="hidden shrink-0 items-center gap-1.5 px-3 py-2.5 text-white/30 sm:flex">
            <UIcon
              name="i-simple-icons-typescript"
              class="size-3"
            />
            benchmark.ts
          </span>
        </div>
      </div>

      <!-- command -->
      <div class="grid grid-cols-[2.5rem_minmax(0,1fr)] items-center pt-3 font-mono text-[12.5px] sm:text-[13px]">
        <span class="pr-3 text-right text-white/20 select-none">1</span>
        <p class="flex min-w-0 items-center gap-2 py-1.5 pr-4">
          <span class="text-signal-400">$</span>
          <span
            class="inline-block overflow-hidden whitespace-nowrap text-white/80"
            :class="isVisible ? 'animate-typing' : 'w-0'"
            :style="{ '--chars': command.length, 'animationDuration': '1.2s' }"
          >{{ command }}</span>
          <span
            v-if="!done"
            class="h-3.5 w-1.5 shrink-0 animate-blink bg-signal-400"
          />
        </p>
        <span class="pr-3 text-right text-white/20 select-none">2</span>
        <span class="h-3" />
      </div>

      <div class="pb-3">
        <SiteImpactDiffRow
          v-for="(result, i) in props.results"
          :key="result.slug"
          v-bind="result"
          :max="scale"
          :line="lineOf(i)"
          :active="isVisible"
          :index="i"
        />
      </div>

      <!-- status bar -->
      <div class="flex items-center justify-between gap-3 border-t border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[11px]">
        <span
          class="flex items-center gap-1.5 transition-colors duration-500"
          :class="done ? 'text-signal-300' : 'text-white/50'"
          aria-live="polite"
        >
          <UIcon
            :name="done ? 'i-lucide-circle-check' : 'i-lucide-loader-circle'"
            class="size-3.5"
            :class="!done && 'animate-spin'"
          />
          <span :dir="isRtl ? 'rtl' : 'ltr'">{{ done ? fill(copy.services.results.improved, { count: improvedCount, total: results.length }) : copy.services.results.runningBenchmark }}</span>
        </span>
        <span class="hidden items-center gap-3 text-white/30 sm:flex">
          <span class="flex items-center gap-1">
            <UIcon
              name="i-lucide-git-branch"
              class="size-3"
            />main
          </span>
          <span>diff · UTF-8</span>
        </span>
      </div>
    </div>
  </div>
</template>
