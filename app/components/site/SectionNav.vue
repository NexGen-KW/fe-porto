<script setup lang="ts">
const { sections, activeId, scrollTo } = useSectionNav()
const copy = useCopy()
</script>

<template>
  <nav
    v-if="sections.length > 1"
    :aria-label="copy.nav.pageSections"
    class="group/nav fixed top-1/2 end-3 z-40 hidden -translate-y-1/2 lg:block 2xl:end-8"
  >
    <!-- below 2xl the side gutter is too narrow for the labels, so only the ticks show until the menu is hovered or focused -->
    <ul class="flex flex-col items-end gap-3">
      <li
        v-for="section in sections"
        :key="section.id"
      >
        <button
          type="button"
          class="group flex items-center gap-3 focus:outline-none"
          :aria-current="activeId === section.id ? 'true' : undefined"
          @click="scrollTo(section.id)"
        >
          <span
            class="pointer-events-none rounded-md bg-default/90 px-1.5 py-0.5 font-mono text-xs font-medium tracking-wide whitespace-nowrap opacity-0 shadow-sm ring-1 ring-default backdrop-blur-sm transition-all duration-300 group-hover/nav:pointer-events-auto group-hover/nav:opacity-100 group-focus-within/nav:pointer-events-auto group-focus-within/nav:opacity-100 sm:text-sm 2xl:pointer-events-auto 2xl:bg-transparent 2xl:px-0 2xl:py-0 2xl:opacity-100 2xl:shadow-none 2xl:ring-0 2xl:backdrop-blur-none"
            :class="activeId === section.id
              ? 'translate-x-0 text-primary'
              : 'translate-x-1 text-dimmed rtl:-translate-x-1 group-hover:translate-x-0 group-hover:text-muted group-focus-visible:translate-x-0 group-focus-visible:text-muted'"
          >
            {{ section.label }}
          </span>
          <span
            class="block h-px rounded-full bg-current transition-all duration-300"
            :class="activeId === section.id
              ? 'w-5 text-primary 2xl:w-7'
              : 'w-2.5 text-dimmed 2xl:w-3.5 group-hover:w-5 group-hover:text-muted group-focus-visible:w-5 group-focus-visible:text-muted'"
          />
        </button>
      </li>
    </ul>
  </nav>
</template>
