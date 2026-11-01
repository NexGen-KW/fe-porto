<script setup lang="ts">
import { company, useImpactMetrics } from '~/data/company'

const copy = useCopy()
const impactMetrics = useImpactMetrics()

useSeoMeta({
  title: () => copy.value.meta.about.title,
  ogTitle: () => copy.value.meta.about.title,
  description: () => copy.value.meta.about.description,
  ogDescription: () => copy.value.meta.about.description
})

const impactEntries = computed(() => [
  { ...impactMetrics.value.years, hash: 'a3f9c1d' },
  { ...impactMetrics.value.pullRequests, hash: '7b2e440' },
  { ...impactMetrics.value.deployments, hash: 'e91ac08' },
  { ...impactMetrics.value.codeReviews, hash: '5d60f31' },
  { ...impactMetrics.value.projects, hash: 'c48b7e2' }
])
</script>

<template>
  <div>
    <SitePageHero
      :eyebrow="copy.about.hero.eyebrow"
      :title="copy.about.hero.title"
      :highlight="copy.about.hero.highlight"
      :description="copy.about.hero.description"
    />

    <section
      :data-nav-label="copy.sections.story"
      class="overflow-x-clip px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
    >
      <div class="mx-auto max-w-7xl">
        <SiteStoryBlock />
      </div>
    </section>

    <section
      :data-nav-label="copy.sections.whyUs"
      class="relative isolate overflow-hidden border-y border-default bg-elevated/30 px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
    >
      <div class="mx-auto max-w-7xl">
        <SiteWhyChooseUs />
      </div>
    </section>

    <section
      :data-nav-label="copy.sections.vision"
      class="px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
    >
      <div class="mx-auto max-w-6xl">
        <SiteSectionHeading
          :eyebrow="copy.about.vision.eyebrow"
          :title="copy.about.vision.title"
        />

        <div class="mt-14">
          <SiteVisionTabs />
        </div>
      </div>
    </section>

    <section
      :data-nav-label="copy.sections.values"
      class="border-y border-default bg-elevated/30 px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
    >
      <div class="mx-auto max-w-7xl">
        <SiteSectionHeading
          :eyebrow="copy.about.values.eyebrow"
          :title="copy.about.values.title"
        />

        <div class="mt-14">
          <SiteValuesGrid />
        </div>
      </div>
    </section>

    <section
      :data-nav-label="copy.sections.team"
      class="px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
    >
      <div class="mx-auto max-w-6xl">
        <SiteSectionHeading
          :eyebrow="copy.about.team.eyebrow"
          :title="copy.about.team.title"
          :description="copy.about.team.description"
        />

        <div class="mt-14">
          <SiteTeamCulture />
        </div>
      </div>
    </section>

    <section
      :data-nav-label="copy.sections.milestones"
      class="relative isolate overflow-hidden border-y border-default bg-elevated/30 px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
    >
      <div
        class="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[30rem] w-[min(50rem,100%)] -translate-x-1/2 -translate-y-1/2 animate-aurora rounded-full bg-navy-500/10 blur-[120px] dark:bg-navy-500/20"
        aria-hidden="true"
      />
      <div class="mx-auto max-w-5xl">
        <SiteSectionHeading
          :eyebrow="copy.about.milestones.eyebrow"
          :title="fill(copy.about.milestones.title, { year: company.founded })"
          :description="copy.about.milestones.description"
        />

        <div class="mt-16">
          <SiteMilestoneTimeline />
        </div>
      </div>
    </section>

    <section
      :data-nav-label="copy.sections.impact"
      class="px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
    >
      <div class="mx-auto max-w-4xl">
        <SiteSectionHeading
          :eyebrow="copy.about.impact.eyebrow"
          :title="copy.about.impact.title"
        />

        <div class="mt-12">
          <SiteImpactLedger :entries="impactEntries" />
        </div>
      </div>
    </section>

    <SiteCtaBanner
      :title="copy.about.cta.title"
      :highlight="copy.about.cta.highlight"
      :description="copy.about.cta.description"
      :secondary-label="copy.common.ourServices"
      secondary-to="/services"
    />
  </div>
</template>
