<script setup lang="ts">
type RoleKey = 'engineering' | 'qa' | 'design' | 'strategy'
type ToolKey = 'accessibility' | 'localization' | 'workshops'

// tool names are products (never translated); generic practices are keyed into the locale
const roleBase: { key: RoleKey, icon: string, tools: ({ label: string, icon: string } | { key: ToolKey, icon: string })[] }[] = [
  {
    key: 'engineering',
    icon: 'i-lucide-code-2',
    tools: [
      { label: 'Vue.js', icon: 'i-simple-icons-vuedotjs' },
      { label: '.NET', icon: 'i-simple-icons-dotnet' },
      { label: 'Azure', icon: 'i-simple-icons-microsoftazure' },
      { label: 'Docker', icon: 'i-simple-icons-docker' }
    ]
  },
  {
    key: 'qa',
    icon: 'i-lucide-flask-conical',
    tools: [
      { label: 'Selenium', icon: 'i-simple-icons-selenium' },
      { label: 'Cypress', icon: 'i-simple-icons-cypress' },
      { label: 'Postman', icon: 'i-simple-icons-postman' },
      { label: 'k6', icon: 'i-simple-icons-k6' }
    ]
  },
  {
    key: 'design',
    icon: 'i-lucide-palette',
    tools: [
      { label: 'Figma', icon: 'i-simple-icons-figma' },
      { label: 'Miro', icon: 'i-simple-icons-miro' },
      { key: 'accessibility', icon: 'i-lucide-accessibility' },
      { key: 'localization', icon: 'i-lucide-languages' }
    ]
  },
  {
    key: 'strategy',
    icon: 'i-lucide-target',
    tools: [
      { label: 'Jira', icon: 'i-simple-icons-jira' },
      { label: 'Confluence', icon: 'i-simple-icons-confluence' },
      { label: 'Azure DevOps', icon: 'i-simple-icons-azuredevops' },
      { key: 'workshops', icon: 'i-lucide-presentation' }
    ]
  }
]

const copy = useCopy()
const roles = computed(() => roleBase.map(role => ({
  icon: role.icon,
  ...copy.value.about.team.roles[role.key],
  tools: role.tools.map(tool => ('key' in tool ? { label: copy.value.about.team.tools[tool.key], icon: tool.icon } : tool))
})))

const cultureIcons = ['i-lucide-globe', 'i-lucide-graduation-cap', 'i-lucide-git-pull-request', 'i-lucide-infinity', 'i-lucide-flag', 'i-lucide-shield-check']
const rows = computed(() => {
  const culture = copy.value.about.team.culture.map((label, i) => ({ label, icon: cultureIcons[i]! }))
  return [culture.slice(0, 3), culture.slice(3)]
})

const { target, isVisible, revealDelay } = useRevealAnimation()
</script>

<template>
  <div
    ref="target"
    class="space-y-5"
  >
    <!-- team.json status strip -->
    <div
      class="reveal relative overflow-hidden rounded-2xl border border-white/10 bg-navy-950 px-5 py-4 text-white shadow-xl"
      :class="isVisible && 'reveal-visible'"
    >
      <div
        class="pointer-events-none absolute inset-0 animate-grid-pan opacity-40"
        style="background-image: linear-gradient(to right, rgb(255 255 255 / 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.06) 1px, transparent 1px); background-size: 28px 28px; mask-image: linear-gradient(to right, transparent, black 40%, black 60%, transparent);"
        aria-hidden="true"
      />
      <div class="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div class="flex items-center gap-3">
          <span class="inline-flex size-10 items-center justify-center rounded-xl bg-signal-500/15 text-signal-400 ring-1 ring-signal-400/30">
            <UIcon
              name="i-lucide-braces"
              class="size-5"
            />
          </span>
          <div>
            <p class="font-mono text-[11px] text-white/40">
              team.json
            </p>
            <p
              class="font-mono text-sm sm:text-base"
              dir="ltr"
            >
              <template
                v-for="(trait, t) in copy.about.team.traits"
                :key="trait.key"
              >
                <span class="text-white/50">{{ trait.key }}:</span>
                <span class="font-semibold text-signal-400">"{{ trait.value }}"</span><span
                  v-if="t < copy.about.team.traits.length - 1"
                  class="text-white/30"
                > · </span>
              </template>
            </p>
          </div>
        </div>

        <ul class="flex flex-wrap gap-2 font-mono text-[11px]">
          <li
            v-for="(region, i) in copy.about.team.regions"
            :key="region"
            class="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-white/70"
          >
            <span class="relative flex size-1.5">
              <span
                class="absolute inline-flex size-full animate-ping rounded-full bg-signal-400 opacity-70"
                :style="{ animationDelay: `${i * 0.5}s` }"
              />
              <span class="relative inline-flex size-1.5 rounded-full bg-signal-400" />
            </span>
            {{ region }} {{ copy.about.team.online }}
          </li>
        </ul>
      </div>
    </div>

    <!-- role cards -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="(role, i) in roles"
        :key="role.title"
        class="reveal"
        :class="isVisible && 'reveal-visible'"
        :style="{ transitionDelay: revealDelay(i + 1, 110) }"
      >
        <SiteTeamRoleCard
          v-bind="role"
          :active="isVisible"
          :index="i"
          class="h-full"
        />
      </div>
    </div>

    <!-- culture marquee: two rows drifting in opposite directions -->
    <div
      class="reveal space-y-3 overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      :class="isVisible && 'reveal-visible'"
      :style="{ transitionDelay: revealDelay(5, 110) }"
    >
      <div
        v-for="(row, r) in rows"
        :key="r"
        class="flex w-max animate-marquee-half hover:[animation-play-state:paused]"
        :style="{ animationDuration: '36s', animationDirection: r === 1 ? 'reverse' : 'normal' }"
      >
        <ul
          v-for="dup in 4"
          :key="dup"
          class="flex shrink-0 gap-3 pe-3"
          :aria-hidden="dup > 1"
        >
          <li
            v-for="item in row"
            :key="item.label"
            class="inline-flex items-center gap-2.5 rounded-full border border-default bg-elevated/60 py-2 ps-2 pe-4 text-sm font-medium whitespace-nowrap text-highlighted transition-colors hover:border-primary/40"
          >
            <span class="inline-flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary">
              <UIcon
                :name="item.icon"
                class="size-4"
              />
            </span>
            {{ item.label }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
