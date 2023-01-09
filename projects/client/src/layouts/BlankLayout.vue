<template>
  <v-app>
    <v-main>
      <v-fade-transition mode="out-in">
        <slot />
      </v-fade-transition>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'BlankLayout',
}
</script>
