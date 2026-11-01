<script setup lang="ts">
// node names are product names (not translated); their one-line benefit comes from the locale
const stack = [
  { name: 'Vue.js', key: 'vue', icon: 'i-simple-icons-vuedotjs' },
  { name: '.NET', key: 'dotnet', icon: 'i-simple-icons-dotnet' },
  { name: 'C#', key: 'csharp', icon: 'i-simple-icons-csharp' },
  { name: 'Clean Arch', key: 'cleanArch', icon: 'i-lucide-layers' },
  { name: 'Azure', key: 'azure', icon: 'i-simple-icons-microsoftazure' },
  { name: 'Entra ID', key: 'entra', icon: 'i-lucide-fingerprint' },
  { name: 'SQL Server', key: 'sqlserver', icon: 'i-simple-icons-microsoftsqlserver' },
  { name: 'PostgreSQL', key: 'postgres', icon: 'i-simple-icons-postgresql' },
  { name: 'Nuxt UI', key: 'nuxtui', icon: 'i-simple-icons-nuxt' },
  { name: 'Docker', key: 'docker', icon: 'i-simple-icons-docker' }
] as const

const copy = useCopy()
const benefitOf = (key: typeof stack[number]['key']) => copy.value.products.map.benefits[key]

function ring(items: readonly (typeof stack[number])[], radius: number, offset = 0) {
  return items.map((item, i) => {
    const angle = (i / items.length) * Math.PI * 2 - Math.PI / 2 + offset
    return {
      ...item,
      x: Number((50 + radius * Math.cos(angle)).toFixed(3)),
      y: Number((50 + radius * Math.sin(angle)).toFixed(3))
    }
  })
}

// two counter-rotating orbits around the NGS core
const rings = [
  { radius: 24, reverse: true, nodes: ring(stack.slice(0, 4), 24, Math.PI / 4) },
  { radius: 44, reverse: false, nodes: ring(stack.slice(4), 44) }
]

const selected = ref<string | null>(null)
const selectedNode = computed(() => stack.find(node => node.name === selected.value) ?? null)

// the description card opens towards the core, so it always stays inside the orbit, whatever angle the node is paused at
type Placement = 'top' | 'right' | 'bottom' | 'left'
const placement = ref<Placement>('bottom')
const orbitEl = ref<HTMLElement | null>(null)

function select(name: string, event: Event) {
  selected.value = name
  const node = event.currentTarget as HTMLElement | null
  if (!node || !orbitEl.value) return
  const box = orbitEl.value.getBoundingClientRect()
  const rect = node.getBoundingClientRect()
  const dx = rect.left + rect.width / 2 - (box.left + box.width / 2)
  const dy = rect.top + rect.height / 2 - (box.top + box.height / 2)
  placement.value = Math.abs(dx) > Math.abs(dy)
    ? (dx > 0 ? 'left' : 'right')
    : (dy > 0 ? 'top' : 'bottom')
}

// only the hovered node follows the live placement; the rest keep a stable resting state
const placementFor = (name: string): Placement => (selected.value === name ? placement.value : 'bottom')

const placementClass: Record<Placement, string> = {
  top: 'bottom-full left-1/2 mb-3 -translate-x-1/2 origin-bottom',
  bottom: 'top-full left-1/2 mt-3 -translate-x-1/2 origin-top',
  left: 'right-full top-1/2 mr-3 -translate-y-1/2 origin-right',
  right: 'left-full top-1/2 ml-3 -translate-y-1/2 origin-left'
}
const arrowClass: Record<Placement, string> = {
  top: '-bottom-1.5 left-1/2 -translate-x-1/2 border-r border-b',
  bottom: '-top-1.5 left-1/2 -translate-x-1/2 border-l border-t',
  left: '-right-1.5 top-1/2 -translate-y-1/2 border-t border-r',
  right: '-left-1.5 top-1/2 -translate-y-1/2 border-b border-l'
}

// lines start at the edge of the core instead of its centre
const CORE_R = 9
function lineStart(node: { x: number, y: number }) {
  const dx = node.x - 50
  const dy = node.y - 50
  const len = Math.hypot(dx, dy) || 1
  return { x: Number((50 + (dx / len) * CORE_R).toFixed(3)), y: Number((50 + (dy / len) * CORE_R).toFixed(3)) }
}

const { target, isVisible } = useRevealAnimation()
</script>

<template>
  <div
    ref="target"
    class="reveal"
    :class="isVisible && 'reveal-visible'"
  >
    <!-- orbit view -->
    <div
      ref="orbitEl"
      class="group/orbit relative mx-auto hidden aspect-square w-full max-w-xl sm:block"
      @pointerleave="selected = null"
    >
      <!-- core glow -->
      <div
        class="pointer-events-none absolute inset-[18%] animate-pulse-glow rounded-full bg-signal-500/15 blur-3xl"
        aria-hidden="true"
      />
      <span
        v-for="n in 3"
        :key="n"
        class="pointer-events-none absolute inset-[38%] animate-radar rounded-full border border-primary/30"
        :style="{ animationDelay: `${n * -1}s` }"
        aria-hidden="true"
      />

      <div
        v-for="(orbit, r) in rings"
        :key="r"
        class="pointer-events-none absolute inset-0 group-focus-within/orbit:[animation-play-state:paused] group-hover/orbit:[animation-play-state:paused]"
        :class="[
          orbit.reverse ? 'animate-orbit-reverse' : 'animate-orbit',
          orbit.nodes.some(node => node.name === selected) && 'z-20'
        ]"
      >
        <svg
          class="absolute inset-0 size-full overflow-visible"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <circle
            cx="50"
            cy="50"
            :r="orbit.radius"
            fill="none"
            class="stroke-(--ui-border-accented)"
            stroke-width="0.25"
            stroke-dasharray="0.6 1.8"
          />
          <line
            v-for="node in orbit.nodes"
            :key="`line-${node.name}`"
            :x1="lineStart(node).x"
            :y1="lineStart(node).y"
            :x2="node.x"
            :y2="node.y"
            class="animate-dash-march transition-[stroke,opacity] duration-300"
            :class="selected === node.name ? 'stroke-primary opacity-100' : 'stroke-primary/50 opacity-50'"
            :stroke-width="selected === node.name ? 0.5 : 0.25"
            stroke-dasharray="1.5 1.5"
            vector-effect="non-scaling-stroke"
          />
        </svg>

        <div
          v-for="node in orbit.nodes"
          :key="node.name"
          class="absolute -translate-x-1/2 -translate-y-1/2"
          :class="selected === node.name && 'z-10'"
          :style="{ left: `${node.x}%`, top: `${node.y}%` }"
        >
          <!-- counter-rotation keeps the icon (and its card) upright; the ring layers are click-through, so only the icons catch the pointer -->
          <div
            class="relative group-focus-within/orbit:[animation-play-state:paused] group-hover/orbit:[animation-play-state:paused]"
            :class="orbit.reverse ? 'animate-orbit' : 'animate-orbit-reverse'"
          >
            <button
              type="button"
              class="pointer-events-auto flex size-12 items-center justify-center rounded-2xl border bg-elevated shadow-sm transition-[scale,border-color,color,box-shadow] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:size-14"
              :class="selected === node.name
                ? 'scale-115 border-primary text-primary shadow-lg shadow-signal-500/30'
                : 'border-default text-muted'"
              :aria-label="`${node.name}: ${benefitOf(node.key)}`"
              @pointerenter="select(node.name, $event)"
              @click="select(node.name, $event)"
              @focus="select(node.name, $event)"
              @blur="selected = null"
            >
              <UIcon
                :name="node.icon"
                class="size-6"
              />
            </button>

            <!-- description card, right next to the hovered icon -->
            <div
              class="pointer-events-none absolute z-10 w-48 transition-[opacity,scale] duration-200 ease-out"
              :class="[
                placementClass[placementFor(node.name)],
                selected === node.name ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
              ]"
              aria-hidden="true"
            >
              <div class="relative rounded-xl border border-primary/40 bg-elevated/95 px-3.5 py-2.5 shadow-xl shadow-signal-500/15 backdrop-blur-md">
                <span
                  class="absolute size-3 rotate-45 border-primary/40 bg-elevated"
                  :class="arrowClass[placementFor(node.name)]"
                />
                <p class="relative flex items-center gap-1.5 font-mono text-xs font-semibold text-highlighted">
                  <span class="size-1.5 rounded-full bg-primary" />
                  {{ node.name }}
                </p>
                <p class="relative mt-1 text-xs leading-snug text-muted">
                  {{ benefitOf(node.key) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- core -->
      <div class="pointer-events-none absolute top-1/2 left-1/2 z-10 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/40 bg-elevated shadow-xl shadow-signal-500/20">
        <span class="absolute inset-0 animate-pulse-glow rounded-full bg-primary/10" />
        <span
          class="border-beam absolute inset-0"
          aria-hidden="true"
        />
        <img
          src="/images/ngs-mark.png"
          alt="NGS"
          class="relative h-8 w-auto object-contain dark:brightness-0 dark:invert"
        >
      </div>
    </div>

    <!-- hint under the orbit; the description itself shows next to the hovered icon -->
    <p
      class="mt-8 hidden h-5 text-center font-mono text-xs text-dimmed transition-opacity duration-300 sm:block"
      :class="selectedNode ? 'opacity-0' : 'opacity-100'"
    >
      <UIcon
        name="i-lucide-mouse-pointer-2"
        class="me-1 size-3.5 align-[-2px] text-primary"
      />
      {{ copy.products.map.hint }}
    </p>
    <p
      class="sr-only"
      aria-live="polite"
    >
      {{ selectedNode ? `${selectedNode.name}: ${benefitOf(selectedNode.key)}` : '' }}
    </p>

    <!-- small screens: a tidy grid instead of the orbit; tap or hover a tile to highlight it -->
    <ul class="grid grid-cols-2 gap-3 sm:hidden">
      <li
        v-for="(node, i) in stack"
        :key="node.name"
        class="animate-chip-in"
        :style="{ animationDelay: `${i * 60}ms` }"
      >
        <button
          type="button"
          class="size-full rounded-2xl border p-4 text-start backdrop-blur-sm transition-[border-color,background-color,box-shadow,translate] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          :class="selected === node.name
            ? '-translate-y-0.5 border-primary bg-elevated shadow-lg shadow-signal-500/20'
            : 'border-default bg-elevated/70'"
          :aria-pressed="selected === node.name"
          @pointerenter="selected = node.name"
          @click="selected = node.name"
          @focus="selected = node.name"
        >
          <UIcon
            :name="node.icon"
            class="size-6 transition-[color,scale] duration-300"
            :class="selected === node.name ? 'scale-110 text-primary' : 'text-primary'"
          />
          <span class="mt-3 block font-mono text-sm font-semibold text-highlighted">{{ node.name }}</span>
          <span class="mt-0.5 block text-xs leading-snug text-muted">{{ benefitOf(node.key) }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>
