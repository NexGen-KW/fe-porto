import { gsap } from 'gsap'
import { useIntersectionObserver } from '@vueuse/core'

interface CountUpOptions {
  duration?: number
  decimals?: number
}

export function useCountUp(target: MaybeRefOrGetter<number>, options: CountUpOptions = {}) {
  const el = ref<HTMLElement | null>(null)
  const display = ref(0)

  useIntersectionObserver(
    el,
    ([entry], observerInstance) => {
      if (!entry?.isIntersecting) return
      const finalValue = toValue(target)
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        display.value = finalValue
        observerInstance.disconnect()
        return
      }
      const counter = { value: 0 }

      gsap.to(counter, {
        value: finalValue,
        duration: options.duration ?? 1.8,
        ease: 'power2.out',
        onUpdate: () => {
          const decimals = options.decimals ?? 0
          display.value = Number(counter.value.toFixed(decimals))
        }
      })

      observerInstance.disconnect()
    },
    { threshold: 0.4 }
  )

  return { el, display }
}
