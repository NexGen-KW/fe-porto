<script setup lang="ts">
import type { CatalogItem } from '~/data/catalog'

const props = defineProps<{
  item: CatalogItem
  index: number
}>()

// one benefit is in focus at a time, so the card stays calm and readable
const activeBenefit = ref(0)
const benefit = computed(() => props.item.benefits[activeBenefit.value]!)

const copy = useCopy()
const { el, handlePointerMove, handlePointerLeave } = useCardInteraction(2)
const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <article
    :id="item.slug"
    ref="el"
    class="spotlight-card group relative flex h-full scroll-mt-28 flex-col overflow-hidden rounded-3xl border border-default bg-default transition-shadow duration-500 hover:shadow-xl hover:shadow-signal-500/10"
    @pointermove="handlePointerMove"
    @pointerleave="handlePointerLeave"
  >
    <span
      class="border-beam absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      aria-hidden="true"
    />

    <!-- header band: animated icon on a light tinted surface, dots and the service number -->
    <div class="relative isolate flex items-center gap-5 overflow-hidden border-b border-default bg-navy-50/70 p-6 sm:gap-6 sm:p-7 dark:bg-white/[0.03]">
      <div
        class="absolute inset-0 -z-10 opacity-80 transition-opacity duration-500 group-hover:opacity-100 rtl:-scale-x-100"
        style="background-image: radial-gradient(var(--ui-border-accented) 1px, transparent 1.5px); background-size: 16px 16px; mask-image: linear-gradient(to right, transparent 10%, black 70%);"
        aria-hidden="true"
      />
      <div
        class="absolute -start-8 top-1/2 -z-10 size-44 -translate-y-1/2 animate-aurora rounded-full bg-signal-400/20 blur-3xl transition-colors duration-500 group-hover:bg-signal-400/35"
        aria-hidden="true"
      />
      <span
        class="absolute -end-1 -bottom-5 -z-10 font-display text-8xl leading-none font-bold text-navy-900/[0.07] transition-colors duration-500 select-none group-hover:text-primary/25 dark:text-white/[0.07]"
        aria-hidden="true"
      >{{ pad(index + 1) }}</span>

      <span
        class="flex size-20 shrink-0 items-center justify-center rounded-2xl border border-default bg-default shadow-sm transition-[translate,rotate,box-shadow] duration-500 group-hover:-translate-y-1 group-hover:-rotate-3 group-hover:shadow-lg group-hover:shadow-signal-500/15 sm:size-24"
        aria-hidden="true"
      >
        <SiteMotif
          :kind="item.motif"
          class="size-14 text-signal-600 sm:size-16 dark:text-signal-400"
        />
      </span>

      <div class="min-w-0">
        <p class="font-mono text-[11px] text-dimmed">
          {{ copy.services.card.service }} {{ pad(index + 1) }}
        </p>
        <h3 class="mt-1 font-display text-xl font-bold tracking-tight text-highlighted sm:text-2xl">
          {{ item.name }}
        </h3>
      </div>
    </div>

    <!-- content -->
    <div class="relative z-10 flex flex-1 flex-col p-6 sm:p-7">
      <p class="text-sm leading-relaxed text-muted">
        {{ item.brief ?? item.description }}
      </p>

      <div class="mt-auto pt-6">
        <div
          class="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2"
          role="tablist"
          :aria-label="`${item.name} — ${copy.services.card.benefits}`"
        >
          <button
            v-for="(entry, i) in item.benefits"
            :id="`${item.slug}-tab-${i}`"
            :key="entry.title"
            type="button"
            role="tab"
            class="flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-start text-sm transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            :class="activeBenefit === i
              ? 'border-primary/40 bg-primary/[0.07] font-semibold text-highlighted'
              : 'border-default text-muted hover:border-accented hover:text-highlighted'"
            :aria-selected="activeBenefit === i"
            :aria-controls="`${item.slug}-benefit`"
            @click="activeBenefit = i"
            @pointerenter="activeBenefit = i"
            @focus="activeBenefit = i"
          >
            <span
              class="inline-flex size-5 shrink-0 items-center justify-center rounded-full transition-all duration-300"
              :class="activeBenefit === i ? 'scale-110 bg-primary text-inverted' : 'bg-primary/10 text-primary'"
            >
              <UIcon
                name="i-lucide-check"
                class="size-3"
              />
            </span>
            <span class="min-w-0 leading-snug">{{ entry.title }}</span>
          </button>
        </div>

        <div
          :id="`${item.slug}-benefit`"
          role="tabpanel"
          :aria-labelledby="`${item.slug}-tab-${activeBenefit}`"
          class="mt-2 min-h-[6.5rem] rounded-xl bg-elevated/60 px-4 py-3 sm:min-h-[5.25rem]"
        >
          <Transition
            mode="out-in"
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="translate-y-1 opacity-0"
            leave-active-class="transition duration-100 ease-in"
            leave-to-class="opacity-0"
          >
            <p
              :key="benefit.title"
              class="text-[13px] leading-relaxed text-muted"
            >
              {{ benefit.text }}
            </p>
          </Transition>
        </div>
      </div>
    </div>
  </article>
</template>
