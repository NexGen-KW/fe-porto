import { gsap } from 'gsap'
import 'gsap/ScrollTrigger'

export function useScrollLineDraw(direction: 'vertical' | 'horizontal' = 'vertical') {
  const container = ref<HTMLElement | null>(null)
  const line = ref<HTMLElement | null>(null)

  onMounted(() => {
    if (!container.value || !line.value) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(line.value, { scaleY: 1, scaleX: 1 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line.value,
        direction === 'vertical' ? { scaleY: 0 } : { scaleX: 0 },
        {
          scaleY: direction === 'vertical' ? 1 : undefined,
          scaleX: direction === 'horizontal' ? 1 : undefined,
          transformOrigin: direction === 'vertical' ? 'top center' : document.dir === 'rtl' ? 'right center' : 'left center',
          ease: 'none',
          scrollTrigger: {
            trigger: container.value,
            start: 'top 75%',
            end: 'bottom 75%',
            scrub: 0.6
          }
        }
      )
    }, container.value)

    onUnmounted(() => ctx.revert())
  })

  return { container, line }
}
