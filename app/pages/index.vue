<script setup lang="ts">
import { useCatalog } from '~/data/catalog'
import { useImpactMetrics } from '~/data/company'

const copy = useCopy()
const localePath = useLocalePath()
const { products } = useCatalog()
const impactMetrics = useImpactMetrics()

const { target: whyTarget, isVisible: whyVisible, revealDelay: whyDelay } = useRevealAnimation()
const { target: productsTarget, isVisible: productsVisible, revealDelay: productsDelay } = useRevealAnimation()
const { target: testimonialsTarget, isVisible: testimonialsVisible } = useRevealAnimation()

const whyIcons = ['i-lucide-brain-circuit', 'i-lucide-gauge', 'i-lucide-shield-check', 'i-lucide-life-buoy']
const whyFeatures = computed(() => copy.value.home.why.features.map((feature, i) => ({ ...feature, icon: whyIcons[i]! })))

const stepIcons = ['i-lucide-search', 'i-lucide-pencil-ruler', 'i-lucide-code-2', 'i-lucide-rocket']
// `key` stays English: it names the stage in the console's code-style output
const stepKeys = ['discover', 'design', 'build', 'launch-and-scale']
const steps = computed(() => copy.value.home.process.steps.map((step, i) => ({ ...step, icon: stepIcons[i]!, key: stepKeys[i]! })))

const metrics = computed(() => [
  impactMetrics.value.projects,
  impactMetrics.value.clients,
  impactMetrics.value.pullRequests,
  impactMetrics.value.years
])
</script>

<template>
  <div>
    <SiteHero />

    <section
      :data-nav-label="copy.sections.stack"
      class="border-b border-default py-12 sm:py-14"
    >
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p class="text-center font-mono text-lg font-semibold tracking-wide text-highlighted uppercase sm:text-xl">
          {{ copy.home.stackTitle }}
        </p>
        <div class="mt-8">
          <SiteLogoMarquee />
        </div>
      </div>
    </section>

    <section
      :data-nav-label="copy.sections.whyUs"
      class="px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <div class="mx-auto max-w-7xl">
        <SiteSectionHeading
          :eyebrow="copy.home.why.eyebrow"
          :title="copy.home.why.title"
          :description="copy.home.why.description"
        />

        <div
          ref="whyTarget"
          class="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div
            v-for="(feature, i) in whyFeatures"
            :key="feature.title"
            class="reveal"
            :class="whyVisible && 'reveal-visible'"
            :style="{ transitionDelay: whyDelay(i) }"
          >
            <SiteFeatureCard
              v-bind="feature"
              :index="i"
            />
          </div>
        </div>
      </div>
    </section>

    <section
      :data-nav-label="copy.sections.solutions"
      class="border-y border-default bg-elevated/30 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <div class="mx-auto max-w-7xl">
        <SiteSectionHeading
          :eyebrow="copy.home.solutions.eyebrow"
          :title="copy.home.solutions.title"
          :description="copy.home.solutions.description"
        />

        <div
          ref="productsTarget"
          class="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div
            v-for="(product, i) in products"
            :key="product.slug"
            class="reveal"
            :class="[productsVisible && 'reveal-visible', i === 0 && 'sm:col-span-2 lg:row-span-2']"
            :style="{ transitionDelay: productsDelay(i) }"
          >
            <SiteSolutionCard
              :item="product"
              :index="i"
              :featured="i === 0"
            />
          </div>
        </div>

        <div class="mt-10 text-center">
          <UButton
            :to="localePath('/products')"
            size="lg"
            variant="subtle"
            color="primary"
            trailing-icon="i-lucide-arrow-right"
          >
            {{ copy.home.solutions.viewAll }}
          </UButton>
        </div>
      </div>
    </section>

    <section
      :data-nav-label="copy.sections.process"
      class="relative isolate overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <div
        class="pointer-events-none absolute inset-0 -z-10 animate-grid-pan opacity-50"
        style="background-image: linear-gradient(to right, var(--ui-border) 1px, transparent 1px), linear-gradient(to bottom, var(--ui-border) 1px, transparent 1px); background-size: 56px 56px; mask-image: radial-gradient(ellipse 70% 60% at 50% 45%, black, transparent);"
      />
      <div class="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-[28rem] w-[min(48rem,100%)] -translate-x-1/2 animate-aurora rounded-full bg-signal-500/10 blur-[120px]" />

      <div class="mx-auto max-w-7xl">
        <SiteSectionHeading
          :eyebrow="copy.home.process.eyebrow"
          :title="copy.home.process.title"
          :description="copy.home.process.description"
        />

        <div class="mt-14">
          <SiteProcessFlow :steps="steps" />
        </div>
      </div>
    </section>

    <SiteLiveMetrics :metrics="metrics" />

    <section
      :data-nav-label="copy.sections.expertise"
      class="px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <div class="mx-auto max-w-7xl">
        <SiteSectionHeading
          :eyebrow="copy.home.stack.eyebrow"
          :title="copy.home.stack.title"
          :description="copy.home.stack.description"
        />

        <div
          ref="testimonialsTarget"
          class="reveal mt-14"
          :class="testimonialsVisible && 'reveal-visible'"
        >
          <SiteTechStackCards />
        </div>
      </div>
    </section>

    <SiteCtaBanner
      :title="copy.home.cta.title"
      :highlight="copy.home.cta.highlight"
      :description="copy.home.cta.description"
    />
  </div>
</template>
