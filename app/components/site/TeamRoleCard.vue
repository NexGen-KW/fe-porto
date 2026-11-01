<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  detail: string
  skills: string[]
  tools: { label: string, icon: string }[]
  active: boolean
  index: number
}>()

const copy = useCopy()
const { handlePointerMove, handlePointerLeave } = useListCardInteraction(4)

// rotate through brand gradients so neighbouring avatars differ
const gradients = [
  'from-signal-400 to-signal-700',
  'from-navy-400 to-navy-700',
  'from-signal-300 to-navy-600',
  'from-navy-300 to-signal-600'
]
</script>

<template>
  <article
    class="spotlight-card tilt-card group relative overflow-hidden rounded-2xl border border-default bg-elevated/50 p-6 transition-shadow duration-300 hover:shadow-xl hover:shadow-signal-500/10"
    @pointermove="handlePointerMove"
    @pointerleave="handlePointerLeave"
  >
    <span
      class="border-beam absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      aria-hidden="true"
    />
    <UIcon
      :name="icon"
      class="pointer-events-none absolute -end-4 -top-4 size-28 animate-float-slow text-primary/[0.05] transition-colors duration-500 group-hover:text-primary/10"
      :style="{ animationDelay: `${-index * 2}s` }"
      aria-hidden="true"
    />

    <div class="relative z-10">
      <div class="flex items-center justify-between">
        <span class="inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-navy-700 to-navy-900 text-signal-400 shadow-md ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
          <UIcon
            :name="icon"
            class="size-5"
          />
        </span>
        <span class="inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary/5 px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wide text-primary uppercase">
          <UIcon
            name="i-lucide-badge-check"
            class="size-3"
          />
          {{ copy.about.team.senior }}
        </span>
      </div>

      <h3 class="mt-5 font-display text-xl font-bold tracking-tight text-highlighted">
        {{ title }}
      </h3>
      <p class="mt-0.5 font-mono text-[11px] text-muted">
        {{ detail }}
      </p>

      <!-- specialisations -->
      <ul class="mt-4 flex flex-wrap gap-1.5">
        <li
          v-for="(skill, k) in skills"
          :key="skill"
          class="inline-flex items-center gap-1 rounded-md border border-default bg-default px-2 py-1 text-[11px] font-medium text-toned transition-colors duration-300 group-hover:border-primary/30"
          :class="active ? 'animate-chip-in' : 'opacity-0'"
          :style="{ animationDelay: `${300 + index * 120 + k * 70}ms` }"
        >
          <span class="size-1 rounded-full bg-primary" />
          {{ skill }}
        </li>
      </ul>

      <!-- toolkit: logos fan out on hover -->
      <div class="mt-5 flex items-center justify-between gap-3 border-t border-default pt-4">
        <span class="font-mono text-[10px] tracking-wide text-dimmed uppercase">{{ copy.about.team.toolkit }}</span>
        <ul class="flex items-center">
          <li
            v-for="(tool, i) in tools"
            :key="tool.label"
            class="-ms-2 inline-flex size-8 items-center justify-center rounded-full bg-gradient-to-br text-white ring-2 ring-(--ui-bg-elevated) transition-[margin,translate] duration-300 first:ms-0 group-hover:ms-1 group-hover:first:ms-0 hover:-translate-y-1"
            :class="[gradients[(i + index) % gradients.length], active ? 'animate-chip-in' : 'opacity-0']"
            :style="{ animationDelay: `${500 + index * 120 + i * 80}ms` }"
            :title="tool.label"
          >
            <UIcon
              :name="tool.icon"
              class="size-4"
            />
            <span class="sr-only">{{ tool.label }}</span>
          </li>
        </ul>
      </div>
    </div>
  </article>
</template>
