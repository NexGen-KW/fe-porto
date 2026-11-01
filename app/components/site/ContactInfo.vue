<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { company } from '~/data/company'

const text = useCopy()
const { intlLocale } = useLocaleInfo()

const channels = computed(() => [
  {
    key: 'email',
    icon: 'i-lucide-mail',
    label: text.value.contact.info.email,
    value: company.email,
    copy: company.email,
    href: `mailto:${company.email}`
  },
  {
    key: 'phone',
    icon: 'i-lucide-phone',
    label: text.value.contact.info.phone,
    value: company.phoneDisplay,
    copy: company.phone,
    href: `tel:${company.phone}`
  }
])

const { copy, isSupported } = useClipboard()
const copied = ref<string | null>(null)
let copiedTimer: ReturnType<typeof setTimeout> | null = null

async function copyValue(key: string, value: string) {
  await copy(value)
  copied.value = key
  if (copiedTimer) clearTimeout(copiedTimer)
  copiedTimer = setTimeout(() => (copied.value = null), 1800)
}

// Kuwait local time, filled in on the client so SSR markup stays stable
const localTime = ref('--:--')
let clockTimer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  const tick = () => {
    localTime.value = new Intl.DateTimeFormat(intlLocale.value, { timeZone: company.timeZone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(new Date())
  }
  tick()
  clockTimer = setInterval(tick, 15000)
})

onBeforeUnmount(() => {
  if (clockTimer) clearInterval(clockTimer)
  if (copiedTimer) clearTimeout(copiedTimer)
})

const { target, isVisible, revealDelay } = useRevealAnimation()
const { handlePointerMove, handlePointerLeave } = useListCardInteraction(3)
</script>

<template>
  <div
    ref="target"
    class="space-y-4"
  >
    <!-- email / phone -->
    <div
      v-for="(channel, i) in channels"
      :key="channel.key"
      class="reveal"
      :class="isVisible && 'reveal-visible'"
      :style="{ transitionDelay: revealDelay(i) }"
    >
      <div
        class="spotlight-card tilt-card group relative overflow-hidden rounded-2xl border border-default bg-elevated/40 p-5 transition-shadow duration-300 hover:shadow-xl hover:shadow-signal-500/10"
        @pointermove="handlePointerMove"
        @pointerleave="handlePointerLeave"
      >
        <div class="relative z-10 flex items-center gap-4">
          <span class="relative inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-inverted">
            <span
              class="absolute inset-0 animate-pulse-glow rounded-xl bg-primary/15"
              :style="{ animationDelay: `${i * -1.5}s` }"
              aria-hidden="true"
            />
            <UIcon
              :name="channel.icon"
              class="relative size-5"
            />
          </span>
          <div class="min-w-0 flex-1">
            <p class="font-mono text-[11px] text-dimmed">
              {{ channel.label }}
            </p>
            <a
              :href="channel.href"
              class="block truncate text-start font-semibold text-highlighted underline-offset-4 hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <bdi dir="ltr">{{ channel.value }}</bdi>
            </a>
          </div>
          <ClientOnly>
            <UButton
              v-if="isSupported"
              :icon="copied === channel.key ? 'i-lucide-check' : 'i-lucide-copy'"
              :color="copied === channel.key ? 'primary' : 'neutral'"
              variant="ghost"
              size="sm"
              :aria-label="copied === channel.key ? text.contact.info.copied : `${text.contact.info.copy} — ${channel.label}`"
              @click="copyValue(channel.key, channel.copy)"
            />
          </ClientOnly>
        </div>
      </div>
    </div>

    <!-- office: stylised map with the address -->
    <div
      class="reveal"
      :class="isVisible && 'reveal-visible'"
      :style="{ transitionDelay: revealDelay(2) }"
    >
      <div class="group relative isolate overflow-hidden rounded-2xl border border-white/10 bg-navy-950 text-white shadow-xl">
        <span
          class="border-beam absolute inset-0 opacity-50"
          aria-hidden="true"
        />

        <div class="relative flex h-44 items-center justify-center overflow-hidden">
          <div
            class="absolute inset-0 animate-grid-pan opacity-[0.1]"
            style="background-image: linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px); background-size: 28px 28px;"
            aria-hidden="true"
          />
          <!-- abstract streets and coastline -->
          <svg
            class="absolute inset-0 size-full text-white/15"
            viewBox="0 0 400 176"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              d="M-10 40C60 20 120 70 190 52s130-50 220-24"
              stroke-width="1.5"
            />
            <path
              d="M-10 132C80 110 150 150 230 128s110-30 180-12"
              stroke-width="1.5"
            />
            <path
              d="M70-10c14 60-8 120 20 196M300-10c-18 70 16 120-6 196"
              stroke-width="1"
            />
            <path
              d="M-10 88h420"
              stroke-dasharray="4 8"
              class="animate-dash-march text-signal-400/50"
              stroke-width="1"
            />
          </svg>
          <div
            class="absolute size-40 animate-aurora rounded-full bg-signal-500/25 blur-3xl"
            aria-hidden="true"
          />

          <span class="relative flex size-12 items-center justify-center">
            <span class="absolute inline-flex size-full animate-radar rounded-full border border-signal-400/60" />
            <span
              class="absolute inline-flex size-full animate-radar rounded-full border border-signal-400/60"
              style="animation-delay: -1.5s;"
            />
            <span class="absolute inline-flex size-full rounded-full bg-signal-500/20" />
            <UIcon
              name="i-lucide-map-pin"
              class="relative size-6 animate-bob text-signal-400"
            />
          </span>

          <span
            class="absolute start-3 top-3 rounded-full border border-white/10 bg-navy-950/70 px-2.5 py-1 font-mono text-[11px] text-white/60 backdrop-blur-sm"
          >
            <bdi dir="ltr">lat {{ company.geo.lat }} · lon {{ company.geo.lon }}</bdi>
          </span>
          <span class="absolute end-3 top-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-navy-950/70 px-2.5 py-1 font-mono text-[11px] text-white/60 backdrop-blur-sm">
            <UIcon
              name="i-lucide-clock"
              class="size-3 text-signal-400"
            />
            <span
              class="tabular-nums"
              dir="ltr"
            >{{ localTime }}</span> {{ text.contact.info.local }}
          </span>
        </div>

        <div class="relative border-t border-white/10 p-5">
          <p class="font-mono text-[11px] text-white/40">
            {{ text.contact.info.office }} · {{ text.contact.info.country }}
          </p>
          <address class="mt-1.5 text-sm leading-relaxed font-medium text-white/90 not-italic">
            <span
              v-for="line in text.contact.info.address"
              :key="line"
              class="block"
            >{{ line }}</span>
          </address>
          <UButton
            :to="company.mapUrl"
            target="_blank"
            rel="noopener"
            variant="link"
            color="primary"
            trailing-icon="i-lucide-arrow-up-right"
            class="mt-3 px-0"
          >
            {{ text.contact.info.openMaps }}
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
