<script setup lang="ts">
const layerBase = [
  {
    key: 'experience',
    icon: 'i-lucide-app-window',
    tech: [
      { label: 'Vue.js', icon: 'i-simple-icons-vuedotjs' },
      { label: 'Nuxt UI', icon: 'i-simple-icons-nuxt' },
      { label: 'TypeScript', icon: 'i-simple-icons-typescript' }
    ]
  },
  {
    key: 'application',
    icon: 'i-lucide-workflow',
    tech: [
      { label: '.NET', icon: 'i-simple-icons-dotnet' },
      { label: 'REST / SignalR', icon: 'i-lucide-radio' }
    ]
  },
  {
    key: 'domain',
    icon: 'i-lucide-box',
    tech: [
      { label: 'Clean Architecture', icon: 'i-lucide-layers' },
      { label: 'C#', icon: 'i-simple-icons-csharp' }
    ]
  },
  {
    key: 'data',
    icon: 'i-lucide-database-zap',
    tech: [
      { label: 'SQL Server', icon: 'i-simple-icons-microsoftsqlserver' },
      { label: 'Azure OpenAI', icon: 'i-lucide-brain-circuit' }
    ]
  },
  {
    key: 'cloud',
    icon: 'i-lucide-cloud-cog',
    tech: [
      { label: 'Azure', icon: 'i-simple-icons-microsoftazure' },
      { label: 'Entra ID', icon: 'i-lucide-fingerprint' }
    ]
  }
] as const

const copy = useCopy()
const layers = computed(() => layerBase.map(layer => ({ ...layer, ...copy.value.products.architecture.layers[layer.key] })))

const CYCLE_MS = 3200

const active = ref(0)
const paused = ref(false)
const current = computed(() => layers.value[active.value]!)
const delivered = computed(() => active.value === layerBase.length - 1)

const { target, isVisible } = useRevealAnimation()

let timer: ReturnType<typeof setInterval> | null = null

function pick(i: number) {
  active.value = i
  paused.value = true
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  // a "request" walks down the stack, layer by layer
  timer = setInterval(() => {
    if (paused.value || !isVisible.value) return
    active.value = (active.value + 1) % layerBase.length
  }, CYCLE_MS)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

const pad = (n: number) => String(n).padStart(2, '0')

// isometric plates for the mini stack in the readout panel (top layer first)
const PLATE_GAP = 24
function plate(i: number) {
  const y = 14 + i * PLATE_GAP
  return {
    top: `110,${y} 186,${y + 22} 110,${y + 44} 34,${y + 22}`,
    left: `34,${y + 22} 110,${y + 44} 110,${y + 51} 34,${y + 29}`,
    right: `110,${y + 44} 186,${y + 22} 186,${y + 29} 110,${y + 51}`,
    cx: 110,
    cy: y + 22
  }
}
const plates = layerBase.map((_, i) => plate(i)).reverse()
const stackBottom = 14 + (layerBase.length - 1) * PLATE_GAP + 51
</script>

<template>
  <div
    ref="target"
    class="reveal grid grid-cols-1 items-start gap-8 lg:grid-cols-5 lg:gap-12"
    :class="isVisible && 'reveal-visible'"
    @pointerenter="paused = true"
    @pointerleave="paused = false"
  >
    <!-- the stack, traced by a request travelling down a rail -->
    <div class="lg:col-span-3">
      <!-- incoming request -->
      <div class="relative flex items-center gap-3 ps-10 pb-4">
        <span
          class="absolute start-4 top-1/2 flex size-3 -translate-x-1/2 -translate-y-1/2 items-center justify-center rtl:translate-x-1/2"
          aria-hidden="true"
        >
          <span class="absolute inline-flex size-full animate-ping rounded-full bg-primary/50" />
          <span class="relative size-2.5 rounded-full bg-primary ring-4 ring-primary/15" />
        </span>
        <span
          class="inline-flex items-center gap-2 rounded-full border border-default bg-default px-3 py-1.5 font-mono text-[11px] text-muted shadow-xs"
          dir="ltr"
        >
          <span class="font-semibold text-primary">GET</span>
          /your-business
          <span
            class="h-3 w-px animate-blink bg-primary"
            aria-hidden="true"
          />
        </span>
      </div>

      <ol>
        <li
          v-for="(layer, i) in layers"
          :key="layer.key"
          class="relative ps-10 pb-3"
        >
          <!-- rail segment: lit for the layers the request has already passed -->
          <span
            class="absolute start-4 top-0 bottom-0 w-0.5 -translate-x-1/2 overflow-hidden rtl:translate-x-1/2 rounded-full bg-(--ui-border)"
            aria-hidden="true"
          >
            <span
              class="absolute inset-x-0 top-0 bg-gradient-to-b from-primary to-signal-300 transition-[height] duration-700 ease-out"
              :style="{ height: i < active ? '100%' : i === active ? '2.5rem' : '0%' }"
            />
          </span>
          <!-- rail node -->
          <span
            class="absolute start-4 top-[2.25rem] z-10 flex size-4 -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2 items-center justify-center rounded-full border-2 transition-all duration-500 sm:top-[2.5rem]"
            :class="i <= active ? 'border-primary bg-primary' : 'border-(--ui-border-accented) bg-default'"
            aria-hidden="true"
          >
            <span
              v-if="i === active"
              class="absolute inset-0 animate-radar rounded-full border border-primary"
            />
            <UIcon
              v-if="i < active"
              name="i-lucide-check"
              class="size-2.5 text-inverted"
            />
          </span>

          <button
            type="button"
            class="group relative block w-full overflow-hidden rounded-2xl border p-4 text-start transition-[background-color,border-color,box-shadow,translate] duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:p-5"
            :class="active === i
              ? 'border-primary/50 bg-navy-950 shadow-2xl shadow-signal-500/15 sm:translate-x-2 rtl:sm:-translate-x-2'
              : 'border-default bg-default hover:border-primary/30 hover:bg-elevated/60'"
            :aria-pressed="active === i"
            @click="pick(i)"
            @focus="pick(i)"
          >
            <span
              v-if="active === i"
              class="border-beam absolute inset-0"
              aria-hidden="true"
            />
            <!-- faint blueprint grid on the active slab -->
            <span
              v-if="active === i"
              class="pointer-events-none absolute inset-0 opacity-50"
              style="background-image: linear-gradient(to right, rgb(255 255 255 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.05) 1px, transparent 1px); background-size: 20px 20px; mask-image: linear-gradient(to left, black, transparent 70%);"
              aria-hidden="true"
            />

            <div class="relative flex items-center gap-4">
              <span
                class="inline-flex size-10 shrink-0 items-center justify-center rounded-xl transition-[background-color,color,scale] duration-300"
                :class="active === i ? 'scale-110 bg-signal-500/15 text-signal-400 ring-1 ring-signal-400/30' : 'bg-primary/10 text-primary group-hover:scale-105'"
              >
                <UIcon
                  :name="layer.icon"
                  class="size-5"
                />
              </span>
              <div class="min-w-0 flex-1">
                <p
                  class="flex items-baseline gap-2 font-mono text-sm font-semibold transition-colors duration-300"
                  :class="active === i ? 'text-white' : 'text-highlighted'"
                >
                  <span
                    class="text-[11px] font-normal"
                    :class="active === i ? 'text-signal-400' : 'text-dimmed'"
                  >{{ pad(i + 1) }}</span>
                  {{ layer.name }}
                </p>
                <p
                  class="mt-0.5 truncate text-xs transition-colors duration-300"
                  :class="active === i ? 'text-white/60' : 'text-muted'"
                >
                  {{ layer.description }}
                </p>
              </div>

              <!-- the layer's tools as a quiet logo stack -->
              <span
                class="hidden shrink-0 items-center -space-x-1.5 sm:flex"
                aria-hidden="true"
              >
                <span
                  v-for="t in layer.tech"
                  :key="t.label"
                  class="inline-flex size-7 items-center justify-center rounded-full ring-2 transition-colors duration-300"
                  :class="active === i ? 'bg-navy-800 text-signal-400 ring-navy-950' : 'bg-elevated text-muted ring-(--ui-bg)'"
                >
                  <UIcon
                    :name="t.icon"
                    class="size-3.5"
                  />
                </span>
              </span>
            </div>

            <!-- inline detail on small screens, where the side panel is hidden -->
            <div
              v-if="active === i"
              class="relative mt-4 border-t border-white/10 pt-4 lg:hidden"
            >
              <p class="text-sm leading-relaxed text-white/70">
                {{ layer.earns }}
              </p>
              <div class="mt-3 flex flex-wrap gap-2">
                <span
                  v-for="(t, k) in layer.tech"
                  :key="t.label"
                  class="inline-flex animate-chip-in items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-white/80"
                  :style="{ animationDelay: `${k * 70}ms` }"
                >
                  <UIcon
                    :name="t.icon"
                    class="size-3.5 text-signal-400"
                  />
                  {{ t.label }}
                </span>
              </div>
            </div>
          </button>
        </li>
      </ol>

      <!-- response, once the request reaches the bottom of the stack -->
      <div class="relative flex items-center gap-3 ps-10 pt-1">
        <span
          class="absolute start-4 top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full rtl:translate-x-1/2 transition-colors duration-500"
          :class="delivered ? 'bg-primary ring-4 ring-primary/15' : 'bg-(--ui-border-accented)'"
          aria-hidden="true"
        />
        <span
          class="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[11px] transition-colors duration-500"
          :class="delivered ? 'border-primary/40 bg-primary/10 text-primary' : 'border-default bg-default text-dimmed'"
        >
          <UIcon
            :name="delivered ? 'i-lucide-circle-check' : 'i-lucide-loader'"
            class="size-3.5"
          />
          {{ delivered ? copy.products.architecture.delivered : copy.products.architecture.resolving }}
        </span>
      </div>
    </div>

    <!-- active layer readout -->
    <aside class="relative hidden overflow-hidden rounded-3xl border border-white/10 bg-navy-950 p-7 text-white shadow-xl lg:sticky lg:top-28 lg:col-span-2 lg:block">
      <div
        class="pointer-events-none absolute -end-20 -top-20 size-56 animate-aurora rounded-full bg-signal-500/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute inset-0 opacity-40"
        style="background-image: linear-gradient(to right, rgb(255 255 255 / 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.06) 1px, transparent 1px); background-size: 24px 24px; mask-image: radial-gradient(ellipse at bottom left, black, transparent 70%);"
        aria-hidden="true"
      />

      <div class="relative">
        <p class="flex items-center gap-2 font-mono text-[11px] text-white/50">
          <span class="relative flex size-1.5">
            <span class="absolute inline-flex size-full animate-ping rounded-full bg-signal-400 opacity-75" />
            <span class="relative inline-flex size-1.5 rounded-full bg-signal-400" />
          </span>
          {{ copy.products.architecture.tracing }} {{ pad(active + 1) }}/{{ pad(layers.length) }}
        </p>

        <!-- isometric stack: the active plate slides out like a drawer -->
        <svg
          class="mx-auto mt-4 block h-auto w-full max-w-[15rem] overflow-visible"
          :viewBox="`0 0 220 ${stackBottom + 6}`"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="plate-active"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop
                offset="0"
                stop-color="#85D48D"
              />
              <stop
                offset="1"
                stop-color="#2F7C34"
              />
            </linearGradient>
          </defs>
          <!-- request line through the core of the stack -->
          <line
            x1="110"
            y1="0"
            x2="110"
            :y2="stackBottom"
            class="animate-dash-march stroke-signal-400/50"
            stroke-width="1"
            stroke-dasharray="3 3"
          />
          <g
            v-for="(p, r) in plates"
            :key="r"
            class="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            :style="{ transform: layers.length - 1 - r === active ? 'translate(22px, -6px)' : 'translate(0, 0)' }"
          >
            <polygon
              :points="p.left"
              class="transition-[fill] duration-500"
              :class="layers.length - 1 - r === active ? 'fill-signal-800' : 'fill-navy-900'"
            />
            <polygon
              :points="p.right"
              class="transition-[fill] duration-500"
              :class="layers.length - 1 - r === active ? 'fill-signal-700' : 'fill-navy-800'"
            />
            <polygon
              :points="p.top"
              class="transition-[fill,stroke] duration-500"
              :fill="layers.length - 1 - r === active ? 'url(#plate-active)' : undefined"
              :class="layers.length - 1 - r === active ? 'stroke-signal-200' : 'fill-navy-700/80 stroke-white/15'"
              stroke-width="0.75"
            />
          </g>
        </svg>

        <Transition
          mode="out-in"
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="translate-y-2 opacity-0"
          leave-active-class="transition duration-150 ease-in"
          leave-to-class="-translate-y-2 opacity-0"
        >
          <div
            :key="current.key"
            class="mt-5 min-h-48"
          >
            <div class="flex items-center gap-3">
              <span class="inline-flex size-10 items-center justify-center rounded-xl bg-signal-500/15 text-signal-400 ring-1 ring-signal-400/30">
                <UIcon
                  :name="current.icon"
                  class="size-5"
                />
              </span>
              <h3 class="font-display text-2xl font-bold tracking-tight">
                {{ current.name }}
              </h3>
            </div>
            <p class="mt-3 text-sm leading-relaxed text-white/70">
              {{ current.earns }}
            </p>
            <div class="mt-5 flex flex-wrap gap-2">
              <span
                v-for="(t, k) in current.tech"
                :key="t.label"
                class="inline-flex animate-chip-in items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/85"
                :style="{ animationDelay: `${120 + k * 80}ms` }"
              >
                <UIcon
                  :name="t.icon"
                  class="size-4 text-signal-400"
                />
                {{ t.label }}
              </span>
            </div>
          </div>
        </Transition>

        <!-- step indicator -->
        <div class="mt-6 flex gap-1.5">
          <span
            v-for="(layer, i) in layers"
            :key="layer.key"
            class="h-1 flex-1 overflow-hidden rounded-full bg-white/10"
          >
            <span
              class="block h-full origin-left rounded-full bg-signal-400 transition-transform duration-500"
              :class="i <= active ? 'scale-x-100' : 'scale-x-0'"
            />
          </span>
        </div>
      </div>
    </aside>
  </div>
</template>
