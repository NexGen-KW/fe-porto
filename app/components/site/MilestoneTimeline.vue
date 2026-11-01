<script setup lang="ts">
import { company, milestoneIcons } from '~/data/company'

const copy = useCopy()
const milestones = computed(() => copy.value.about.milestones.steps.map((step, i) => ({
  ...step,
  phase: fill(step.phase, { year: company.founded }),
  icon: milestoneIcons[i]!
})))
const next = computed(() => copy.value.about.milestones.next)

// the last milestone is "now"; after it the line simply keeps going, so there is no end date to maintain
const nowIndex = computed(() => milestones.value.length - 1)

const { target, isVisible, revealDelay } = useRevealAnimation({ threshold: 0.1 })

const STEP = 220
const delay = (i: number) => revealDelay(i, STEP, 1100)
</script>

<template>
  <div ref="target">
    <ol class="grid grid-cols-1 lg:grid-cols-5">
      <li
        v-for="(milestone, i) in milestones"
        :key="milestone.title"
        class="group relative ps-16 pb-10 lg:ps-0 lg:pe-6 lg:pb-0"
      >
        <!-- track to the next stop: a quiet rail, with a blue fill that draws in stop by stop -->
        <span
          class="absolute start-[22px] top-11 bottom-0 w-px -translate-x-1/2 lg:start-11 lg:end-0 lg:top-[22px] lg:bottom-auto lg:h-px lg:w-auto lg:translate-x-0 rtl:translate-x-1/2 rtl:lg:translate-x-0"
          :class="i < nowIndex ? 'bg-(--ui-border)' : 'border-s border-dashed border-(--ui-border-accented) lg:border-s-0 lg:border-t'"
          aria-hidden="true"
        >
          <span
            v-if="i < nowIndex"
            class="absolute inset-0 bg-gradient-to-b from-navy-600 to-navy-400 transition-transform duration-700 ease-out lg:bg-gradient-to-r dark:from-navy-300 dark:to-navy-400 rtl:lg:bg-gradient-to-l"
            :class="isVisible ? 'scale-100' : 'origin-top scale-y-0 lg:origin-left lg:scale-x-0 lg:scale-y-100 rtl:lg:origin-right'"
            :style="{ transitionDelay: delay(i + 1) }"
          />
        </span>

        <!-- stop: the step's icon sits right on the line -->
        <span
          class="absolute start-0 top-0 z-10 flex size-11 items-center justify-center rounded-full transition-[scale,opacity,background-color,color,box-shadow] duration-500 group-hover:scale-110"
          :class="[
            i === nowIndex
              ? 'bg-navy-700 text-white shadow-lg shadow-navy-700/30 dark:bg-white dark:text-navy-800 dark:shadow-white/10'
              : 'border border-navy-700/20 bg-default text-navy-700 group-hover:border-navy-700/50 dark:border-white/20 dark:text-navy-300 dark:group-hover:border-white/50',
            isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          ]"
          :style="{ transitionDelay: delay(i) }"
          aria-hidden="true"
        >
          <UIcon
            :name="milestone.icon"
            class="size-5"
          />
          <!-- the one live signal on the timeline -->
          <span
            v-if="i === nowIndex"
            class="absolute end-0 top-0 flex size-3"
          >
            <span class="absolute inline-flex size-full animate-ping rounded-full bg-signal-400 opacity-60" />
            <span class="relative inline-flex size-3 rounded-full bg-signal-500 ring-2 ring-(--ui-bg)" />
          </span>
        </span>

        <div
          class="reveal lg:pt-16"
          :class="isVisible && 'reveal-visible'"
          :style="{ transitionDelay: delay(i) }"
        >
          <p
            class="font-mono text-[11px] tracking-wider uppercase"
            :class="i === nowIndex ? 'text-highlighted' : 'text-dimmed'"
          >
            {{ milestone.kicker }}
          </p>
          <p
            data-phase
            class="mt-1 font-display text-3xl font-bold tracking-tight transition-transform duration-300 group-hover:-translate-y-0.5 sm:text-4xl"
          >
            {{ milestone.phase }}
          </p>
          <h3 class="mt-3 text-sm font-semibold text-navy-700 dark:text-navy-300">
            {{ milestone.title }}
          </h3>
          <p class="mt-1 max-w-xs text-sm leading-relaxed text-muted">
            {{ milestone.description }}
          </p>
        </div>
      </li>

      <!-- the road ahead: unwritten, and it keeps going -->
      <li class="relative ps-16 lg:ps-0">
        <span
          class="absolute start-[22px] top-11 -bottom-16 w-px -translate-x-1/2 border-s border-dashed border-(--ui-border-accented) [mask-image:linear-gradient(to_bottom,black,transparent)] lg:start-11 lg:-end-[45vw] lg:top-[22px] lg:bottom-auto lg:h-px lg:w-auto lg:translate-x-0 lg:border-s-0 lg:border-t lg:[mask-image:linear-gradient(to_right,black,transparent_55%)] rtl:translate-x-1/2 rtl:lg:translate-x-0 rtl:lg:[mask-image:linear-gradient(to_left,black,transparent_55%)]"
          aria-hidden="true"
        >
          <!-- a soft light drifting forward along the open line -->
          <span class="absolute top-0 left-1/2 size-1.5 -translate-1/2 animate-travel-y rounded-full bg-navy-400 shadow-[0_0_8px_2px] shadow-navy-400/40 lg:start-0 lg:top-1/2 lg:animate-travel-x dark:bg-navy-300" />
        </span>

        <span
          class="absolute start-0 top-0 z-10 flex size-11 items-center justify-center rounded-full border border-dashed border-navy-700/40 bg-default text-navy-700/70 transition-[scale,opacity] duration-500 dark:border-white/40 dark:text-white/60"
          :class="isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'"
          :style="{ transitionDelay: delay(milestones.length) }"
          aria-hidden="true"
        >
          <UIcon
            name="i-lucide-infinity"
            class="size-5"
          />
        </span>

        <div
          class="reveal lg:pt-16"
          :class="isVisible && 'reveal-visible'"
          :style="{ transitionDelay: delay(milestones.length) }"
        >
          <p class="font-mono text-[11px] tracking-wider text-dimmed uppercase">
            {{ next.kicker }}
          </p>
          <p class="mt-1 flex items-center gap-2 font-display text-3xl font-bold tracking-tight text-dimmed sm:text-4xl">
            {{ next.phase }}
            <UIcon
              name="i-lucide-arrow-right"
              class="hidden size-5 animate-bob lg:block"
              aria-hidden="true"
            />
            <UIcon
              name="i-lucide-arrow-down"
              class="size-5 animate-bob lg:hidden"
              aria-hidden="true"
            />
          </p>
          <h3 class="mt-3 text-sm font-semibold text-navy-700 dark:text-navy-300">
            {{ next.title }}
          </h3>
          <p class="mt-1 max-w-xs text-sm leading-relaxed text-muted">
            {{ next.description }}
          </p>
        </div>
      </li>
    </ol>
  </div>
</template>

<style scoped>
/* stage names fade from full ink into the page, like a word still being written */
[data-phase] {
  background-image: linear-gradient(180deg, var(--ui-text-highlighted) 35%, color-mix(in oklab, var(--ui-text-highlighted) 35%, transparent));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
</style>
