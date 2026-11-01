<script setup lang="ts">
import { AnimatePresence, motion } from 'motion-v'
import { useMediaQuery, useScroll } from '@vueuse/core'

const panelEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

const route = useRoute()
const localePath = useLocalePath()
const copy = useCopy()
const { isRtl } = useLocaleInfo()
const { y } = useScroll(import.meta.client ? window : undefined)
const scrolled = computed(() => y.value > 24)
const mobileOpen = ref(false)
const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
const underlineTransition = computed(() =>
  reduceMotion.value ? { duration: 0 } : { type: 'spring' as const, stiffness: 420, damping: 36 }
)

const links = computed(() => {
  const labels = copy.value.nav.links
  return [
    { label: labels.home, to: localePath('/') },
    { label: labels.products, to: localePath('/products') },
    { label: labels.services, to: localePath('/services') },
    { label: labels.about, to: localePath('/about') },
    { label: labels.contact, to: localePath('/contact') }
  ]
})

// the mobile panel slides in from the inline-end edge: right in English, left in Arabic
const panelOffset = computed(() => (isRtl.value ? '-100%' : '100%'))
const itemOffset = computed(() => (isRtl.value ? -24 : 24))

watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false
  }
)

watch(mobileOpen, (open) => {
  if (!import.meta.client) return
  document.documentElement.style.overflow = open ? 'hidden' : ''
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
    :class="
      scrolled
        ? 'border-b border-default bg-default/85 backdrop-blur-md shadow-sm'
        : 'border-b border-transparent bg-transparent'
    "
  >
    <nav
      class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8"
    >
      <NuxtLink
        :to="localePath('/')"
        class="group inline-flex items-center gap-2"
      >
        <AppLogo size="md" />
      </NuxtLink>

      <ul class="hidden items-center gap-1 lg:flex">
        <li
          v-for="link in links"
          :key="link.to"
        >
          <UButton
            :to="link.to"
            variant="link"
            color="neutral"
            :class="[
              'relative transition-colors',
              route.path === link.to
                ? ['font-bold', scrolled ? 'text-highlighted' : 'text-white']
                : !scrolled ? 'font-medium text-white/85 hover:text-white' : 'font-medium'
            ]"
            :active="route.path === link.to"
          >
            <!-- bold ghost reserves width so the active weight change doesn't shift siblings -->
            <span class="grid">
              <span
                class="invisible col-start-1 row-start-1 font-bold"
                aria-hidden="true"
              >{{ link.label }}</span>
              <span class="col-start-1 row-start-1 text-center">{{ link.label }}</span>
            </span>
            <motion.span
              v-if="route.path === link.to"
              layout-id="nav-active-underline"
              class="pointer-events-none absolute inset-x-2.5 -bottom-0.5 h-0.5 rounded-full bg-signal-400 shadow-[0_0_10px_1px] shadow-signal-400/70"
              :transition="underlineTransition"
              aria-hidden="true"
            >
              <span class="absolute inset-x-0 -top-1.5 h-3 rounded-full bg-signal-400/40 blur-md" />
            </motion.span>
          </UButton>
        </li>
      </ul>

      <div class="hidden items-center gap-2 lg:flex">
        <UColorModeButton
          :class="!scrolled ? 'text-white hover:bg-white/10' : ''"
        />
        <SiteLangSwitch :class="!scrolled ? 'text-white hover:bg-white/10' : ''" />
        <UButton
          :to="localePath('/contact')"
          color="primary"
          trailing-icon="i-lucide-arrow-right"
        >
          {{ copy.nav.getStarted }}
        </UButton>
      </div>

      <div class="flex items-center gap-1 lg:hidden">
        <UColorModeButton
          :class="!scrolled ? 'text-white hover:bg-white/10' : ''"
        />
        <SiteLangSwitch :class="!scrolled ? 'text-white hover:bg-white/10' : ''" />
        <UButton
          :icon="mobileOpen ? 'i-lucide-x' : 'i-lucide-menu'"
          variant="ghost"
          color="neutral"
          size="lg"
          :class="!scrolled ? 'text-white hover:bg-white/10' : ''"
          :aria-label="copy.nav.toggleMenu"
          @click="mobileOpen = !mobileOpen"
        />
      </div>
    </nav>

    <AnimatePresence>
      <motion.div
        v-if="mobileOpen"
        key="backdrop"
        class="fixed inset-0 top-16 z-40 bg-midnight-950/60 backdrop-blur-sm lg:hidden"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :exit="{ opacity: 0 }"
        :transition="{ duration: 0.25 }"
        @click="mobileOpen = false"
      />
    </AnimatePresence>

    <AnimatePresence>
      <motion.div
        v-if="mobileOpen"
        key="panel"
        class="fixed inset-y-0 end-0 top-16 z-40 w-[84%] max-w-sm overflow-y-auto border-s border-default bg-default lg:hidden"
        :initial="{ x: panelOffset }"
        :animate="{ x: 0 }"
        :exit="{ x: panelOffset }"
        :transition="{ duration: 0.35, ease: panelEase }"
      >
        <ul class="flex flex-col gap-1 p-4">
          <motion.li
            v-for="(link, i) in links"
            :key="link.to"
            :initial="{ opacity: 0, x: itemOffset }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.3, delay: 0.08 + i * 0.05 }"
          >
            <NuxtLink
              :to="link.to"
              class="relative block rounded-lg px-4 py-3 text-base transition-colors hover:bg-elevated"
              :class="route.path === link.to
                ? 'bg-primary/5 font-bold text-primary'
                : 'font-medium text-highlighted'"
              @click="mobileOpen = false"
            >
              <span
                v-if="route.path === link.to"
                class="absolute inset-y-2.5 start-0 w-0.5 rounded-full bg-signal-400 shadow-[0_0_10px_2px] shadow-signal-400/60"
                aria-hidden="true"
              />
              {{ link.label }}
            </NuxtLink>
          </motion.li>
        </ul>
        <div class="flex flex-col gap-3 border-t border-default p-4">
          <UButton
            :to="localePath('/contact')"
            block
            color="primary"
            trailing-icon="i-lucide-arrow-right"
            @click="mobileOpen = false"
          >
            {{ copy.nav.getStarted }}
          </UButton>
        </div>
      </motion.div>
    </AnimatePresence>
  </header>
</template>
