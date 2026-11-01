<script setup lang="ts">
import { motion } from 'motion-v'

const props = withDefaults(defineProps<{
  icon: string
  value: number
  suffix?: string
  prefix?: string
  label: string
  detail?: string
  hash: string
  index: number
  active?: boolean
}>(), {
  suffix: '',
  prefix: '',
  detail: '',
  active: true
})

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]
const { isRtl } = useLocaleInfo()
// symbol suffixes ("+") stay glued to the number; word suffixes (" yrs") follow the page direction
const wordSuffix = computed(() => /^\s/.test(props.suffix))
const { el, display } = useCountUp(() => props.value)

// decorative commit-activity bars, deterministic per row
const bars = computed(() => Array.from({ length: 16 }, (_, i) =>
  Math.round(30 + Math.abs(Math.sin((i + 1) * (0.9 + props.index * 0.37))) * 70)
))
</script>

<template>
  <li
    ref="el"
    class="group"
  >
    <motion.div
      class="flex items-center gap-4 p-5 transition-colors duration-300 hover:bg-white/[0.04] sm:gap-5 sm:p-6"
      :initial="{ opacity: 0, x: isRtl ? 20 : -20 }"
      :while-in-view="{ opacity: 1, x: 0 }"
      :in-view-options="{ once: true, margin: '-60px' }"
      :transition="{ duration: 0.45, delay: index * 0.1, ease }"
    >
      <span class="hidden shrink-0 font-mono text-xs text-signal-300/70 sm:inline">{{ hash }}</span>
      <span class="relative inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-signal-500/10 text-signal-400 ring-1 ring-signal-400/20 transition-transform duration-300 group-hover:scale-110">
        <UIcon
          :name="icon"
          class="size-5"
        />
      </span>

      <div class="min-w-0 flex-1">
        <p class="font-mono text-2xl font-bold tabular-nums text-white sm:text-3xl">
          <span dir="ltr">{{ prefix }}{{ display.toLocaleString('en-US') }}{{ wordSuffix ? '' : suffix }}</span>{{ wordSuffix ? suffix : '' }}
        </p>
        <p class="truncate text-sm text-white/70">
          {{ label }}<span
            v-if="detail"
            class="hidden font-mono text-xs text-white/35 md:inline"
          > — {{ detail }}</span>
        </p>
      </div>

      <!-- activity bars -->
      <div
        class="hidden h-9 shrink-0 items-end gap-[3px] sm:flex"
        aria-hidden="true"
      >
        <span
          v-for="(height, b) in bars"
          :key="b"
          class="w-1 origin-bottom rounded-full bg-signal-400/70 transition-transform duration-700 ease-out group-hover:bg-signal-300"
          :class="active ? 'scale-y-100' : 'scale-y-0'"
          :style="{ height: `${height}%`, transitionDelay: `${index * 100 + b * 35}ms` }"
        />
      </div>

      <UIcon
        name="i-lucide-check-circle-2"
        class="size-4 shrink-0 text-signal-400"
      />
    </motion.div>
  </li>
</template>
