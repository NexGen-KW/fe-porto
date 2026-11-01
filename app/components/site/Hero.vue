<script setup lang="ts">
import { motion } from 'motion-v'
import { whyChooseUsIcons } from '~/data/company'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

const codeLines = [
  { text: '> initializing deployment pipeline...', color: 'text-white/40' },
  { text: 'const release = await ngs.deploy({', color: 'text-signal-300' },
  { text: '  stack: ["vue", "dotnet", "azure"],', color: 'text-white/70' },
  { text: '  ai: true, monitoring: "realtime"', color: 'text-white/70' },
  { text: '});', color: 'text-signal-300' },
  { text: '✓ build passed · tests green', color: 'text-signal-400' },
  { text: '✓ deployed to production', color: 'text-signal-400' }
]
const totalChars = codeLines.reduce((sum, line) => sum + line.text.length, 0)

const copy = useCopy()
const { isRtl } = useLocaleInfo()
const localePath = useLocalePath()
const points = computed(() => copy.value.about.why.points.map((point, i) => ({ ...point, icon: whyChooseUsIcons[i]! })))

// terminal types itself in a loop; empty until mounted so SSR and client markup match
const typed = ref<string[]>(codeLines.map(() => ''))
const typedChars = ref(0)
const progress = computed(() => Math.round((typedChars.value / totalChars) * 100))
const done = computed(() => typedChars.value >= totalChars)

let timer: ReturnType<typeof setTimeout> | null = null

function typeFrom(line: number, char: number) {
  const current = codeLines[line]
  if (!current) {
    timer = setTimeout(() => {
      typed.value = codeLines.map(() => '')
      typedChars.value = 0
      typeFrom(0, 0)
    }, 4200)
    return
  }
  if (char > current.text.length) {
    timer = setTimeout(() => typeFrom(line + 1, 0), 260)
    return
  }
  typed.value[line] = current.text.slice(0, char)
  if (char > 0) typedChars.value++
  timer = setTimeout(() => typeFrom(line, char + 1), 16 + Math.random() * 26)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typed.value = codeLines.map(line => line.text)
    typedChars.value = totalChars
    return
  }
  timer = setTimeout(() => typeFrom(0, 0), 700)
})

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})

const { el: terminal, handlePointerMove, handlePointerLeave } = useCardInteraction(5)
</script>

<template>
  <section
    :data-nav-label="copy.sections.overview"
    class="relative isolate flex min-h-screen items-center overflow-hidden pt-16 lg:pt-20"
  >
    <SiteHeroBackdrop variant="hero" />

    <div class="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-28">
      <div class="lg:col-span-7">
        <motion.div
          :initial="{ opacity: 0, y: 16 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5, ease }"
        >
          <span class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-xs font-medium text-signal-300/90 backdrop-blur-sm">
            <span class="relative flex size-1.5">
              <span class="absolute inline-flex size-full animate-ping rounded-full bg-signal-400 opacity-75" />
              <span class="relative inline-flex size-1.5 rounded-full bg-signal-400" />
            </span>
            {{ copy.hero.badge }}
          </span>
        </motion.div>

        <SiteHeroTitle
          class="mt-6"
          size="xl"
          :title="copy.hero.title"
          :highlight="copy.hero.highlight"
          :rotate="copy.hero.rotating"
        />

        <motion.p
          class="mt-6 max-w-xl text-lg leading-relaxed text-white/70"
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 0.5, ease }"
        >
          {{ copy.hero.description }}
        </motion.p>

        <motion.div
          class="mt-9 flex flex-col gap-3 sm:flex-row"
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 0.6, ease }"
        >
          <UButton
            :to="localePath('/services')"
            size="xl"
            color="primary"
            trailing-icon="i-lucide-arrow-right"
            class="justify-center"
          >
            {{ copy.common.exploreServices }}
          </UButton>
          <UButton
            :to="localePath('/contact')"
            size="xl"
            variant="outline"
            color="neutral"
            icon="i-lucide-message-circle"
            class="justify-center bg-white/10 text-white ring-white/25 hover:text-navy-700"
          >
            {{ copy.common.contactUs }}
          </UButton>
        </motion.div>

        <motion.ul
          class="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-white/70"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :transition="{ duration: 0.6, delay: 0.75 }"
        >
          <li
            v-for="point in points"
            :key="point.title"
            class="flex items-center gap-2"
          >
            <UIcon
              :name="point.icon"
              class="size-4 text-signal-400"
            />
            {{ point.title }}
          </li>
        </motion.ul>
      </div>

      <motion.div
        class="lg:col-span-5"
        aria-hidden="true"
        :initial="{ opacity: 0, scale: 0.94, y: 20 }"
        :animate="{ opacity: 1, scale: 1, y: 0 }"
        :transition="{ duration: 0.7, delay: 0.3, ease }"
      >
        <div class="relative mx-auto max-w-md animate-float">
          <div class="absolute -inset-4 animate-pulse-glow rounded-3xl bg-signal-500/20 blur-2xl" />

          <!-- terminal window -->
          <div
            ref="terminal"
            dir="ltr"
            class="tilt-card relative overflow-hidden rounded-2xl border border-white/10 bg-navy-900/90 shadow-2xl backdrop-blur-xl"
            @pointermove="handlePointerMove"
            @pointerleave="handlePointerLeave"
          >
            <span class="border-beam absolute inset-0 opacity-60" />

            <div class="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
              <span class="size-2.5 rounded-full bg-[#ff5f56]" />
              <span class="size-2.5 rounded-full bg-[#ffbd2e]" />
              <span class="size-2.5 rounded-full bg-[#27c93f]" />
              <span class="ml-2 font-mono text-[11px] text-white/40">ngs-deploy — zsh</span>
              <span class="ml-auto font-mono text-[11px] tabular-nums text-signal-400">{{ progress }}%</span>
            </div>
            <div class="h-0.5 bg-white/5">
              <div
                class="h-full bg-gradient-to-r from-signal-500 to-signal-300 transition-[width] duration-150 ease-linear"
                :style="{ width: `${progress}%` }"
              />
            </div>

            <div class="h-[15.5rem] space-y-1.5 px-5 py-5 font-mono text-[12.5px] leading-relaxed sm:text-[13px]">
              <template
                v-for="(line, i) in codeLines"
                :key="line.text"
              >
                <p
                  v-if="typed[i]"
                  class="whitespace-pre"
                  :class="line.color"
                >
                  {{ typed[i] }}<span
                    v-if="!done && typed[i] !== line.text"
                    class="ml-px inline-block h-3.5 w-2 translate-y-0.5 bg-signal-400"
                  />
                </p>
              </template>
              <p
                v-if="done"
                class="flex items-center gap-1.5 pt-1 text-white/50"
              >
                <span>$</span>
                <span class="h-3.5 w-2 animate-blink bg-signal-400" />
              </p>
            </div>

            <div class="grid grid-cols-3 gap-3 border-t border-white/10 px-5 py-4">
              <div
                v-for="item in copy.hero.capabilities"
                :key="item.label"
              >
                <p class="font-mono text-sm font-semibold text-white sm:text-base">
                  {{ item.value }}
                </p>
                <p
                  class="text-[11px] text-white/50"
                  :dir="isRtl ? 'rtl' : 'ltr'"
                >
                  {{ item.label }}
                </p>
              </div>
            </div>
          </div>

          <!-- floating status chips -->
          <div class="absolute -start-3 -top-5 hidden animate-float-slow items-center gap-2 rounded-xl border border-white/10 bg-navy-900/90 px-3 py-2 shadow-xl backdrop-blur-xl sm:flex lg:-start-8">
            <UIcon
              name="i-lucide-shield-check"
              class="size-4 text-signal-400"
            />
            <span class="font-mono text-[11px] text-white/80">{{ copy.hero.encrypted }}</span>
          </div>

          <div
            class="absolute -start-3 bottom-16 hidden animate-bob items-center gap-2 rounded-xl border border-white/10 bg-navy-900/90 px-3 py-2 shadow-xl backdrop-blur-xl sm:flex lg:-start-10"
            style="animation-delay: -1.2s;"
          >
            <UIcon
              name="i-lucide-cloud"
              class="size-4 text-signal-400"
            />
            <span class="font-mono text-[11px] text-white/80">{{ copy.hero.cloudSynced }}</span>
          </div>

          <div class="absolute -end-2 -bottom-6 flex items-center gap-2 rounded-xl border border-white/10 bg-navy-900/90 px-4 py-3 shadow-xl backdrop-blur-xl sm:-end-6">
            <span class="relative flex size-8 items-center justify-center rounded-lg bg-signal-500/15">
              <span class="absolute inset-0 animate-pulse-glow rounded-lg bg-signal-500/20" />
              <UIcon
                name="i-lucide-brain-circuit"
                class="relative size-4 text-signal-400"
              />
            </span>
            <div>
              <p class="text-xs font-medium text-white">
                {{ copy.hero.aiServices }}
              </p>
              <p class="font-mono text-[11px] text-white/50">
                {{ copy.hero.aiStatus }}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
</template>
