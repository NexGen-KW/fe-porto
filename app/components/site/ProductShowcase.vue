<script setup lang="ts">
import type { CatalogItem } from '~/data/catalog'

/**
 * Product explorer without overlays: an index of products and an in-place detail stage.
 * Desktop: index on the left, stage on the right. Mobile: each stage opens under its own row.
 */
const props = defineProps<{
  items: CatalogItem[]
}>()

const route = useRoute()
const copy = useCopy()
const localePath = useLocalePath()
const activeSlug = ref(props.items[0]?.slug ?? '')
const activeIndex = computed(() => Math.max(0, props.items.findIndex(item => item.slug === activeSlug.value)))

function select(slug: string, { updateHash = true, reveal = false } = {}) {
  if (!props.items.some(item => item.slug === slug)) return
  activeSlug.value = slug
  if (!import.meta.client) return
  // keep the URL shareable without triggering the router's scroll behaviour
  if (updateHash) history.replaceState(history.state, '', `#${slug}`)
  if (reveal && window.matchMedia('(max-width: 1023px)').matches) {
    nextTick(() => document.getElementById(slug)?.scrollIntoView({ block: 'nearest' }))
  }
}

function step(offset: number) {
  const next = props.items[(activeIndex.value + offset + props.items.length) % props.items.length]
  if (next) select(next.slug)
}

function syncFromHash(hash: string) {
  const slug = hash.replace(/^#/, '')
  if (slug) select(slug, { updateHash: false })
}

onMounted(() => syncFromHash(route.hash))
watch(() => route.hash, syncFromHash)

const { target, isVisible } = useRevealAnimation({ threshold: 0.05 })
const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <div
    ref="target"
    class="reveal grid grid-cols-1 gap-3 lg:grid-cols-12 lg:gap-x-8 lg:[grid-template-rows:repeat(var(--count),auto)_1fr]"
    :class="isVisible && 'reveal-visible'"
    :style="{ '--count': items.length }"
  >
    <template
      v-for="(item, i) in items"
      :key="item.slug"
    >
      <!-- index row -->
      <button
        :id="item.slug"
        type="button"
        class="group relative flex scroll-mt-28 items-center gap-4 overflow-hidden rounded-2xl border p-4 text-start transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:col-span-4 lg:col-start-1 lg:[grid-row-start:var(--row)]"
        :class="activeSlug === item.slug
          ? 'border-primary/40 bg-primary/5 shadow-lg shadow-signal-500/10'
          : 'border-default bg-elevated/30 hover:border-primary/30 hover:bg-elevated/60'"
        :style="{ '--row': i + 1 }"
        :aria-expanded="activeSlug === item.slug"
        :aria-controls="`${item.slug}-panel`"
        @click="select(item.slug, { reveal: true })"
      >
        <span
          class="absolute inset-y-3 start-0 w-1 origin-center rounded-e-full bg-primary transition-transform duration-300"
          :class="activeSlug === item.slug ? 'scale-y-100' : 'scale-y-0'"
          aria-hidden="true"
        />
        <span
          class="inline-flex size-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300"
          :class="activeSlug === item.slug
            ? 'bg-primary text-inverted'
            : 'bg-primary/10 text-primary group-hover:scale-110'"
        >
          <UIcon
            :name="item.icon"
            class="size-5"
          />
        </span>
        <span class="min-w-0 flex-1">
          <span class="block font-mono text-[11px] text-dimmed">{{ pad(i + 1) }}</span>
          <span class="block truncate font-semibold text-highlighted">{{ item.name }}</span>
        </span>
        <UIcon
          name="i-lucide-chevron-right"
          class="size-4 shrink-0 text-dimmed transition-transform duration-300"
          :class="activeSlug === item.slug ? 'rotate-90 text-primary lg:rotate-0' : 'group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5'"
        />
      </button>

      <!-- detail stage -->
      <article
        v-show="activeSlug === item.slug"
        :id="`${item.slug}-panel`"
        class="relative isolate overflow-hidden rounded-3xl border border-default bg-elevated/40 lg:col-span-8 lg:col-start-5 lg:row-start-1 lg:[grid-row-end:-1]"
        :aria-label="item.name"
      >
        <div
          class="pointer-events-none absolute inset-0 -z-10 animate-grid-pan opacity-50"
          style="background-image: linear-gradient(to right, var(--ui-border) 1px, transparent 1px), linear-gradient(to bottom, var(--ui-border) 1px, transparent 1px); background-size: 56px 56px; mask-image: radial-gradient(ellipse 70% 60% at 85% 0%, black, transparent);"
          aria-hidden="true"
        />
        <div
          class="pointer-events-none absolute -end-24 -top-24 -z-10 size-72 animate-aurora rounded-full bg-signal-500/15 blur-3xl"
          aria-hidden="true"
        />

        <div class="p-6 sm:p-8 lg:p-10">
          <div class="flex flex-col-reverse gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div class="min-w-0 animate-chip-in">
              <p class="font-mono text-xs text-primary">
                <span class="text-dimmed">{{ copy.products.showcase.product }}</span> {{ pad(i + 1) }} <span class="text-dimmed">/ {{ pad(items.length) }}</span>
              </p>
              <h3 class="mt-3 font-display text-2xl font-bold tracking-tight text-highlighted sm:text-3xl lg:text-4xl">
                {{ item.name }}
              </h3>
            </div>

            <div class="relative flex size-28 shrink-0 items-center justify-center sm:size-36">
              <span
                class="absolute inset-4 animate-radar rounded-full border border-primary/40"
                aria-hidden="true"
              />
              <span
                class="absolute inset-4 animate-radar rounded-full border border-primary/40"
                style="animation-delay: -1.5s;"
                aria-hidden="true"
              />
              <span class="absolute inset-3 rounded-full bg-primary/5 ring-1 ring-primary/15" />
              <SiteMotif
                :kind="item.motif"
                class="relative size-20 text-primary sm:size-24"
              />
            </div>
          </div>

          <p
            class="mt-5 max-w-2xl animate-chip-in text-base leading-relaxed text-muted"
            style="animation-delay: 80ms;"
          >
            {{ item.description }}
          </p>

          <p class="mt-8 flex items-center gap-3 font-mono text-[11px] tracking-wider text-dimmed uppercase">
            {{ copy.products.showcase.whatYouGet }}
            <span class="h-px flex-1 bg-(--ui-border)" />
          </p>
          <ul class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <li
              v-for="(benefit, b) in item.benefits"
              :key="benefit.title"
              class="group/benefit animate-chip-in rounded-2xl border border-default bg-default/60 p-4 transition-colors duration-300 hover:border-primary/40"
              :style="{ animationDelay: `${160 + b * 90}ms` }"
            >
              <div class="flex items-start gap-3">
                <span class="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-[10px] font-bold text-primary transition-colors duration-300 group-hover/benefit:bg-primary group-hover/benefit:text-inverted">
                  {{ b + 1 }}
                </span>
                <div>
                  <h4 class="text-sm font-semibold text-highlighted">
                    {{ benefit.title }}
                  </h4>
                  <p class="mt-1 text-sm leading-relaxed text-muted">
                    {{ benefit.text }}
                  </p>
                </div>
              </div>
            </li>
          </ul>

          <div class="mt-8 flex flex-wrap items-center justify-between gap-4">
            <UButton
              :to="localePath('/contact')"
              color="primary"
              size="lg"
              trailing-icon="i-lucide-arrow-right"
            >
              {{ copy.products.showcase.ask }}
            </UButton>
            <div class="hidden items-center gap-2 lg:flex">
              <UButton
                icon="i-lucide-arrow-left"
                variant="outline"
                color="neutral"
                :aria-label="copy.products.showcase.previous"
                @click="step(-1)"
              />
              <UButton
                icon="i-lucide-arrow-right"
                variant="outline"
                color="neutral"
                :aria-label="copy.products.showcase.next"
                @click="step(1)"
              />
            </div>
          </div>
        </div>
      </article>
    </template>
  </div>
</template>
