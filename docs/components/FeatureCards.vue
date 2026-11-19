<script setup lang="ts">
const features = [
  {
    icon: '📧',
    title: 'Vue Email Templates',
    description: 'Write beautiful, type-safe email templates using Vue components with full TypeScript support.',
    link: '/guides/templates'
  },
  {
    icon: '🔌',
    title: 'Multiple Providers',
    description: 'Built-in support for Mailgun, Mailcatcher, and easily extensible for custom email providers.',
    link: '/guides/providers'
  },
  {
    icon: '🛠️',
    title: 'DevTools Integration',
    description: 'Preview, test, and debug your emails directly in Nuxt DevTools with live rendering.',
    link: '/guides/devtools'
  },
  {
    icon: '🪝',
    title: 'Extensible Hooks',
    description: 'Powerful hooks system to intercept and modify emails at every stage of the sending process.',
    link: '/guides/hooks'
  },
  {
    icon: '⚡',
    title: 'Type-Safe API',
    description: 'Fully typed composables and utilities with excellent IDE autocompletion support.',
    link: '/api/useemail'
  },
  {
    icon: '🎨',
    title: 'Easy Styling',
    description: 'Style your emails with familiar Vue syntax and benefit from component reusability.',
    link: '/guides/templates'
  }
]
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12 relative z-10">
    <a
      v-for="feature in features"
      :key="feature.title"
      :href="feature.link"
      class="group block p-6 rounded-lg border border-border bg-card hover:bg-accent hover:shadow-lg transition-all duration-300 hover:scale-105"
    >
      <div class="text-4xl mb-4">{{ feature.icon }}</div>
      <h3 class="text-xl font-semibold mb-2 text-card-foreground group-hover:text-primary transition-colors">
        {{ feature.title }}
      </h3>
      <p class="text-muted-foreground text-sm">
        {{ feature.description }}
      </p>
    </a>
  </div>
</template>
