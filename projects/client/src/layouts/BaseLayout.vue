<template>
  <v-app>
    <v-main>
      <v-fade-transition mode="out-in">
        <slot />
      </v-fade-transition>
    </v-main>
    
    <TheBottomNavigation />
  </v-app>
</template>

<script>
import TheBottomNavigation from '@/components/TheBottomNavigation.vue';

export default {
  name: 'BaseLayout',
  components: {
    TheBottomNavigation,
  },
}
</script>
