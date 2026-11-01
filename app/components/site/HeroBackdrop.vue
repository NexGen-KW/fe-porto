<script setup lang="ts">
/**
 * Shared hero backdrop: navy base, auroras, an animated "signal mesh" canvas and a pointer glow.
 * Used by the home hero, every page hero and the CTA banner so they always stay in sync.
 */
const props = withDefaults(defineProps<{
  variant?: 'hero' | 'page' | 'banner'
}>(), {
  variant: 'hero'
})

const root = ref<HTMLElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)

interface Node { x: number, y: number, vx: number, vy: number, r: number }
interface Pulse { a: number, b: number, t: number, speed: number }

const LINK_DISTANCE = 150
const POINTER_DISTANCE = 190

let cleanup: (() => void) | null = null

onMounted(() => {
  const el = root.value
  const cv = canvas.value
  const host = el?.parentElement
  const ctx = cv?.getContext('2d')
  if (!el || !cv || !host || !ctx) return

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const dpr = Math.min(window.devicePixelRatio || 1, 2)

  let width = 0
  let height = 0
  let nodes: Node[] = []
  let pulses: Pulse[] = []
  let rafId: number | null = null
  let inView = true
  const pointer = { x: -9999, y: -9999 }

  function seed() {
    const density = props.variant === 'hero' ? 15000 : 19000
    const count = Math.max(14, Math.min(72, Math.round((width * height) / density)))
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: 1 + Math.random() * 1.4
    }))
    pulses = []
  }

  function resize() {
    const rect = el!.getBoundingClientRect()
    width = rect.width
    height = rect.height
    cv!.width = Math.round(width * dpr)
    cv!.height = Math.round(height * dpr)
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    seed()
    if (reduceMotion) draw()
  }

  function draw() {
    ctx!.clearRect(0, 0, width, height)
    const links: [number, number][] = []

    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i]!
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j]!
        const dist = Math.hypot(a.x - b.x, a.y - b.y)
        if (dist > LINK_DISTANCE) continue
        links.push([i, j])
        ctx!.strokeStyle = `rgba(133, 212, 141, ${(1 - dist / LINK_DISTANCE) * 0.22})`
        ctx!.lineWidth = 1
        ctx!.beginPath()
        ctx!.moveTo(a.x, a.y)
        ctx!.lineTo(b.x, b.y)
        ctx!.stroke()
      }

      const pointerDist = Math.hypot(a.x - pointer.x, a.y - pointer.y)
      if (pointerDist < POINTER_DISTANCE) {
        ctx!.strokeStyle = `rgba(98, 193, 105, ${(1 - pointerDist / POINTER_DISTANCE) * 0.55})`
        ctx!.beginPath()
        ctx!.moveTo(a.x, a.y)
        ctx!.lineTo(pointer.x, pointer.y)
        ctx!.stroke()
      }

      ctx!.fillStyle = pointerDist < POINTER_DISTANCE ? 'rgba(133, 212, 141, 0.95)' : 'rgba(255, 255, 255, 0.45)'
      ctx!.beginPath()
      ctx!.arc(a.x, a.y, a.r, 0, Math.PI * 2)
      ctx!.fill()
    }

    if (reduceMotion) return

    // signal pulses travelling along live links
    if (links.length && pulses.length < 10 && Math.random() < 0.06) {
      const [a, b] = links[Math.floor(Math.random() * links.length)]!
      pulses.push({ a, b, t: 0, speed: 0.008 + Math.random() * 0.012 })
    }
    pulses = pulses.filter((pulse) => {
      pulse.t += pulse.speed
      const a = nodes[pulse.a]
      const b = nodes[pulse.b]
      if (!a || !b || pulse.t >= 1) return false
      const x = a.x + (b.x - a.x) * pulse.t
      const y = a.y + (b.y - a.y) * pulse.t
      const glow = ctx!.createRadialGradient(x, y, 0, x, y, 7)
      glow.addColorStop(0, 'rgba(133, 212, 141, 0.95)')
      glow.addColorStop(1, 'rgba(133, 212, 141, 0)')
      ctx!.fillStyle = glow
      ctx!.beginPath()
      ctx!.arc(x, y, 7, 0, Math.PI * 2)
      ctx!.fill()
      return true
    })
  }

  function step() {
    for (const node of nodes) {
      node.x += node.vx
      node.y += node.vy
      if (node.x < 0 || node.x > width) node.vx *= -1
      if (node.y < 0 || node.y > height) node.vy *= -1
    }
    draw()
    rafId = inView ? requestAnimationFrame(step) : null
  }

  function onPointerMove(event: PointerEvent) {
    if (event.pointerType === 'touch') return
    const rect = el!.getBoundingClientRect()
    pointer.x = event.clientX - rect.left
    pointer.y = event.clientY - rect.top
    el!.style.setProperty('--glow-x', `${pointer.x}px`)
    el!.style.setProperty('--glow-y', `${pointer.y}px`)
    el!.style.setProperty('--glow-opacity', '1')
    if (reduceMotion) draw()
  }

  function onPointerLeave() {
    pointer.x = -9999
    pointer.y = -9999
    el!.style.setProperty('--glow-opacity', '0')
    if (reduceMotion) draw()
  }

  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(el)

  const intersectionObserver = new IntersectionObserver(([entry]) => {
    inView = !!entry?.isIntersecting
    if (inView && !reduceMotion && rafId === null) rafId = requestAnimationFrame(step)
  })
  intersectionObserver.observe(el)

  host.addEventListener('pointermove', onPointerMove, { passive: true })
  host.addEventListener('pointerleave', onPointerLeave, { passive: true })

  cleanup = () => {
    resizeObserver.disconnect()
    intersectionObserver.disconnect()
    host.removeEventListener('pointermove', onPointerMove)
    host.removeEventListener('pointerleave', onPointerLeave)
    if (rafId !== null) cancelAnimationFrame(rafId)
  }
})

onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <div
    ref="root"
    class="pointer-events-none absolute inset-0 overflow-hidden"
    aria-hidden="true"
  >
    <div class="absolute inset-0 bg-navy-950" />

    <div
      class="absolute -top-1/3 left-1/4 h-[36rem] w-[36rem] animate-aurora rounded-full opacity-40 blur-[110px]"
      style="background: radial-gradient(circle, var(--color-navy-500), transparent 70%);"
    />
    <div
      class="absolute top-1/4 right-1/5 h-[30rem] w-[30rem] animate-aurora rounded-full opacity-30 blur-[110px]"
      style="background: radial-gradient(circle, var(--color-signal-500), transparent 70%); animation-delay: -6s;"
    />
    <div
      v-if="variant === 'hero'"
      class="absolute bottom-0 left-1/2 h-[26rem] w-[50rem] -translate-x-1/2 animate-aurora rounded-full opacity-25 blur-[120px]"
      style="background: radial-gradient(circle, var(--color-navy-400), transparent 70%); animation-delay: -11s;"
    />

    <!-- code grid, slowly panning -->
    <div
      class="absolute inset-0 animate-grid-pan opacity-[0.06]"
      style="background-image: linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px); background-size: 56px 56px; mask-image: radial-gradient(ellipse 90% 80% at 50% 40%, black, transparent);"
    />

    <!-- signal mesh -->
    <canvas
      ref="canvas"
      class="absolute inset-0 size-full"
    />

    <!-- pointer glow -->
    <div
      class="absolute inset-0 transition-opacity duration-500"
      style="opacity: var(--glow-opacity, 0); background: radial-gradient(420px circle at var(--glow-x, 50%) var(--glow-y, 50%), color-mix(in oklab, var(--color-signal-400) 16%, transparent), transparent 70%);"
    />

    <!-- scanline sweep -->
    <div
      class="absolute inset-x-0 top-0 h-1/3 animate-scanline opacity-[0.06]"
      style="background: linear-gradient(to bottom, transparent, var(--color-signal-300), transparent);"
    />

    <div
      v-if="variant !== 'banner'"
      class="absolute inset-0 bg-gradient-to-b from-transparent via-navy-950/10 to-navy-950"
    />
  </div>
</template>
