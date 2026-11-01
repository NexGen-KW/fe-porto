<script setup lang="ts">
interface Entry {
  icon: string
  value: number
  suffix?: string
  prefix?: string
  label: string
  detail?: string
  hash: string
}

defineProps<{
  entries: Entry[]
}>()

const copy = useCopy()
const { target, isVisible } = useRevealAnimation()
</script>

<template>
  <div
    ref="target"
    class="reveal relative overflow-hidden rounded-3xl border border-white/10 bg-navy-950 text-white shadow-2xl"
    :class="isVisible && 'reveal-visible'"
  >
    <div
      class="pointer-events-none absolute inset-0 animate-grid-pan opacity-[0.05]"
      style="background-image: linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px); background-size: 56px 56px;"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -start-24 -top-32 size-80 animate-aurora rounded-full bg-signal-500/15 blur-[100px]"
      aria-hidden="true"
    />
    <span
      class="border-beam absolute inset-0 opacity-50"
      aria-hidden="true"
    />

    <div class="relative flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
      <span class="size-2.5 rounded-full bg-[#ff5f56]" />
      <span class="size-2.5 rounded-full bg-[#ffbd2e]" />
      <span class="size-2.5 rounded-full bg-[#27c93f]" />
      <span
        class="ms-2 truncate font-mono text-[11px] text-white/40"
      ><bdi dir="ltr">git log --stat --author=NexGen</bdi></span>
      <span class="ms-auto flex shrink-0 items-center gap-1.5 font-mono text-[11px] text-signal-400">
        <span class="relative flex size-1.5">
          <span class="absolute inline-flex size-full animate-ping rounded-full bg-signal-400 opacity-75" />
          <span class="relative inline-flex size-1.5 rounded-full bg-signal-400" />
        </span>
        {{ copy.common.live }}
      </span>
    </div>

    <ul class="relative divide-y divide-white/5">
      <SiteImpactLedgerRow
        v-for="(entry, i) in entries"
        :key="entry.hash"
        v-bind="entry"
        :index="i"
        :active="isVisible"
      />
    </ul>

    <div class="relative flex items-center gap-2 border-t border-white/10 px-5 py-3.5 sm:px-6">
      <span class="font-mono text-xs text-signal-400">$</span>
      <span class="font-mono text-xs text-white/50">{{ entries.length }} {{ copy.about.impact.entries }}</span>
      <span class="h-3.5 w-[7px] animate-blink bg-signal-400" />
    </div>
  </div>
</template>
