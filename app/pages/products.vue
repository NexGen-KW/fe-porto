<script setup lang="ts">
import { useCatalog } from '~/data/catalog'

const copy = useCopy()
const localePath = useLocalePath()
const { products } = useCatalog()

useSeoMeta({
  title: () => copy.value.meta.products.title,
  ogTitle: () => copy.value.meta.products.title,
  description: () => copy.value.meta.products.description,
  ogDescription: () => copy.value.meta.products.description
})

const colorMode = useColorMode()
const gridColor = computed(() => (colorMode.value === 'dark' ? '#4CAF50' : '#1B2A6B'))
const gridOpacity = computed(() => (colorMode.value === 'dark' ? 0.3 : 0.16))
</script>

<template>
  <div>
    <SitePageHero
      :eyebrow="copy.products.hero.eyebrow"
      :title="copy.products.hero.title"
      :highlight="copy.products.hero.highlight"
      :description="copy.products.hero.description"
    >
      <UButton
        :to="localePath('/contact')"
        size="xl"
        color="primary"
        trailing-icon="i-lucide-arrow-right"
        class="justify-center"
      >
        {{ copy.common.getStarted }}
      </UButton>
      <UButton
        :to="localePath('/services')"
        size="xl"
        variant="outline"
        color="neutral"
        class="justify-center text-white ring-white/25 bg-white/10 hover:text-navy-700"
      >
        {{ copy.products.explore }}
      </UButton>
    </SitePageHero>

    <section
      :data-nav-label="copy.sections.products"
      class="px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
    >
      <div class="mx-auto max-w-7xl">
        <SiteSectionHeading
          :eyebrow="copy.products.list.eyebrow"
          :title="copy.products.list.title"
          :description="copy.products.list.description"
        />

        <div class="mt-14">
          <SiteProductShowcase :items="products" />
        </div>
      </div>
    </section>

    <section
      :data-nav-label="copy.sections.architecture"
      class="border-y border-default bg-elevated/30 px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
    >
      <div class="mx-auto max-w-6xl">
        <SiteSectionHeading
          :eyebrow="copy.products.architecture.eyebrow"
          :title="copy.products.architecture.title"
          :description="copy.products.architecture.description"
        />

        <div class="mt-12">
          <SiteArchitectureInsights />
        </div>
      </div>
    </section>

    <section
      :data-nav-label="copy.sections.ngsMap"
      class="relative isolate overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
    >
      <!-- animated background: Inspira UI Flickering Grid, faded towards the edges, with a soft glow behind the core -->
      <div
        class="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div class="absolute inset-0 [mask-image:radial-gradient(ellipse_85%_75%_at_50%_58%,black_25%,transparent)]">
          <ClientOnly>
            <UiFlickeringGrid
              :square-size="4"
              :grid-gap="6"
              :flicker-chance="0.25"
              :color="gridColor"
              :max-opacity="gridOpacity"
            />
          </ClientOnly>
        </div>
        <div class="absolute top-[60%] left-1/2 h-[30rem] w-[min(44rem,100%)] -translate-x-1/2 -translate-y-1/2 animate-aurora rounded-full bg-navy-500/10 blur-[120px] dark:bg-navy-500/25" />
        <div
          class="absolute top-[62%] left-1/2 size-[20rem] -translate-x-1/2 -translate-y-1/2 animate-aurora rounded-full bg-signal-500/15 blur-[90px]"
          style="animation-delay: -8s;"
        />
      </div>

      <div class="mx-auto max-w-5xl">
        <SiteSectionHeading
          :eyebrow="copy.products.map.eyebrow"
          :title="copy.products.map.title"
          :description="copy.products.map.description"
        />

        <div class="mt-12">
          <SiteEcosystemDiagram />
        </div>
      </div>
    </section>

    <SiteCtaBanner
      :title="copy.products.cta.title"
      :highlight="copy.products.cta.highlight"
      :description="copy.products.cta.description"
    />
  </div>
</template>
