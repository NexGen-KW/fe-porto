<script setup lang="ts">
const props = withDefaults(defineProps<{
  icon: string
  value: number
  suffix?: string
  prefix?: string
  label: string
  detail: string
  decimals?: number
  index?: number
  active?: boolean
}>(), {
  suffix: '',
  prefix: '',
  decimals: 0,
  index: 0,
  active: true
})

const copy = useCopy()
// symbol suffixes ("+") stay glued to the number; word suffixes (" yrs") follow the page direction
const wordSuffix = computed(() => /^\s/.test(props.suffix))
const { el, display } = useCountUp(() => props.value, { decimals: props.decimals })

// decorative, deterministic upward trend so SSR and client render the same path
const trend = computed(() => {
  const points = Array.from({ length: 12 }, (_, i) => {
    const wave = Math.sin((i + 1) * (1.3 + props.index * 0.45)) * 5
    const y = 30 - i * 1.9 + wave
    return { x: (i / 11) * 100, y: Math.max(4, Math.min(34, y)) }
  })
  const line = points.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
  const last = points[points.length - 1]!
  return { line, area: `${line} L100 40 L0 40 Z`, lastY: last.y }
})
</script>

<template>
  <div
    ref="el"
    class="group relative overflow-hidden bg-navy-950 p-6 transition-colors duration-300 hover:bg-navy-900 sm:p-7"
  >
    <div class="flex items-center justify-between">
      <span class="inline-flex size-10 items-center justify-center rounded-xl bg-signal-500/10 text-signal-400 ring-1 ring-signal-400/20 transition-transform duration-300 group-hover:scale-110">
        <UIcon
          :name="icon"
          class="size-5"
        />
      </span>
      <span class="flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-white/40 uppercase">
        <span
          class="size-1.5 animate-pulse-glow rounded-full bg-signal-400"
          :style="{ animationDelay: `${index * -0.7}s` }"
        />
        {{ copy.common.live }}
      </span>
    </div>

    <p class="mt-5 font-mono text-3xl font-bold tabular-nums text-white sm:text-4xl">
      <span dir="ltr">{{ prefix }}{{ display.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) }}{{ wordSuffix ? '' : suffix }}</span>{{ wordSuffix ? suffix : '' }}
    </p>
    <p class="mt-1 text-sm font-semibold text-white/80">
      {{ label }}
    </p>
    <p class="mt-1 font-mono text-xs text-white/40">
      {{ detail }}
    </p>

    <svg
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      class="mt-5 h-10 w-full overflow-visible"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          :id="`trend-fill-${index}`"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="0"
            stop-color="var(--color-signal-400)"
            stop-opacity="0.28"
          />
          <stop
            offset="1"
            stop-color="var(--color-signal-400)"
            stop-opacity="0"
          />
        </linearGradient>
      </defs>
      <path
        :d="trend.area"
        :fill="`url(#trend-fill-${index})`"
        class="transition-opacity duration-1000"
        :class="active ? 'opacity-100' : 'opacity-0'"
        :style="{ transitionDelay: `${600 + index * 150}ms` }"
      />
      <path
        v-if="active"
        :d="trend.line"
        fill="none"
        stroke="var(--color-signal-400)"
        stroke-width="1.5"
        vector-effect="non-scaling-stroke"
        pathLength="100"
        stroke-dasharray="100"
        class="animate-draw-line"
        :style="{ animationDelay: `${index * 150}ms` }"
      />
    </svg>
  </div>
</template>
