<script setup lang="ts">
import { company } from '~/data/company'

const { target, isVisible } = useRevealAnimation()

// the founding year rolls up from the turn of the century
const { el: yearEl, display } = useCountUp(company.founded - 2000, { duration: 2.2 })
const year = computed(() => 2000 + display.value)

const copy = useCopy()
const factIcons = ['i-lucide-map-pin', 'i-lucide-wrench', 'i-lucide-life-buoy']
const facts = computed(() => copy.value.about.story.facts.map((fact, i) => ({ ...fact, icon: factIcons[i]! })))
</script>

<template>
  <div
    ref="target"
    class="reveal grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16"
    :class="isVisible && 'reveal-visible'"
  >
    <div class="lg:col-span-6">
      <span class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-xs font-semibold tracking-wide text-primary uppercase">
        {{ copy.about.story.eyebrow }}
      </span>
      <h2 class="mt-4 font-display text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">
        {{ copy.about.story.title }}
      </h2>
      <p class="mt-5 border-s-2 border-primary/40 ps-5 text-base leading-relaxed text-muted">
        {{ copy.about.story.lead }}
      </p>
      <p class="mt-4 text-base leading-relaxed text-muted">
        {{ copy.about.story.body }}
      </p>
    </div>

    <div class="relative lg:col-span-6">
      <div
        class="pointer-events-none absolute -inset-6 animate-aurora rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <div class="relative overflow-hidden rounded-3xl border border-default bg-elevated/50 p-6 sm:p-8">
        <div
          class="pointer-events-none absolute inset-0 animate-grid-pan opacity-60"
          style="background-image: linear-gradient(to right, var(--ui-border) 1px, transparent 1px), linear-gradient(to bottom, var(--ui-border) 1px, transparent 1px); background-size: 56px 56px; mask-image: radial-gradient(ellipse 80% 70% at 50% 0%, black, transparent);"
          aria-hidden="true"
        />
        <span
          class="border-beam absolute inset-0 opacity-60"
          aria-hidden="true"
        />

        <div class="relative">
          <p class="flex items-center gap-2 font-mono text-xs text-primary">
            <span class="relative flex size-1.5">
              <span class="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
              <span class="relative inline-flex size-1.5 rounded-full bg-primary" />
            </span>
            {{ copy.about.story.started }}
          </p>
          <p
            ref="yearEl"
            data-outline
            class="mt-2 font-display text-[5.5rem] leading-none font-bold tabular-nums sm:text-[8rem]"
            :aria-label="fill(copy.about.story.foundedAria, { year: company.founded })"
          >
            {{ year }}
          </p>

          <ul class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <li
              v-for="(fact, i) in facts"
              :key="fact.label"
              class="group rounded-2xl border border-default bg-default/70 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
            >
              <UIcon
                :name="fact.icon"
                class="size-5 animate-bob text-primary"
                :style="{ animationDelay: `${i * -0.9}s` }"
              />
              <p class="mt-3 font-mono text-[11px] text-dimmed">
                {{ fact.label }}
              </p>
              <p class="mt-0.5 text-sm font-semibold text-highlighted">
                {{ fact.value }}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
[data-outline] {
  color: transparent;
  -webkit-text-stroke: 1.5px var(--ui-primary);
  background: linear-gradient(120deg, transparent 40%, color-mix(in oklab, var(--ui-primary) 55%, transparent) 50%, transparent 60%) 0 0 / 250% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  animation: year-sheen 5s ease-in-out infinite;
}

@keyframes year-sheen {
  0%, 100% { background-position: 120% 0; }
  50% { background-position: -20% 0; }
}
</style>
