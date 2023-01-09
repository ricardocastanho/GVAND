<template>
  <v-app>
    <v-app-bar app></v-app-bar>
    base
    <v-main>
      <v-fade-transition mode="out-in">
        <slot />
      </v-fade-transition>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'BaseLayout',
}
</script>
