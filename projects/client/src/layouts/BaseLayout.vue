<template>
  <v-app>
    <TheSidebar />

    <v-main class="py-6">
      <v-fade-transition mode="out-in">
        <slot />
      </v-fade-transition>
    </v-main>
  </v-app>
</template>

<script>
import TheSidebar from '../components/TheSidebar.vue';

export default {
  name: 'BaseLayout',
  components: {
    TheSidebar,
  },
}
</script>
