<script setup lang="ts">
const enabled = ref(false)
const visible = ref(false)
const pressed = ref(false)
const interactive = ref(false)

const ringX = ref(0)
const ringY = ref(0)
const ringScale = ref(1)
const dotX = ref(0)
const dotY = ref(0)

let targetX = 0
let targetY = 0
let rafId: number | null = null
let reduceMotion = false

function loop() {
  const ease = reduceMotion ? 1 : 0.22
  ringX.value += (targetX - ringX.value) * ease
  ringY.value += (targetY - ringY.value) * ease
  const targetScale = pressed.value ? 0.9 : 1
  ringScale.value += (targetScale - ringScale.value) * (reduceMotion ? 1 : 0.35)
  dotX.value = targetX
  dotY.value = targetY
  rafId = requestAnimationFrame(loop)
}

function onPointerMove(event: PointerEvent) {
  if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return
  targetX = event.clientX
  targetY = event.clientY
  if (!visible.value) {
    ringX.value = targetX
    ringY.value = targetY
  }
  visible.value = true

  const target = event.target as HTMLElement | null
  interactive.value = !!target?.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor-interactive]')
}

function onPointerDown() {
  pressed.value = true
}
function onPointerUp() {
  pressed.value = false
}
function onPointerLeaveWindow() {
  visible.value = false
}

onMounted(() => {
  const isFinePointer = window.matchMedia('(pointer: fine)').matches
  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!isFinePointer) return

  enabled.value = true
  document.documentElement.classList.add('has-custom-cursor')

  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('pointerdown', onPointerDown, { passive: true })
  window.addEventListener('pointerup', onPointerUp, { passive: true })
  document.addEventListener('mouseleave', onPointerLeaveWindow)

  rafId = requestAnimationFrame(loop)
})

onBeforeUnmount(() => {
  if (!enabled.value) return
  document.documentElement.classList.remove('has-custom-cursor')
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerdown', onPointerDown)
  window.removeEventListener('pointerup', onPointerUp)
  document.removeEventListener('mouseleave', onPointerLeaveWindow)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <Teleport
    v-if="enabled"
    to="body"
  >
    <div
      class="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border-[1.5px] border-signal-400 transition-[width,height,opacity,background-color] duration-150 ease-out"
      :class="[
        visible ? 'opacity-100' : 'opacity-0',
        interactive ? 'size-14 bg-signal-300/30' : 'size-11 bg-signal-300/20'
      ]"
      :style="{ transform: `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${ringScale})` }"
    />
    <div
      class="pointer-events-none fixed top-0 left-0 z-[9999] size-1.5 rounded-full bg-signal-400 transition-opacity duration-150"
      :class="visible ? 'opacity-100' : 'opacity-0'"
      :style="{ transform: `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)` }"
    />
  </Teleport>
</template>
