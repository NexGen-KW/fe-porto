<template>
  <div class="flex min-h-screen flex-col bg-default">
    <SiteNavbar />
    <SiteSectionNav />
    <SiteBackToTop />
    <main class="flex-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
