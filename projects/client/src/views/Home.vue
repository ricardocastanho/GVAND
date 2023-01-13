<template>
  <v-container fluid style="padding: 0px !important">
    <MovieCarousel />
  </v-container>
</template>

<script>
import { mapState } from 'pinia'

import { greetUser } from '@/helpers'
import { useUserStore } from '@/stores'

import MovieCarousel from '@/components/MovieCarousel.vue'

export default {
  name: 'HomePage',
  components: {
    MovieCarousel
  },
  computed: {
    ...mapState(useUserStore, ['userLoggedIn']),
    greet() {
      return greetUser(this.userLoggedIn.name)
    }
  }
}
</script>
