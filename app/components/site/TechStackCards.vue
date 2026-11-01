<script setup lang="ts">
interface Chip {
  label: string
  icon: string
}

type CardId = 'ai' | 'backend' | 'database' | 'devops' | 'frontend' | 'ux' | 'azure'
type ChipKey = 'llm' | 'fineTuning' | 'evaluation' | 'cleanArch' | 'restApis' | 'i18n' | 'userFriendly' | 'designThinking' | 'colorSystems'

interface StackCard {
  /** English path segment shown in the card's code-style header; also keys its copy */
  id: CardId
  icon: string
  chips: (Chip | { key: ChipKey, icon: string })[]
  /** Featured cards span two columns and get a scrolling chip rail + a live command line */
  command?: string
  span?: string
}

const cardBase: StackCard[] = [
  {
    icon: 'i-lucide-brain-circuit',
    id: 'ai',
    command: 'ngs.ai.route(prompt) → rag → answer',
    span: 'sm:col-span-2',
    chips: [
      { label: 'Copilot', icon: 'i-simple-icons-githubcopilot' },
      { key: 'llm', icon: 'i-lucide-sparkles' },
      { label: 'RAG', icon: 'i-lucide-search-code' },
      { key: 'fineTuning', icon: 'i-lucide-sliders-horizontal' },
      { label: 'Azure OpenAI', icon: 'i-lucide-bot' },
      { key: 'evaluation', icon: 'i-lucide-flask-conical' }
    ]
  },
  {
    icon: 'i-lucide-server-cog',
    id: 'backend',
    chips: [
      { label: 'C#', icon: 'i-simple-icons-csharp' },
      { label: '.NET', icon: 'i-simple-icons-dotnet' },
      { key: 'cleanArch', icon: 'i-lucide-layers' },
      { key: 'restApis', icon: 'i-lucide-webhook' }
    ]
  },
  {
    icon: 'i-lucide-database',
    id: 'database',
    chips: [
      { label: 'SQL Server', icon: 'i-simple-icons-microsoftsqlserver' },
      { label: 'PostgreSQL', icon: 'i-simple-icons-postgresql' },
      { label: 'Redis', icon: 'i-simple-icons-redis' },
      { label: 'EF Core', icon: 'i-lucide-table-properties' }
    ]
  },
  {
    icon: 'i-lucide-infinity',
    id: 'devops',
    chips: [
      { label: 'Docker', icon: 'i-simple-icons-docker' },
      { label: 'Jenkins', icon: 'i-simple-icons-jenkins' },
      { label: 'GitHub Actions', icon: 'i-simple-icons-githubactions' },
      { label: 'CI/CD', icon: 'i-lucide-git-branch' }
    ]
  },
  {
    icon: 'i-lucide-layout-template',
    id: 'frontend',
    chips: [
      { label: 'Vue.js', icon: 'i-simple-icons-vuedotjs' },
      { label: 'Nuxt UI', icon: 'i-simple-icons-nuxt' },
      { key: 'i18n', icon: 'i-lucide-languages' },
      { label: 'TypeScript', icon: 'i-simple-icons-typescript' }
    ]
  },
  {
    icon: 'i-lucide-palette',
    id: 'ux',
    span: 'sm:col-span-2 lg:col-span-1',
    chips: [
      { key: 'userFriendly', icon: 'i-lucide-smile' },
      { key: 'designThinking', icon: 'i-lucide-lightbulb' },
      { label: 'MCP + AI', icon: 'i-lucide-wand-sparkles' },
      { key: 'colorSystems', icon: 'i-lucide-swatch-book' }
    ]
  },
  {
    icon: 'i-simple-icons-microsoftazure',
    id: 'azure',
    command: 'az deploy --region=global --zero-downtime',
    span: 'sm:col-span-2',
    chips: [
      { label: 'Azure SQL', icon: 'i-lucide-database' },
      { label: 'App Service', icon: 'i-lucide-server' },
      { label: 'Blob Storage', icon: 'i-lucide-hard-drive' },
      { label: 'SignalR', icon: 'i-lucide-radio' },
      { label: 'Key Vault', icon: 'i-lucide-key' },
      { label: 'Azure OpenAI', icon: 'i-lucide-bot' }
    ]
  }
]

const copy = useCopy()
const cards = computed(() => cardBase.map(card => ({
  ...card,
  ...copy.value.techStack.cards[card.id],
  chips: card.chips.map(chip => ('key' in chip ? { label: copy.value.techStack.chips[chip.key], icon: chip.icon } : chip))
})))

const { target, isVisible, revealDelay } = useRevealAnimation()
const { handlePointerMove, handlePointerLeave } = useListCardInteraction(3)
</script>

<template>
  <div
    ref="target"
    class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
  >
    <article
      v-for="(card, i) in cards"
      :key="card.id"
      class="reveal spotlight-card tilt-card group relative overflow-hidden rounded-2xl border bg-elevated/50 transition-shadow duration-300 hover:shadow-xl hover:shadow-signal-500/10"
      :class="[
        isVisible && 'reveal-visible',
        card.span,
        card.command ? 'border-primary/20' : 'border-default'
      ]"
      :style="{ transitionDelay: revealDelay(i) }"
      @pointermove="handlePointerMove"
      @pointerleave="handlePointerLeave"
    >
      <!-- rotating border beam: always on for featured cards, on hover for the rest -->
      <span
        class="border-beam absolute inset-0 transition-opacity duration-500"
        :class="card.command ? 'opacity-70' : 'opacity-0 group-hover:opacity-100'"
        aria-hidden="true"
      />

      <!-- oversized drifting category glyph -->
      <UIcon
        :name="card.icon"
        class="pointer-events-none absolute -end-6 -bottom-8 size-40 animate-float-slow text-primary/[0.05] transition-colors duration-500 group-hover:text-primary/10"
        :style="{ animationDelay: `${-i * 1.3}s` }"
        aria-hidden="true"
      />

      <div
        v-if="card.command"
        class="pointer-events-none absolute inset-0 opacity-50 rtl:-scale-x-100"
        style="background-image: linear-gradient(to right, var(--ui-border) 1px, transparent 1px), linear-gradient(to bottom, var(--ui-border) 1px, transparent 1px); background-size: 24px 24px; mask-image: radial-gradient(ellipse at top left, black, transparent 65%);"
        aria-hidden="true"
      />

      <div class="relative z-10 flex h-full flex-col p-6">
        <!-- file-path header -->
        <div class="flex items-center justify-between gap-2 font-mono text-[11px]">
          <span
            class="truncate text-dimmed"
            dir="ltr"
          >
            {{ String(i + 1).padStart(2, '0') }} <span class="text-muted">~/stack/</span><span class="text-primary">{{ card.id }}</span>
          </span>
          <span class="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-primary">
            <span class="relative flex size-1.5">
              <span class="absolute inline-flex size-full animate-ping rounded-full bg-signal-400 opacity-60" />
              <span class="relative inline-flex size-1.5 rounded-full bg-signal-500" />
            </span>
            {{ card.command ? copy.techStack.core : copy.techStack.stable }}
          </span>
        </div>

        <div
          class="mt-5 flex gap-4"
          :class="card.command ? 'flex-col lg:flex-row lg:items-center' : 'flex-col'"
        >
          <div class="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-navy-700 to-navy-900 text-signal-400 shadow-md ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
            <UIcon
              :name="card.icon"
              class="size-6"
            />
          </div>
          <div class="min-w-0">
            <h3 class="font-mono text-lg font-semibold text-highlighted rtl:font-display">
              {{ card.title }}
            </h3>
            <p class="mt-1 text-sm leading-relaxed text-muted">
              {{ card.description }}
            </p>
          </div>
        </div>

        <!-- featured: live command line + scrolling chip rail -->
        <template v-if="card.command">
          <p
            class="mt-5 flex items-center gap-2 overflow-hidden rounded-lg border border-white/10 bg-navy-950 px-3 py-2 font-mono text-[12px] text-white/70"
            dir="ltr"
          >
            <span class="text-signal-400">$</span>
            <span class="truncate">{{ card.command }}</span>
            <span class="h-3.5 w-1.5 shrink-0 animate-blink bg-signal-400" />
          </p>

          <div class="relative mt-5 -mx-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <div class="flex w-max animate-marquee-half hover:[animation-play-state:paused]">
              <ul
                v-for="dup in 2"
                :key="dup"
                class="flex shrink-0 gap-2 pe-2"
                :aria-hidden="dup === 2"
              >
                <li
                  v-for="chip in card.chips"
                  :key="chip.label"
                  class="inline-flex items-center gap-1.5 rounded-lg border border-default bg-default/70 px-2.5 py-1.5 text-xs font-medium whitespace-nowrap text-highlighted"
                >
                  <UIcon
                    :name="chip.icon"
                    class="size-3.5 text-primary"
                  />
                  {{ chip.label }}
                </li>
              </ul>
            </div>
          </div>
        </template>

        <!-- regular: chips cascade in on reveal, lift on hover -->
        <ul
          v-else
          class="mt-5 flex flex-wrap gap-2"
        >
          <li
            v-for="(chip, j) in card.chips"
            :key="chip.label"
            class="inline-flex items-center gap-1.5 rounded-lg border border-default bg-default/70 px-2.5 py-1.5 text-xs font-medium text-highlighted transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/40"
            :class="isVisible ? 'animate-chip-in' : 'opacity-0'"
            :style="{ animationDelay: `${350 + i * 90 + j * 70}ms` }"
          >
            <UIcon
              :name="chip.icon"
              class="size-3.5 text-primary"
            />
            {{ chip.label }}
          </li>
        </ul>
      </div>
    </article>
  </div>
</template>
