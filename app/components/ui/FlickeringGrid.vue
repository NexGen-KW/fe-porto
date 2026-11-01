<script setup lang="ts">
/**
 * Flickering Grid — adapted from Inspira UI (https://inspira-ui.com, MIT),
 * the Vue port of Magic UI's background. Canvas-based, pauses when off-screen,
 * and renders a single static frame under prefers-reduced-motion.
 */
import { useElementSize, useIntersectionObserver, useMediaQuery } from '@vueuse/core'

const props = withDefaults(defineProps<{
  squareSize?: number
  gridGap?: number
  flickerChance?: number
  /** Hex color, e.g. #4CAF50 */
  color?: string
  maxOpacity?: number
}>(), {
  squareSize: 4,
  gridGap: 6,
  flickerChance: 0.3,
  color: '#4CAF50',
  maxOpacity: 0.3
})

const container = ref<HTMLDivElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const { width, height } = useElementSize(container)
const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
const inView = ref(false)

useIntersectionObserver(container, ([entry]) => {
  inView.value = !!entry?.isIntersecting
}, { threshold: 0 })

const rgb = computed(() => {
  const hex = props.color.replace('#', '')
  const full = hex.length === 3 ? hex.split('').map(c => c + c).join('') : hex
  const n = Number.parseInt(full, 16)
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`
})

let cols = 0
let rows = 0
let squares = new Float32Array(0)
let dpr = 1
let frame = 0
let last = 0

function setup() {
  const el = canvas.value
  if (!el || !width.value || !height.value) return
  dpr = window.devicePixelRatio || 1
  el.width = width.value * dpr
  el.height = height.value * dpr
  el.style.width = `${width.value}px`
  el.style.height = `${height.value}px`
  const cell = props.squareSize + props.gridGap
  cols = Math.ceil(width.value / cell)
  rows = Math.ceil(height.value / cell)
  squares = new Float32Array(cols * rows)
  for (let i = 0; i < squares.length; i++) squares[i] = Math.random() * props.maxOpacity
}

function update(deltaTime: number) {
  for (let i = 0; i < squares.length; i++) {
    if (Math.random() < props.flickerChance * deltaTime) squares[i] = Math.random() * props.maxOpacity
  }
}

function draw() {
  const ctx = canvas.value?.getContext('2d')
  if (!ctx || !canvas.value) return
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
  const cell = (props.squareSize + props.gridGap) * dpr
  const size = props.squareSize * dpr
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      ctx.fillStyle = `rgba(${rgb.value}, ${squares[x * rows + y]})`
      ctx.fillRect(x * cell, y * cell, size, size)
    }
  }
}

function loop(time: number) {
  const delta = last ? (time - last) / 1000 : 0
  last = time
  update(delta)
  draw()
  frame = requestAnimationFrame(loop)
}

function stop() {
  cancelAnimationFrame(frame)
  frame = 0
  last = 0
}

function sync() {
  stop()
  if (reduceMotion.value || !inView.value) {
    draw()
    return
  }
  frame = requestAnimationFrame(loop)
}

watch([width, height, () => props.squareSize, () => props.gridGap, () => props.maxOpacity], () => {
  setup()
  sync()
})
watch([inView, reduceMotion, rgb], sync)

onBeforeUnmount(stop)
</script>

<template>
  <div
    ref="container"
    class="size-full"
    aria-hidden="true"
  >
    <canvas
      ref="canvas"
      class="pointer-events-none block"
    />
  </div>
</template>
