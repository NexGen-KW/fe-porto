<script setup lang="ts">
interface Step {
  icon: string
  /** English script name for the stage, shown in the terminal */
  key: string
  title: string
  description: string
}

const props = defineProps<{
  steps: Step[]
}>()

const copy = useCopy()
const { target, isVisible, revealDelay } = useRevealAnimation()
const { container, line } = useScrollLineDraw('vertical')

function scriptName(key: string, i: number) {
  return `${String(i + 1).padStart(2, '0')}-${key}.sh`
}

// the pipeline "runs" once in view: stages before `running` have passed, the rest are queued
const running = ref(0)
const allPassed = computed(() => running.value >= props.steps.length)
let timer: ReturnType<typeof setInterval> | null = null

function stop() {
  if (timer) clearInterval(timer)
  timer = null
}

watch(isVisible, (visible) => {
  if (!visible || !import.meta.client) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    running.value = props.steps.length
    return
  }
  timer = setInterval(() => {
    running.value++
    if (allPassed.value) stop()
  }, 1100)
})

onBeforeUnmount(stop)

function state(i: number) {
  if (i < running.value) return 'passed'
  return i === running.value && isVisible.value ? 'running' : 'queued'
}
</script>

<template>
  <div
    ref="target"
    class="reveal relative overflow-hidden rounded-3xl border border-white/10 bg-navy-950 shadow-2xl"
    :class="isVisible && 'reveal-visible'"
  >
    <div
      class="pointer-events-none absolute inset-0 animate-grid-pan opacity-[0.05]"
      style="background-image: linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px); background-size: 56px 56px;"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -end-32 -bottom-32 size-96 animate-aurora rounded-full bg-signal-500/10 blur-[110px]"
      aria-hidden="true"
    />

    <div class="relative flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
      <span class="size-2.5 rounded-full bg-[#ff5f56]" />
      <span class="size-2.5 rounded-full bg-[#ffbd2e]" />
      <span class="size-2.5 rounded-full bg-[#27c93f]" />
      <span
        class="ms-2 font-mono text-[11px] text-white/40"
      ><bdi dir="ltr">./run-methodology.sh</bdi></span>
      <span class="ms-auto font-mono text-[11px] text-signal-400 tabular-nums">
        {{ Math.min(running, steps.length) }}/{{ steps.length }} {{ copy.services.process.stages }}
      </span>
    </div>
    <div class="relative h-0.5 bg-white/5">
      <div
        class="h-full origin-left bg-gradient-to-r from-signal-500 to-signal-300 transition-transform duration-700 ease-out rtl:origin-right rtl:bg-gradient-to-l"
        :style="{ transform: `scaleX(${Math.min(running, steps.length) / steps.length})` }"
      />
    </div>

    <div
      ref="container"
      class="relative px-5 py-8 sm:px-8 sm:py-10"
    >
      <!-- spine that draws as you scroll -->
      <div
        class="absolute start-[2.4rem] top-10 bottom-10 w-px bg-white/10 sm:start-[3.4rem]"
        aria-hidden="true"
      >
        <div
          ref="line"
          class="size-full origin-top bg-gradient-to-b from-signal-400 via-signal-500 to-signal-400/20"
        />
      </div>

      <ol class="space-y-5">
        <li
          v-for="(step, i) in steps"
          :key="step.key"
          class="reveal relative flex gap-4 sm:gap-6"
          :class="isVisible && 'reveal-visible'"
          :style="{ transitionDelay: revealDelay(i) }"
        >
          <!-- stage status node -->
          <span
            class="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-xl border bg-navy-950 transition-colors duration-500 sm:size-12"
            :class="{
              'border-signal-400/60 text-signal-400 shadow-lg shadow-signal-500/20': state(i) === 'passed',
              'border-signal-300 text-signal-300': state(i) === 'running',
              'border-white/15 text-white/30': state(i) === 'queued'
            }"
          >
            <span
              v-if="state(i) === 'running'"
              class="absolute inset-0 animate-ping rounded-xl border border-signal-400/50"
              aria-hidden="true"
            />
            <UIcon
              :name="state(i) === 'passed' ? 'i-lucide-check' : state(i) === 'running' ? 'i-lucide-loader-circle' : step.icon"
              class="size-5"
              :class="state(i) === 'running' && 'animate-spin'"
            />
          </span>

          <div
            class="group relative flex-1 overflow-hidden rounded-2xl border p-5 transition-all duration-500 hover:border-signal-400/40 hover:bg-white/[0.06]"
            :class="state(i) === 'queued' ? 'border-white/5 bg-white/[0.02]' : 'border-white/10 bg-white/[0.04]'"
          >
            <span
              class="pointer-events-none absolute end-3 -top-3 font-display text-7xl leading-none font-bold text-white/[0.04] select-none"
              aria-hidden="true"
            >{{ String(i + 1).padStart(2, '0') }}</span>

            <div class="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px]">
              <span
                class="text-signal-400/90"
                dir="ltr"
              >$ {{ scriptName(step.key, i) }}</span>
              <span
                class="rounded-full px-2 py-0.5 transition-colors duration-500"
                :class="{
                  'bg-signal-500/15 text-signal-300': state(i) === 'passed',
                  'bg-white/10 text-white/70': state(i) === 'running',
                  'bg-white/5 text-white/30': state(i) === 'queued'
                }"
              >{{ state(i) === 'passed' ? copy.services.process.exit : state(i) === 'running' ? copy.services.process.running : copy.services.process.queued }}</span>
            </div>

            <div class="mt-3 flex items-center gap-2">
              <UIcon
                :name="step.icon"
                class="size-4 text-white/50"
              />
              <h3 class="font-display text-lg font-semibold text-white">
                {{ step.title }}
              </h3>
            </div>
            <p class="mt-1.5 max-w-2xl text-sm leading-relaxed text-white/60">
              {{ step.description }}
            </p>
          </div>
        </li>
      </ol>
    </div>

    <div class="relative flex items-center gap-2 border-t border-white/10 px-5 py-3.5 sm:px-8">
      <span class="font-mono text-xs text-signal-400">$</span>
      <span class="font-mono text-xs text-white/50">
        {{ allPassed ? copy.services.process.allPassed : copy.services.process.runningPipeline }}
      </span>
      <span class="h-3.5 w-[7px] animate-blink bg-signal-400" />
    </div>
  </div>
</template>
