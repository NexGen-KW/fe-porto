<script setup lang="ts">
import { useIntervalFn, useMediaQuery } from '@vueuse/core'

interface Step {
  icon: string
  /** English, code-style identifier for the stage (shown in the console) */
  key: string
  title: string
  description: string
  duration?: string
  outputs?: string[]
}

const props = defineProps<{
  steps: Step[]
}>()

const STAGE_MS = 4200

const n = props.steps.length
const active = ref(0)

const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
const { target, isVisible, revealDelay } = useRevealAnimation()

const { pause, resume } = useIntervalFn(() => {
  active.value = (active.value + 1) % n
}, STAGE_MS, { immediate: false })

watchEffect(() => {
  if (isVisible.value && !reduceMotion.value) resume()
  else pause()
})

function select(i: number) {
  active.value = i
  // restart the countdown so the selected stage gets its full time
  pause()
  if (isVisible.value && !reduceMotion.value) resume()
}

type State = 'done' | 'active' | 'queued'
function stateOf(i: number): State {
  if (i < active.value) return 'done'
  if (i === active.value) return 'active'
  return 'queued'
}

const copy = useCopy()
const statusLabel = computed<Record<State, string>>(() => copy.value.processFlow.status)

const progress = computed(() => Math.round(((active.value + 1) / n) * 100))
const current = computed(() => props.steps[active.value]!)
</script>

<template>
  <div
    ref="target"
    class="reveal"
    :class="isVisible && 'reveal-visible'"
  >
    <!-- pipeline header -->
    <div class="mb-8 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
      <div class="flex items-center gap-2 text-muted">
        <span class="relative flex size-2">
          <span class="absolute inline-flex size-full animate-ping rounded-full bg-signal-400 opacity-75" />
          <span class="relative inline-flex size-2 rounded-full bg-signal-500" />
        </span>
        <span>pipeline<span class="text-dimmed">/</span><span class="text-primary">ngs-delivery</span></span>
      </div>
      <div class="flex items-center gap-3 text-dimmed">
        <span>{{ copy.processFlow.stage }} {{ String(active + 1).padStart(2, '0') }}/{{ String(n).padStart(2, '0') }}</span>
        <span class="relative h-1.5 w-28 overflow-hidden rounded-full bg-accented sm:w-40">
          <span
            class="absolute inset-y-0 start-0 rounded-full bg-gradient-to-r from-signal-600 to-signal-400 transition-[width] duration-700 ease-out rtl:bg-gradient-to-l"
            :style="{ width: `${progress}%` }"
          />
        </span>
        <span class="w-9 text-end text-primary">{{ progress }}%</span>
      </div>
    </div>

    <ol
      class="grid grid-cols-1 lg:grid-cols-[repeat(var(--n),minmax(0,1fr))]"
      :style="{ '--n': n }"
    >
      <li
        v-for="(step, i) in steps"
        :key="step.key"
        class="reveal group relative flex gap-5 pb-10 last:pb-0 lg:flex-col lg:items-center lg:gap-0 lg:px-3 lg:pb-0"
        :class="isVisible && 'reveal-visible'"
        :style="{ transitionDelay: revealDelay(i, 120) }"
      >
        <!-- connector to the next stage -->
        <div
          v-if="i < n - 1"
          class="pointer-events-none absolute start-8 top-8 -bottom-8 w-0.5 -translate-x-1/2 lg:start-1/2 lg:bottom-auto lg:h-0.5 lg:w-full lg:translate-x-0 lg:-translate-y-1/2 rtl:translate-x-1/2 rtl:lg:translate-x-0"
          aria-hidden="true"
        >
          <span class="absolute inset-0 rounded-full bg-[repeating-linear-gradient(to_bottom,var(--ui-border-accented)_0_6px,transparent_6px_12px)] lg:bg-[repeating-linear-gradient(to_right,var(--ui-border-accented)_0_6px,transparent_6px_12px)]" />
          <span
            class="absolute inset-0 origin-top scale-y-0 rounded-full bg-gradient-to-b from-signal-500 to-signal-300 transition-transform duration-700 ease-out lg:origin-left lg:scale-x-0 lg:scale-y-100 lg:bg-gradient-to-r rtl:lg:origin-right rtl:lg:bg-gradient-to-l"
            :class="i < active && 'scale-y-100 lg:scale-x-100'"
          />
          <span
            v-if="i === active && !reduceMotion"
            class="absolute inset-0 overflow-hidden rounded-full"
          >
            <span class="absolute start-0 h-10 w-full animate-beam-y bg-gradient-to-b from-transparent via-signal-400 to-transparent lg:top-0 lg:h-full lg:w-16 lg:animate-beam-x lg:bg-gradient-to-r" />
          </span>
        </div>

        <!-- node -->
        <button
          type="button"
          class="relative z-10 flex size-16 shrink-0 cursor-pointer items-center justify-center rounded-2xl border transition-all duration-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          :class="{
            'scale-110 border-transparent bg-navy-950 text-signal-400 shadow-lg shadow-signal-500/20 dark:bg-navy-900': stateOf(i) === 'active',
            'border-primary/30 bg-primary/5 text-primary dark:bg-primary/10': stateOf(i) === 'done',
            'border-default bg-elevated text-dimmed hover:border-primary/40 hover:text-primary': stateOf(i) === 'queued'
          }"
          :aria-label="`${copy.processFlow.showStage} ${i + 1}: ${step.title}`"
          :aria-pressed="i === active"
          @click="select(i)"
        >
          <template v-if="stateOf(i) === 'active'">
            <span class="absolute -inset-3 animate-pulse-glow rounded-[1.25rem] bg-signal-500/15 blur-xl" />
            <span class="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent" />
            <span class="border-beam absolute -inset-px" />
          </template>
          <UIcon
            :name="step.icon"
            class="relative size-7 transition-transform duration-500"
            :class="stateOf(i) === 'active' && 'animate-bob drop-shadow-[0_0_6px_rgb(98_193_105/0.6)]'"
          />
          <span
            class="absolute -end-2 -top-2 flex size-6 items-center justify-center rounded-full border font-mono text-[10px] font-bold transition-colors duration-500"
            :class="stateOf(i) === 'queued'
              ? 'border-default bg-elevated text-dimmed'
              : 'border-primary/40 bg-default text-primary'"
          >
            <UIcon
              v-if="stateOf(i) === 'done'"
              name="i-lucide-check"
              class="size-3.5"
            />
            <template v-else>{{ i + 1 }}</template>
          </span>
        </button>

        <!-- card -->
        <div
          class="relative min-w-0 flex-1 cursor-pointer overflow-hidden rounded-2xl border p-5 text-start transition-all duration-500 lg:mt-8 lg:w-full"
          :class="stateOf(i) === 'active'
            ? 'border-primary/40 bg-primary/[0.06] shadow-xl shadow-signal-500/10 lg:-translate-y-1'
            : 'border-default bg-elevated/40 hover:border-primary/30'"
          @click="select(i)"
        >
          <div
            v-if="stateOf(i) === 'active'"
            class="pointer-events-none absolute inset-0 opacity-60"
            style="background-image: linear-gradient(to right, var(--ui-border) 1px, transparent 1px), linear-gradient(to bottom, var(--ui-border) 1px, transparent 1px); background-size: 20px 20px; mask-image: radial-gradient(ellipse at top right, black, transparent 70%);"
          />

          <div class="relative">
            <div class="flex items-center justify-between gap-2 font-mono text-[11px]">
              <span
                class="text-dimmed"
                dir="ltr"
              >{{ String(i + 1).padStart(2, '0') }}-{{ step.key }}</span>
              <span
                class="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 transition-colors duration-500"
                :class="{
                  'bg-primary/15 text-primary': stateOf(i) === 'active',
                  'bg-signal-500/10 text-signal-600 dark:text-signal-400': stateOf(i) === 'done',
                  'bg-accented text-dimmed': stateOf(i) === 'queued'
                }"
              >
                <span
                  class="size-1.5 rounded-full"
                  :class="{
                    'animate-pulse bg-primary': stateOf(i) === 'active',
                    'bg-signal-500': stateOf(i) === 'done',
                    'bg-midnight-400': stateOf(i) === 'queued'
                  }"
                />
                {{ statusLabel[stateOf(i)] }}
              </span>
            </div>

            <h3 class="mt-3 text-lg font-semibold text-highlighted">
              {{ step.title }}
            </h3>
            <p class="mt-1.5 text-sm leading-relaxed text-muted">
              {{ step.description }}
            </p>

            <p
              v-if="step.duration"
              class="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-dimmed"
            >
              <UIcon
                name="i-lucide-timer"
                class="size-3.5 text-primary"
              />
              {{ step.duration }}
            </p>
          </div>

          <!-- per-stage countdown -->
          <span
            v-if="stateOf(i) === 'active' && !reduceMotion"
            :key="`bar-${active}`"
            class="absolute inset-x-0 bottom-0 h-0.5 origin-left animate-progress-fill bg-gradient-to-r from-signal-600 to-signal-300 rtl:origin-right rtl:bg-gradient-to-l"
            :style="{ animationDuration: `${STAGE_MS}ms` }"
          />
        </div>
      </li>
    </ol>

    <!-- live output console -->
    <div class="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-navy-950 shadow-2xl shadow-navy-950/20">
      <div class="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2.5">
        <span class="size-2.5 rounded-full bg-[#ff5f56]" />
        <span class="size-2.5 rounded-full bg-[#ffbd2e]" />
        <span class="size-2.5 rounded-full bg-[#27c93f]" />
        <span
          class="ms-2 font-mono text-[11px] text-white/40"
        ><bdi dir="ltr">ngs pipeline --watch</bdi></span>
      </div>

      <Transition
        mode="out-in"
        enter-active-class="transition duration-500 ease-out"
        enter-from-class="opacity-0 translate-y-2"
        leave-active-class="transition duration-200 ease-in"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <div
          :key="active"
          class="flex flex-col gap-4 px-5 py-5 font-mono text-[12.5px] sm:flex-row sm:items-center sm:justify-between sm:px-6"
        >
          <p class="text-white/70">
            <span class="text-signal-400">$</span>
            {{ copy.processFlow.runStage }} <span
              class="text-white"
              dir="ltr"
            >{{ current.key }}</span>
            <span class="text-white/40"> <span class="inline-block rtl:-scale-x-100">→</span> </span>
            <span class="text-signal-300">{{ copy.processFlow.artifacts }}</span>
          </p>
          <ul
            v-if="current.outputs?.length"
            class="flex flex-wrap gap-2"
          >
            <li
              v-for="(output, j) in current.outputs"
              :key="output"
              class="inline-flex animate-chip-in items-center gap-1.5 rounded-md border border-signal-500/25 bg-signal-500/10 px-2.5 py-1 text-[11.5px] text-signal-300"
              :style="{ animationDelay: `${150 + j * 120}ms` }"
            >
              <UIcon
                name="i-lucide-package-check"
                class="size-3.5"
              />
              {{ output }}
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  </div>
</template>
