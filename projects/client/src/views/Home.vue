<template>
  <span>
    <v-container fluid style="padding: 0px !important">
      <MovieCarousel />
    </v-container>
    <v-container fluid class="mt-10">
      <v-card-title class="text-h5">
        Sua coleção
      </v-card-title>
      
      <MovieCardList @click:card="openMovieDetails" />
  
      <BaseModalContent v-model="showMovieDetailModal" height="auto" width="800">
        <MovieCardDetail :movie="selectedMovie" />
      </BaseModalContent>
    </v-container>
  </span>
</template>

<script>
import { mapState } from 'pinia'

import { greetUser } from '@/helpers'
import { useUserStore } from '@/stores'

import BaseModalContent from '@/components/BaseModalContent.vue'
import MovieCarousel from '@/components/MovieCarousel.vue'
import MovieCardDetail from '@/components/MovieCardDetail.vue'
import MovieCardList from '@/components/MovieCardList.vue'

export default {
  name: 'HomePage',
  components: {
    BaseModalContent,
    MovieCarousel,
    MovieCardDetail,
    MovieCardList,
  },
  data() {
    return {
      showMovieDetailModal: false,
      selectedMovie: null
    }
  },
  computed: {
    ...mapState(useUserStore, ['userLoggedIn']),
    greet() {
      return greetUser(this.userLoggedIn.name)
    }
  },
  methods: {
    openMovieDetails(movie) {
      this.selectedMovie = { ...movie };
      this.showMovieDetailModal = true;
    }
  }
}
</script>
