<script setup lang="ts">
const visible = ref(false)
let heroEl: HTMLElement | null = null
let observer: IntersectionObserver | null = null

const route = useRoute()
const copy = useCopy()

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  })
}

function observeHero() {
  observer?.disconnect()
  heroEl = document.querySelector<HTMLElement>('main [data-nav-label]')
  if (!heroEl) {
    visible.value = false
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      visible.value = entry ? !entry.isIntersecting : false
    },
    { threshold: 0, rootMargin: '-64px 0px 0px 0px' }
  )
  observer.observe(heroEl)
}

watch(() => route.fullPath, () => nextTick(() => setTimeout(observeHero, 150)))
onMounted(() => nextTick(() => setTimeout(observeHero, 150)))
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-3"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-3"
  >
    <button
      v-if="visible"
      type="button"
      :aria-label="copy.nav.backToTop"
      class="group fixed end-5 bottom-5 z-40 flex size-11 items-center justify-center rounded-full border border-default bg-elevated/90 text-highlighted shadow-lg backdrop-blur-md transition-colors duration-300 hover:border-primary/40 hover:text-primary sm:end-8 sm:bottom-8"
      @click="scrollToTop"
    >
      <UIcon
        name="i-lucide-arrow-up"
        class="size-5 transition-transform duration-300 group-hover:-translate-y-0.5"
      />
    </button>
  </Transition>
</template>
