<template>
  <span>
    <v-container fluid style="padding: 0px !important">
      <BaseMovieCarousel />
    </v-container>

    <v-container fluid class="mt-10">
      <div>
        <v-card-title class="text-h5">
          Filmes recomendados
        </v-card-title>
  
        <BaseMovieCardList
          :movies="recommendedMovies"
          :is-loading="!!isLoadingRecommended"
          @click:card="openMovieDetails"
        />
      </div>
      
      <div v-for="(genre, i) in genres" :key="i">
        <v-card-title class="text-h5">
          <v-skeleton-loader
            v-if="isLoadingGenres"
            width="200px"
            type="text"
          />

          <span v-else>
            {{ genre.name }}
          </span>
        </v-card-title>
        
        <MovieCardListByGenre :genre="genre" @click:card="openMovieDetails" />
      </div>
  
      <BaseModalContent v-model="showMovieDetailModal" height="auto" max-width="1200">
        <BaseMovieDetailCard
          :movie="selectedMovie"
          @click:movie-details="goToMovieDetails"
          @set-movie-rating="$_movieRateMixin_mergeMovieRating"
        />
      </BaseModalContent>
    </v-container>
  </span>
</template>

<script>
import { mapState } from 'pinia'

import { useUserStore } from '@/stores'
import { movieRateMixin } from '@/mixins/Movie.js'
import { UserFavoriteGenres } from '@/GraphQL/User.js'
import { UserRecommendedMovies } from '@/GraphQL/Movie.js'

import BaseModalContent from '@/components/BaseModalContent.vue'
import BaseMovieCarousel from '@/components/BaseMovieCarousel.vue'
import BaseMovieDetailCard from '@/components/BaseMovieDetailCard.vue'
import BaseMovieCardList from '@/components/BaseMovieCardList.vue'
import MovieCardListByGenre from '@/components/MovieCardListByGenre.vue'

export default {
  name: 'MoviesIndex',
  components: {
    BaseModalContent,
    BaseMovieCarousel,
    BaseMovieDetailCard,
    BaseMovieCardList,
    MovieCardListByGenre,
  },
  mixins: [movieRateMixin],
  apollo: {
    genres: {
      query: UserFavoriteGenres,
      loadingKey: 'isLoadingGenres',
      variables() {
        return {
          userId: this.userLoggedIn.userId,
          first: 5,
        }
      }
    },
    recommendedMovies: {
      query: UserRecommendedMovies,
      loadingKey: 'isLoadingRecommended',
      update: ({ movies }) => movies,
      fetchPolicy: 'cache-and-network',
      variables() {
        return {
          userId: this.userLoggedIn.userId,
          first: 10,
        }
      }
    }
  },
  data() {
    return {
      genres: new Array(5).fill({}),
      recommendedMovies: new Array(10).fill({}),
      showMovieDetailModal: false,
      selectedMovie: null,
      isLoadingGenres: 0,
      isLoadingRecommended: 0,
    }
  },
  computed: {
    ...mapState(useUserStore, ['userLoggedIn']),
  },
  methods: {
    openMovieDetails(movie) {
      this.selectedMovie = { ...movie };
      this.showMovieDetailModal = true;
    },
    goToMovieDetails(movie) {
      this.$router.push({
        name: 'MoviesDetail',
        params: {
          movieId: movie.movieId,
        }
      });
    }
  }
}
</script>
