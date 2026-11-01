interface NavSection {
  id: string
  label: string
}

export function useSectionNav() {
  const sections = ref<NavSection[]>([])
  const activeId = ref<string | null>(null)
  let observer: IntersectionObserver | null = null
  const visibleRatios = new Map<string, number>()

  function updateActive() {
    let bestId: string | null = null
    let bestRatio = 0
    for (const [id, ratio] of visibleRatios) {
      if (ratio > bestRatio) {
        bestRatio = ratio
        bestId = id
      }
    }
    if (bestId) activeId.value = bestId
  }

  function scan() {
    observer?.disconnect()
    visibleRatios.clear()

    const nodes = Array.from(document.querySelectorAll<HTMLElement>('main [data-nav-label]'))
    sections.value = nodes.map((node, i) => {
      if (!node.id) node.id = `section-${i}-${node.dataset.navLabel!.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
      return { id: node.id, label: node.dataset.navLabel! }
    })

    if (!nodes.length) {
      activeId.value = null
      return
    }

    activeId.value = sections.value[0]?.id ?? null

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibleRatios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        }
        updateActive()
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1], rootMargin: '-15% 0px -55% 0px' }
    )

    nodes.forEach(node => observer!.observe(node))
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start'
    })
  }

  const route = useRoute()
  watch(() => route.fullPath, () => nextTick(() => setTimeout(scan, 120)))

  onMounted(() => nextTick(() => setTimeout(scan, 120)))
  onBeforeUnmount(() => observer?.disconnect())

  return { sections, activeId, scrollTo }
}
