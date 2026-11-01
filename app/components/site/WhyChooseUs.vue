<script setup lang="ts">
import { useRafFn } from '@vueuse/core'
import { company, whyChooseUsIcons } from '~/data/company'

const { target, isVisible } = useRevealAnimation()

// the radar: three beacons spaced around the NGS core, a sweep lights each one in turn
const RADIUS = 34
const PERIOD_MS = 7800
const SLICE = 360 / whyChooseUsIcons.length

const copy = useCopy()
const points = computed(() => copy.value.about.why.points.map((point, i) => {
  const deg = i * SLICE
  const rad = (deg * Math.PI) / 180
  return {
    ...point,
    icon: whyChooseUsIcons[i]!,
    deg,
    x: Number((50 + RADIUS * Math.sin(rad)).toFixed(2)),
    y: Number((50 - RADIUS * Math.cos(rad)).toFixed(2)),
    above: Math.cos(rad) > 0
  }
}))

// rounded, so server and client render identical attributes
const fixed = (n: number) => Number(n.toFixed(2))

const ticks = Array.from({ length: 48 }, (_, i) => {
  const rad = (i / 48) * Math.PI * 2
  const long = i % 4 === 0
  const r1 = RADIUS + 1.6
  const r2 = RADIUS + (long ? 3.4 : 2.4)
  return {
    x1: fixed(50 + r1 * Math.sin(rad)),
    y1: fixed(50 - r1 * Math.cos(rad)),
    x2: fixed(50 + r2 * Math.sin(rad)),
    y2: fixed(50 - r2 * Math.cos(rad)),
    long
  }
})

const coords = `${company.geo.lat.toFixed(2)}°N · ${company.geo.lon.toFixed(2)}°E`

const active = ref(0)
const paused = ref(false)
const animated = ref(false)
const root = ref<HTMLElement | null>(null)
let elapsed = 0

// sweep angle and in-slice progress go straight to CSS variables, so the frame loop never re-renders the template
function setAngle(angle: number) {
  const a = ((angle % 360) + 360) % 360
  root.value?.style.setProperty('--sweep', `${a}deg`)
  root.value?.style.setProperty('--progress', String((a % SLICE) / SLICE))
  const next = Math.floor(a / SLICE)
  if (next !== active.value) active.value = next
}

const { resume } = useRafFn(({ delta }) => {
  if (paused.value || !isVisible.value) return
  elapsed = (elapsed + delta) % PERIOD_MS
  setAngle((elapsed / PERIOD_MS) * 360)
}, { immediate: false })

function focusPoint(i: number) {
  elapsed = ((i * SLICE + 2) / 360) * PERIOD_MS
  setAngle(i * SLICE + 2)
}

onMounted(() => {
  root.value = target.value
  setAngle(2)
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  animated.value = true
  resume()
})
</script>

<template>
  <div
    ref="target"
    class="reveal grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16"
    :class="isVisible && 'reveal-visible'"
    style="--sweep: 0deg; --progress: 0;"
  >
    <div>
      <span class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-xs font-semibold tracking-wide text-primary uppercase">
        {{ copy.about.why.eyebrow }}
      </span>
      <h2 class="mt-4 font-display text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">
        {{ copy.about.why.titleStart }} <span class="text-primary">{{ copy.about.why.titleBrand }}</span> {{ copy.about.why.titleEnd }}
      </h2>
      <p class="mt-5 text-base leading-relaxed text-muted">
        {{ copy.about.why.text }}
      </p>

      <!-- the three reasons, lit in step with the radar -->
      <ul
        class="mt-8 space-y-3"
        @pointerenter="paused = true"
        @pointerleave="paused = false"
      >
        <li
          v-for="(point, i) in points"
          :key="point.title"
        >
          <button
            type="button"
            class="group relative flex w-full items-start gap-4 overflow-hidden rounded-2xl border p-4 text-start transition-[background-color,border-color,box-shadow] duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            :class="active === i
              ? 'border-primary/40 bg-default shadow-lg shadow-signal-500/10'
              : 'border-transparent hover:border-default hover:bg-default/60'"
            :aria-pressed="active === i"
            @click="focusPoint(i)"
            @focus="focusPoint(i)"
            @pointerenter="focusPoint(i)"
          >
            <span
              class="inline-flex size-11 shrink-0 items-center justify-center rounded-xl transition-[background-color,color,scale] duration-500"
              :class="active === i ? 'scale-105 bg-primary text-inverted shadow-md shadow-signal-500/30' : 'bg-primary/10 text-primary'"
            >
              <UIcon
                :name="point.icon"
                class="size-5"
              />
            </span>
            <span class="min-w-0 flex-1">
              <span class="block font-semibold text-highlighted">{{ point.title }}</span>
              <span class="mt-1 block text-sm leading-relaxed text-muted">{{ point.text }}</span>
            </span>
            <!-- time until the sweep moves on -->
            <span
              v-if="animated && active === i"
              class="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-primary to-signal-300 [transform:scaleX(var(--progress))] rtl:origin-right rtl:bg-gradient-to-l"
              aria-hidden="true"
            />
          </button>
        </li>
      </ul>
    </div>

    <!-- the signal map -->
    <div
      class="relative mx-auto aspect-square w-full max-w-xs sm:max-w-md"
      @pointerenter="paused = true"
      @pointerleave="paused = false"
    >
      <div
        class="pointer-events-none absolute inset-[14%] animate-aurora rounded-full bg-signal-500/15 blur-3xl"
        aria-hidden="true"
      />
      <!-- dotted land grid, clipped to the radar disc -->
      <div
        class="pointer-events-none absolute inset-[16%] rounded-full opacity-70"
        style="background-image: radial-gradient(color-mix(in oklab, var(--ui-primary) 40%, transparent) 1px, transparent 1.6px); background-size: 12px 12px; mask-image: radial-gradient(circle, black 30%, transparent 72%);"
        aria-hidden="true"
      />
      <!-- the sweep: a fading wedge trailing a bright leading edge -->
      <div
        v-if="animated"
        class="pointer-events-none absolute inset-[16%] rounded-full"
        style="background: conic-gradient(from calc(var(--sweep) - 70deg), transparent 0deg, color-mix(in oklab, var(--color-signal-400) 30%, transparent) 69deg, transparent 70deg);"
        aria-hidden="true"
      />
      <div
        v-if="animated"
        class="pointer-events-none absolute top-[16%] left-1/2 h-[34%] w-0.5 origin-bottom bg-gradient-to-t from-signal-400/0 to-signal-400 [transform:translateX(-50%)_rotate(var(--sweep))]"
        aria-hidden="true"
      />

      <svg
        class="pointer-events-none absolute inset-0 size-full overflow-visible"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <!-- range rings + crosshair -->
        <circle
          v-for="r in [fixed(RADIUS * 0.66), fixed(RADIUS * 0.33)]"
          :key="r"
          cx="50"
          cy="50"
          :r="r"
          class="stroke-(--ui-border-accented)"
          stroke-width="0.3"
        />
        <path
          :d="`M50 ${50 - RADIUS} V${50 + RADIUS} M${50 - RADIUS} 50 H${50 + RADIUS}`"
          class="stroke-(--ui-border)"
          stroke-width="0.25"
          stroke-dasharray="1 1.5"
        />
        <!-- bezel ticks -->
        <line
          v-for="(t, k) in ticks"
          :key="k"
          :x1="t.x1"
          :y1="t.y1"
          :x2="t.x2"
          :y2="t.y2"
          :class="t.long ? 'stroke-primary/60' : 'stroke-(--ui-border-accented)'"
          :stroke-width="t.long ? 0.45 : 0.3"
        />
        <!-- the circuit that links the beacons: one continuous loop -->
        <circle
          cx="50"
          cy="50"
          :r="RADIUS"
          class="animate-dash-march stroke-primary/50"
          stroke-width="0.45"
          stroke-dasharray="1.5 1.5"
        />
        <!-- spokes from the core -->
        <line
          v-for="(point, i) in points"
          :key="point.title"
          :x1="fixed(50 + (point.x - 50) * 0.3)"
          :y1="fixed(50 + (point.y - 50) * 0.3)"
          :x2="point.x"
          :y2="point.y"
          class="transition-[stroke,opacity] duration-500"
          :class="active === i ? 'stroke-primary opacity-100' : 'stroke-primary/50 opacity-50'"
          :stroke-width="active === i ? 0.6 : 0.3"
        />
      </svg>

      <!-- core -->
      <div class="absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/40 bg-elevated shadow-xl shadow-signal-500/20 sm:size-20">
        <span
          class="border-beam absolute inset-0"
          aria-hidden="true"
        />
        <img
          src="/images/ngs-mark.png"
          alt=""
          class="relative h-6 w-auto object-contain sm:h-7 dark:brightness-0 dark:invert"
        >
      </div>

      <!-- beacons -->
      <div
        v-for="(point, i) in points"
        :key="point.title"
        class="absolute -translate-x-1/2 -translate-y-1/2"
        :class="active === i && 'z-10'"
        :style="{ left: `${point.x}%`, top: `${point.y}%` }"
      >
        <button
          type="button"
          class="relative flex size-11 items-center justify-center rounded-full border transition-[background-color,border-color,color,scale,box-shadow] duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:size-12"
          :class="active === i
            ? 'scale-110 border-primary bg-primary text-inverted shadow-lg shadow-signal-500/40'
            : 'border-default bg-elevated text-primary'"
          :aria-label="point.title"
          tabindex="-1"
          @click="focusPoint(i)"
        >
          <span
            v-if="active === i"
            class="absolute inset-0 animate-radar rounded-full border border-primary"
            aria-hidden="true"
          />
          <UIcon
            :name="point.icon"
            class="size-5"
          />
        </button>
        <!-- label (sm and up) -->
        <span
          class="absolute left-1/2 hidden w-max max-w-[8.5rem] -translate-x-1/2 rounded-xl border px-3 py-1 text-center text-xs leading-snug font-semibold backdrop-blur-sm transition-[background-color,border-color,color] duration-500 sm:block"
          :class="[
            point.above ? 'bottom-full mb-2.5' : 'top-full mt-2.5',
            active === i ? 'border-primary/40 bg-elevated text-highlighted' : 'border-default bg-elevated/70 text-muted'
          ]"
          aria-hidden="true"
        >{{ point.title }}</span>
      </div>

      <!-- map caption -->
      <p class="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 font-mono text-[10px] text-dimmed">
        <UIcon
          name="i-lucide-map-pin"
          class="size-3 text-primary"
        />
        <span dir="ltr">{{ coords }}</span> · {{ copy.about.why.hq }}
      </p>
    </div>
  </div>
</template>
