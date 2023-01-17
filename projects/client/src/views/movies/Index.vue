<template>
  <span>
    <v-container fluid style="padding: 0px !important">
      <MovieCarousel />
    </v-container>
    <v-container fluid class="mt-10">
      <div v-for="(genre, i) in genres" :key="i">
        <v-card-title class="text-h5">
          <v-skeleton-loader
            v-if="isLoading"
            width="200px"
            type="text"
          />

          <span v-else>
            {{ genre.name }}
          </span>
        </v-card-title>
        
        <MovieCardList :genre="genre" @click:card="openMovieDetails" />
      </div>
  
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
import { UserFavoriteGenres } from '@/GraphQL/User.js'

import BaseModalContent from '@/components/BaseModalContent.vue'
import MovieCarousel from '@/components/MovieCarousel.vue'
import MovieCardDetail from '@/components/MovieCardDetail.vue'
import MovieCardList from '@/components/MovieCardList.vue'

export default {
  name: 'MoviesIndex',
  components: {
    BaseModalContent,
    MovieCarousel,
    MovieCardDetail,
    MovieCardList,
  },
  apollo: {
    genres: {
      query: UserFavoriteGenres,
      loadingKey: 'isLoading',
      variables() {
        return {
          userId: this.userLoggedIn.userId,
          first: 5,
        }
      }
    }
  },
  data() {
    return {
      genres: new Array(5).fill({}),
      showMovieDetailModal: false,
      selectedMovie: null,
      isLoading: 0
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
