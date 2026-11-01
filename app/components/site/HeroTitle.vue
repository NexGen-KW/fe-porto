<script setup lang="ts">
/**
 * Shared hero headline: words rise in one by one, and an optional highlighted phrase
 * gets the animated green gradient (and can rotate through alternatives).
 */
const props = withDefaults(defineProps<{
  title: string
  /** phrase inside `title` to render in the gradient accent */
  highlight?: string
  /** alternative phrases the highlight cycles through (the first should equal `highlight`) */
  rotate?: string[]
  tag?: 'h1' | 'h2'
  size?: 'xl' | 'lg' | 'md'
  /** set to false to hold the reveal until the heading scrolls into view */
  play?: boolean
}>(), {
  highlight: undefined,
  rotate: undefined,
  tag: 'h1',
  size: 'lg',
  play: true
})

const parts = computed(() => {
  const words = (text: string) => text.split(/\s+/).filter(Boolean)
  const index = props.highlight ? props.title.indexOf(props.highlight) : -1
  if (index < 0 || !props.highlight) return { before: words(props.title), after: [] as string[], hasHighlight: false }
  return {
    before: words(props.title.slice(0, index)),
    after: words(props.title.slice(index + props.highlight.length)),
    hasHighlight: true
  }
})

const phrases = computed(() => (props.rotate?.length ? props.rotate : props.highlight ? [props.highlight] : []))
const phraseIndex = ref(0)
const phrase = computed(() => phrases.value[phraseIndex.value] ?? '')

let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  if (phrases.value.length < 2) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(() => {
    phraseIndex.value = (phraseIndex.value + 1) % phrases.value.length
  }, 3000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

const sizeClass = computed(() => ({
  xl: 'text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] lg:leading-[1.05]',
  lg: 'text-4xl sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]',
  md: 'text-3xl sm:text-4xl lg:text-5xl'
}[props.size]))

const delay = (i: number) => ({ animationDelay: `${80 + i * 70}ms` })
</script>

<template>
  <component
    :is="tag"
    class="font-display font-bold tracking-tight text-balance text-white"
    :class="sizeClass"
    :aria-label="title"
  >
    <span
      v-for="(word, i) in parts.before"
      :key="`b-${i}`"
      class="me-[0.25em] inline-block overflow-hidden pb-[0.12em] align-bottom rtl:pb-[0.3em] rtl:leading-[1.35]"
      aria-hidden="true"
    >
      <span
        class="inline-block"
        :class="play ? 'animate-word-rise' : 'opacity-0'"
        :style="delay(i)"
      >{{ word }}</span>
    </span>

    <span
      v-if="parts.hasHighlight"
      class="me-[0.25em] inline-block overflow-hidden pb-[0.12em] align-bottom rtl:pb-[0.3em] rtl:leading-[1.35]"
      aria-hidden="true"
    >
      <span
        class="inline-block"
        :class="play ? 'animate-word-rise' : 'opacity-0'"
        :style="delay(parts.before.length)"
      >
        <!-- type="transition": the phrase also runs an infinite gradient animation Vue must not wait on -->
        <Transition
          type="transition"
          mode="out-in"
          enter-active-class="transition duration-500 ease-out"
          enter-from-class="translate-y-full opacity-0"
          leave-active-class="transition duration-300 ease-in"
          leave-to-class="-translate-y-full opacity-0"
        >
          <span
            :key="phrase"
            class="inline-block animate-gradient-pan bg-gradient-to-r rtl:bg-gradient-to-l from-signal-300 via-signal-500 to-signal-200 bg-[length:200%_100%] bg-clip-text text-transparent"
          >{{ phrase }}</span>
        </Transition>
      </span>
    </span>

    <span
      v-for="(word, i) in parts.after"
      :key="`a-${i}`"
      class="me-[0.25em] inline-block overflow-hidden pb-[0.12em] align-bottom rtl:pb-[0.3em] rtl:leading-[1.35]"
      aria-hidden="true"
    >
      <span
        class="inline-block"
        :class="play ? 'animate-word-rise' : 'opacity-0'"
        :style="delay(parts.before.length + 1 + i)"
      >{{ word }}</span>
    </span>
  </component>
</template>
