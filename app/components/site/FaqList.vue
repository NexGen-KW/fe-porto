<script setup lang="ts">
interface Faq {
  label: string
  icon: string
  content: string
}

defineProps<{
  items: Faq[]
}>()

const openIndex = ref<number | null>(0)
const uid = useId()

function toggle(i: number) {
  openIndex.value = openIndex.value === i ? null : i
}

const { target, isVisible, revealDelay } = useRevealAnimation()
</script>

<template>
  <ul
    ref="target"
    class="space-y-3"
  >
    <li
      v-for="(item, i) in items"
      :key="item.label"
      class="reveal"
      :class="isVisible && 'reveal-visible'"
      :style="{ transitionDelay: revealDelay(i) }"
    >
      <div
        class="group/faq relative overflow-hidden rounded-2xl border transition-[background-color,border-color,box-shadow] duration-500"
        :class="openIndex === i
          ? 'border-primary/35 bg-primary/[0.05] shadow-lg shadow-signal-500/10'
          : 'border-default bg-elevated/40 hover:border-primary/25 hover:bg-elevated/70'"
      >
        <!-- glowing accent rail on the open item -->
        <span
          class="absolute inset-y-3 start-0 w-0.5 rounded-full bg-signal-400 shadow-[0_0_12px_2px] shadow-signal-400/60 transition-[opacity,transform] duration-500"
          :class="openIndex === i ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'"
          aria-hidden="true"
        />

        <h3>
          <button
            :id="`${uid}-q-${i}`"
            type="button"
            class="flex w-full cursor-pointer items-center gap-4 p-4 text-start focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary sm:p-5"
            :aria-expanded="openIndex === i"
            :aria-controls="`${uid}-a-${i}`"
            @click="toggle(i)"
          >
            <span class="hidden w-6 shrink-0 font-mono text-xs text-dimmed transition-colors duration-300 sm:block group-hover/faq:text-primary">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
            <span
              class="inline-flex size-10 shrink-0 items-center justify-center rounded-xl transition-all duration-500"
              :class="openIndex === i
                ? 'bg-gradient-to-br from-navy-700 to-navy-900 text-signal-400 ring-1 ring-white/10 shadow-md'
                : 'bg-primary/10 text-primary'"
            >
              <UIcon
                :name="item.icon"
                class="size-5"
              />
            </span>
            <span class="min-w-0 flex-1 text-sm font-semibold text-highlighted sm:text-base">
              {{ item.label }}
            </span>
            <span
              class="relative inline-flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500"
              :class="openIndex === i ? 'rotate-45 border-primary/40 bg-primary text-inverted' : 'border-default text-muted group-hover/faq:border-primary/40 group-hover/faq:text-primary'"
              aria-hidden="true"
            >
              <UIcon
                name="i-lucide-plus"
                class="size-4"
              />
            </span>
          </button>
        </h3>

        <!-- grid-rows 0fr→1fr animates to the content's natural height -->
        <div
          :id="`${uid}-a-${i}`"
          role="region"
          :aria-labelledby="`${uid}-q-${i}`"
          class="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          :class="openIndex === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
          :inert="openIndex !== i"
        >
          <div class="overflow-hidden">
            <p
              class="px-4 pb-5 text-sm leading-relaxed text-muted transition-[opacity,transform] duration-500 sm:ps-[7.25rem] sm:pe-16"
              :class="openIndex === i ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'"
            >
              {{ item.content }}
            </p>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>
