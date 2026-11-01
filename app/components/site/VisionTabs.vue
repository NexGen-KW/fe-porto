<script setup lang="ts">
import { pillars as pillarBase } from '~/data/company'

const copy = useCopy()
const pillars = computed(() => pillarBase.map(pillar => ({ ...pillar, ...copy.value.about.vision.pillars[pillar.key] })))

const active = ref(0)
const paused = ref(false)
// auto-advance only starts on the client, and never under reduced motion
const autoplay = ref(false)

onMounted(() => {
  autoplay.value = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
})

function next() {
  active.value = (active.value + 1) % pillarBase.length
}

const { target, isVisible } = useRevealAnimation()
const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <!-- three panels: the active one opens wide (desktop) or tall (mobile), the others fold down to a label -->
  <div
    ref="target"
    class="reveal flex flex-col gap-3 lg:h-[23rem] lg:flex-row lg:gap-4"
    :class="isVisible && 'reveal-visible'"
    @pointerenter="paused = true"
    @pointerleave="paused = false"
    @focusin="paused = true"
    @focusout="paused = false"
  >
    <article
      v-for="(pillar, i) in pillars"
      :key="pillar.key"
      class="group relative isolate flex flex-col overflow-hidden rounded-3xl border transition-[flex-grow,background-color,border-color,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:min-w-0 lg:basis-0"
      :class="active === i
        ? 'border-white/10 bg-navy-950 text-white shadow-2xl shadow-signal-500/10 lg:grow-[6]'
        : 'border-default bg-elevated/40 hover:border-primary/40 hover:bg-elevated/70 lg:grow'"
    >
      <!-- active panel dressing -->
      <template v-if="active === i">
        <div
          class="pointer-events-none absolute -end-20 -top-24 -z-10 size-80 animate-aurora rounded-full bg-signal-500/20 blur-[90px]"
          aria-hidden="true"
        />
        <div
          class="pointer-events-none absolute inset-0 -z-10 animate-grid-pan opacity-[0.06]"
          style="background-image: linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px); background-size: 56px 56px;"
          aria-hidden="true"
        />
        <UIcon
          :name="pillar.icon"
          class="pointer-events-none absolute -end-8 -bottom-10 -z-10 size-56 animate-float-slow text-signal-400/10"
          aria-hidden="true"
        />
        <span
          class="border-beam absolute inset-0 opacity-50"
          aria-hidden="true"
        />
      </template>

      <button
        :id="`pillar-tab-${pillar.key}`"
        type="button"
        class="flex w-full shrink-0 items-center gap-4 p-5 text-start focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary lg:p-7"
        :class="active !== i && 'lg:h-full lg:flex-col lg:items-center lg:justify-between lg:px-3'"
        :aria-expanded="active === i"
        :aria-controls="`pillar-panel-${pillar.key}`"
        @click="active = i"
      >
        <span
          class="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl transition-all duration-500"
          :class="active === i
            ? 'bg-signal-500/15 text-signal-400 ring-1 ring-signal-400/30'
            : 'bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-inverted'"
        >
          <UIcon
            :name="pillar.icon"
            class="size-6"
          />
        </span>
        <span
          class="min-w-0 flex-1"
          :class="active !== i && 'lg:flex lg:flex-none lg:rotate-180 lg:items-center lg:gap-3 lg:[writing-mode:vertical-rl]'"
        >
          <span
            class="block font-mono text-[11px]"
            :class="active === i ? 'text-signal-300' : 'text-dimmed'"
          >{{ pad(i + 1) }} / {{ pad(pillars.length) }}</span>
          <span
            class="block font-display text-xl font-bold tracking-tight"
            :class="active === i ? 'text-white lg:text-3xl' : 'text-highlighted'"
          >{{ pillar.title }}</span>
        </span>
        <UIcon
          :name="active === i ? 'i-lucide-minus' : 'i-lucide-plus'"
          class="size-5 shrink-0 transition-transform duration-500"
          :class="active === i ? 'text-signal-400' : 'text-dimmed group-hover:rotate-90 group-hover:text-primary'"
        />
      </button>

      <!-- body: grid-rows trick animates the height on mobile -->
      <div
        :id="`pillar-panel-${pillar.key}`"
        role="region"
        :aria-labelledby="`pillar-tab-${pillar.key}`"
        class="grid transition-[grid-template-rows] duration-500 ease-out"
        :class="active === i ? 'grid-rows-[1fr] lg:flex-1' : 'grid-rows-[0fr] lg:hidden'"
      >
        <div class="overflow-hidden">
          <p
            class="px-5 pb-6 text-base leading-relaxed text-white/80 transition-opacity duration-500 lg:px-7 lg:font-display lg:text-xl lg:leading-relaxed"
            :class="active === i ? 'opacity-100 delay-300' : 'opacity-0'"
          >
            {{ pillar.text }}
          </p>
        </div>
      </div>

      <!-- timer bar: when it fills, the next panel opens -->
      <span
        v-if="active === i"
        class="absolute inset-x-0 bottom-0 h-0.5 bg-white/10"
      >
        <span
          v-if="autoplay && isVisible"
          class="block h-full origin-left animate-progress-fill bg-signal-400 rtl:origin-right"
          :style="{ animationDuration: '10s', animationPlayState: paused ? 'paused' : 'running' }"
          @animationend="next"
        />
      </span>
    </article>
  </div>
</template>
