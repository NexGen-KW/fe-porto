<script setup lang="ts">
import { motion } from 'motion-v'
import { useCatalog } from '~/data/catalog'

const copy = useCopy()
const localePath = useLocalePath()
const { services } = useCatalog()

useSeoMeta({
  title: () => copy.value.meta.services.title,
  ogTitle: () => copy.value.meta.services.title,
  description: () => copy.value.meta.services.description,
  ogDescription: () => copy.value.meta.services.description
})

const stepIcons = ['i-lucide-search', 'i-lucide-pencil-ruler', 'i-lucide-hammer', 'i-lucide-flask-conical', 'i-lucide-rocket']
// `key` stays English: it is the script name in the methodology "terminal"
const stepKeys = ['discovery-workshop', 'architecture-design', 'iterative-build', 'qa-hardening', 'launch-handoff']
const steps = computed(() => copy.value.services.process.steps.map((step, i) => ({ ...step, icon: stepIcons[i]!, key: stepKeys[i]! })))

const resultsData = computed(() => {
  const labels = copy.value.services.results.metrics
  return [
    { slug: 'delivery_speed', metric: labels.speed, before: 32, after: 78, better: 'higher' as const },
    { slug: 'infra_cost', metric: labels.cost, before: 65, after: 38, better: 'lower' as const },
    { slug: 'deploy_frequency', metric: labels.deploys, before: 24, after: 91, better: 'higher' as const },
    { slug: 'incident_rate', metric: labels.incidents, before: 58, after: 12, better: 'lower' as const }
  ]
})

const colorMode = useColorMode()
const gridColor = computed(() => (colorMode.value === 'dark' ? '#4CAF50' : '#1B2A6B'))
const gridOpacity = computed(() => (colorMode.value === 'dark' ? 0.28 : 0.14))
</script>

<template>
  <div>
    <SitePageHero
      :eyebrow="copy.services.hero.eyebrow"
      :title="copy.services.hero.title"
      :highlight="copy.services.hero.highlight"
      :description="copy.services.hero.description"
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
        :to="localePath('/products')"
        size="xl"
        variant="outline"
        color="neutral"
        class="justify-center text-white ring-white/25 bg-white/10 hover:text-navy-700"
      >
        {{ copy.common.viewProducts }}
      </UButton>
    </SitePageHero>

    <section
      :data-nav-label="copy.sections.services"
      class="px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
    >
      <div class="mx-auto max-w-7xl">
        <SiteSectionHeading
          :eyebrow="copy.services.list.eyebrow"
          :title="copy.services.list.title"
          :description="copy.services.list.description"
        />

        <div class="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <motion.div
            v-for="(service, i) in services"
            :key="service.slug"
            :initial="{ opacity: 0, y: 32 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :in-view-options="{ once: true, margin: '-80px' }"
            :transition="{ duration: 0.6, delay: (i % 2) * 0.12, ease: [0.16, 1, 0.3, 1] }"
          >
            <SiteServiceCard
              :item="service"
              :index="i"
            />
          </motion.div>
        </div>
      </div>
    </section>

    <section
      :data-nav-label="copy.sections.process"
      class="border-y border-default bg-elevated/30 px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
    >
      <div class="mx-auto max-w-7xl">
        <SiteSectionHeading
          :eyebrow="copy.services.process.eyebrow"
          :title="copy.services.process.title"
          :description="copy.services.process.description"
        />

        <div class="mt-14">
          <SiteMethodologyBoard :steps="steps" />
        </div>
      </div>
    </section>

    <section
      :data-nav-label="copy.sections.results"
      class="relative isolate overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
    >
      <!-- animated background: Inspira UI Flickering Grid -->
      <div
        class="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_55%,black,transparent)]"
        aria-hidden="true"
      >
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
      <div class="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[26rem] w-[min(44rem,100%)] -translate-x-1/2 -translate-y-1/2 animate-aurora rounded-full bg-signal-500/10 blur-[120px]" />

      <div class="mx-auto max-w-5xl">
        <SiteSectionHeading
          :eyebrow="copy.services.results.eyebrow"
          :title="copy.services.results.title"
          :description="copy.services.results.description"
        />

        <div class="mt-12">
          <SiteImpactDiff :results="resultsData" />
        </div>
      </div>
    </section>

    <SiteCtaBanner
      :title="copy.services.cta.title"
      :highlight="copy.services.cta.highlight"
      :description="copy.services.cta.description"
    />
  </div>
</template>
