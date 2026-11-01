<script setup lang="ts">
import { company } from '~/data/company'

interface Metric {
  icon: string
  value: number
  suffix?: string
  prefix?: string
  label: string
  detail: string
  decimals?: number
}

defineProps<{
  metrics: Metric[]
}>()

const { target, isVisible } = useRevealAnimation()

const copy = useCopy()
const { intlLocale } = useLocaleInfo()

// Kuwait local time, filled in on the client so SSR markup stays stable
const clock = ref('--:--:--')
let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  const tick = () => {
    clock.value = new Intl.DateTimeFormat(intlLocale.value, {
      timeZone: company.timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23'
    }).format(new Date())
  }
  tick()
  timer = setInterval(tick, 1000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <section
    :data-nav-label="copy.sections.metrics"
    class="relative isolate overflow-hidden bg-navy-950 py-20 sm:py-24"
  >
    <div
      class="pointer-events-none absolute inset-0 -z-10 animate-grid-pan opacity-[0.06]"
      style="background-image: linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px); background-size: 56px 56px;"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -top-1/2 left-1/2 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 animate-aurora rounded-full bg-signal-500/10 opacity-60 blur-[130px]"
      aria-hidden="true"
    />

    <div class="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <span class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-xs font-medium text-signal-300/90 backdrop-blur-sm">
          <span class="relative flex size-1.5">
            <span class="absolute inline-flex size-full animate-ping rounded-full bg-signal-400 opacity-75" />
            <span class="relative inline-flex size-1.5 rounded-full bg-signal-400" />
          </span>
          {{ copy.liveMetrics.badge }}
        </span>
        <h2 class="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {{ copy.liveMetrics.title }}
        </h2>
      </div>

      <!-- mission-control console -->
      <div
        ref="target"
        class="reveal relative mt-14 overflow-hidden rounded-3xl border border-white/10 bg-navy-900/50 shadow-2xl backdrop-blur-sm"
        :class="isVisible && 'reveal-visible'"
      >
        <span
          class="border-beam absolute inset-0 opacity-50"
          aria-hidden="true"
        />

        <div class="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-white/10 bg-white/5 px-5 py-3 font-mono text-[11px]">
          <span class="flex items-center gap-1.5">
            <span class="size-2.5 rounded-full bg-[#ff5f56]" />
            <span class="size-2.5 rounded-full bg-[#ffbd2e]" />
            <span class="size-2.5 rounded-full bg-[#27c93f]" />
          </span>
          <span
            class="text-white/40"
            dir="ltr"
          >ngs-control — status</span>
          <span class="ms-auto flex items-center gap-2 text-signal-400">
            <span class="relative flex size-2">
              <span class="absolute inline-flex size-full animate-ping rounded-full bg-signal-400 opacity-75" />
              <span class="relative inline-flex size-2 rounded-full bg-signal-400" />
            </span>
            {{ copy.liveMetrics.operational }}
          </span>
          <span class="text-white/50 tabular-nums"><span dir="ltr">{{ clock }}</span> {{ copy.liveMetrics.timezone }}</span>
        </div>

        <div class="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          <SiteLiveMetricTile
            v-for="(metric, i) in metrics"
            :key="metric.label"
            v-bind="metric"
            :index="i"
            :active="isVisible"
          />
        </div>

        <!-- scrolling health checks -->
        <div class="overflow-hidden border-t border-white/10 py-3 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div class="flex w-max animate-marquee-half hover:[animation-play-state:paused]">
            <ul
              v-for="dup in 4"
              :key="dup"
              class="flex shrink-0 gap-8 pe-8 font-mono text-[11px] text-white/50"
              :aria-hidden="dup > 1"
            >
              <li
                v-for="check in copy.liveMetrics.checks"
                :key="check"
                class="flex items-center gap-2 whitespace-nowrap"
              >
                <UIcon
                  name="i-lucide-check"
                  class="size-3.5 text-signal-400"
                />
                {{ check }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
