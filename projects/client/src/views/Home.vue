<template>
  <span>
    <v-container fluid style="padding: 0px !important">
      <MovieCarousel />
    </v-container>
    <v-container fluid class="mt-10">
      <v-card-title class="text-h5">Sua coleção</v-card-title>
      <MovieCardList />
    </v-container>
  </span>
</template>

<script>
import { mapState } from 'pinia'

import { greetUser } from '@/helpers'
import { useUserStore } from '@/stores'

import MovieCarousel from '@/components/MovieCarousel.vue'
import MovieCardList from '@/components/MovieCardList.vue'

export default {
  name: 'HomePage',
  components: {
    MovieCarousel,
    MovieCardList
  },
  computed: {
    ...mapState(useUserStore, ['userLoggedIn']),
    greet() {
      return greetUser(this.userLoggedIn.name)
    }
  }
}
</script>
