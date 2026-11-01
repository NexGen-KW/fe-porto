import { useIntersectionObserver } from '@vueuse/core'

interface RevealOptions {
  threshold?: number
  once?: boolean
}

export function useRevealAnimation(options: RevealOptions = {}) {
  const target = ref<HTMLElement | null>(null)
  const isVisible = ref(false)

  const { stop } = useIntersectionObserver(
    target,
    ([entry]) => {
      if (entry?.isIntersecting) {
        isVisible.value = true
        if (options.once !== false) stop()
      } else if (options.once === false) {
        isVisible.value = false
      }
    },
    { threshold: options.threshold ?? 0.15, rootMargin: '0px 0px -80px 0px' }
  )

  function revealDelay(index: number, step = 90, max = 540) {
    return `${Math.min(index * step, max)}ms`
  }

  return { target, isVisible, revealDelay }
}
