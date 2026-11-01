<script setup lang="ts">
const props = defineProps<{
  slug: string
  metric: string
  before: number
  after: number
  unit?: string
  max?: number
  /** Which direction counts as an improvement */
  better?: 'higher' | 'lower'
  /** First gutter line number for this block */
  line: number
  active: boolean
  index: number
}>()

const { el, display: beforeDisplay } = useCountUp(() => props.before, { duration: 1.4 })
const { el: afterEl, display: afterDisplay } = useCountUp(() => props.after, { duration: 1.4 })

const scale = computed(() => props.max ?? Math.max(props.before, props.after, 1))
const key = computed(() => props.slug)
const comment = computed(() => `// ${key.value}`)
const pct = computed(() => Math.round(((props.after - props.before) / props.before) * 100))
const delta = computed(() => `${pct.value >= 0 ? '+' : '−'}${Math.abs(pct.value)}%`)
const improved = computed(() => (props.better === 'lower' ? props.after < props.before : props.after > props.before))

// each block types in after the previous one
const typeDelay = computed(() => `${400 + props.index * 260}ms`)
const popDelay = computed(() => `${1500 + props.index * 260}ms`)
</script>

<template>
  <div
    ref="el"
    class="font-mono text-[12.5px] sm:text-[13px]"
  >
    <!-- comment line -->
    <div class="grid grid-cols-[2.5rem_minmax(0,1fr)] items-center">
      <span class="pr-3 text-right text-white/20 tabular-nums select-none">{{ line }}</span>
      <div class="flex min-w-0 items-center justify-between gap-3 py-1.5 pr-4 sm:pr-5">
        <span
          class="inline-block overflow-hidden whitespace-nowrap text-white/45"
          :class="active ? 'animate-typing' : 'w-0'"
          :style="{ '--chars': comment.length, 'animationDelay': typeDelay }"
        >{{ comment }}</span>
        <span
          v-if="active"
          class="inline-flex shrink-0 animate-pop-in items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold"
          :class="improved ? 'bg-signal-500/15 text-signal-300 ring-1 ring-signal-400/30' : 'bg-red-500/15 text-red-300'"
          :style="{ animationDelay: popDelay }"
        >
          <UIcon
            :name="after >= before ? 'i-lucide-trending-up' : 'i-lucide-trending-down'"
            class="size-3.5"
          />
          {{ delta }}
        </span>
      </div>
    </div>

    <!-- removed line (before) -->
    <div class="grid grid-cols-[2.5rem_minmax(0,1fr)] items-center bg-red-500/[0.07]">
      <span class="pr-3 text-right text-red-300/40 tabular-nums select-none">{{ line + 1 }}</span>
      <div class="flex items-center gap-3 py-1.5 pr-4 sm:pr-5">
        <span class="w-3 shrink-0 text-red-400/80">-</span>
        <span class="hidden w-36 shrink-0 truncate text-red-200/50 sm:inline">{{ key }}:</span>
        <div class="h-2 flex-1 overflow-hidden rounded-full bg-white/5">
          <div
            class="h-full rounded-full bg-gradient-to-r from-red-500/40 to-red-400/60"
            :style="{ width: `${Math.min((beforeDisplay / scale) * 100, 100)}%` }"
          />
        </div>
        <span class="w-12 shrink-0 text-right text-white/45 tabular-nums">{{ beforeDisplay }}{{ unit }}</span>
      </div>
    </div>

    <!-- added line (after) -->
    <div
      ref="afterEl"
      class="grid grid-cols-[2.5rem_minmax(0,1fr)] items-center bg-signal-500/[0.09]"
    >
      <span class="pr-3 text-right text-signal-300/50 tabular-nums select-none">{{ line + 2 }}</span>
      <div class="flex items-center gap-3 py-1.5 pr-4 sm:pr-5">
        <span class="w-3 shrink-0 text-signal-400">+</span>
        <span class="hidden w-36 shrink-0 truncate text-signal-200/70 sm:inline">{{ key }}:</span>
        <div class="relative h-2 flex-1 overflow-hidden rounded-full bg-white/5">
          <div
            class="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-signal-600 to-signal-300 shadow-[0_0_12px] shadow-signal-400/50"
            :style="{ width: `${Math.min((afterDisplay / scale) * 100, 100)}%` }"
          >
            <span class="absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
        </div>
        <span class="w-12 shrink-0 text-right font-semibold text-signal-300 tabular-nums">{{ afterDisplay }}{{ unit }}</span>
      </div>
    </div>
  </div>
</template>
