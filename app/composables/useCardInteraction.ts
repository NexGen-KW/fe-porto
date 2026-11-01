export function useCardInteraction(maxTilt = 6) {
  const el = ref<HTMLElement | null>(null)

  function handlePointerMove(event: PointerEvent) {
    if (!el.value || event.pointerType === 'touch') return
    const rect = el.value.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const px = x / rect.width
    const py = y / rect.height

    el.value.style.setProperty('--spot-x', `${x}px`)
    el.value.style.setProperty('--spot-y', `${y}px`)
    el.value.style.setProperty('--tilt-y', `${(px - 0.5) * maxTilt * 2}deg`)
    el.value.style.setProperty('--tilt-x', `${-(py - 0.5) * maxTilt * 2}deg`)
  }

  function handlePointerLeave() {
    if (!el.value) return
    el.value.style.setProperty('--tilt-x', '0deg')
    el.value.style.setProperty('--tilt-y', '0deg')
  }

  return { el, handlePointerMove, handlePointerLeave }
}

/** Ref-free variant for v-for lists: reads the card from `event.currentTarget`. */
export function useListCardInteraction(maxTilt = 4) {
  function handlePointerMove(event: PointerEvent) {
    const card = event.currentTarget as HTMLElement | null
    if (!card || event.pointerType === 'touch') return
    const rect = card.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    card.style.setProperty('--spot-x', `${x}px`)
    card.style.setProperty('--spot-y', `${y}px`)
    card.style.setProperty('--tilt-y', `${(x / rect.width - 0.5) * maxTilt * 2}deg`)
    card.style.setProperty('--tilt-x', `${-(y / rect.height - 0.5) * maxTilt * 2}deg`)
  }

  function handlePointerLeave(event: PointerEvent) {
    const card = event.currentTarget as HTMLElement | null
    card?.style.setProperty('--tilt-x', '0deg')
    card?.style.setProperty('--tilt-y', '0deg')
  }

  return { handlePointerMove, handlePointerLeave }
}
