<template>
  <v-container class="my-16" >
    <v-row width="100%">
      <v-col align="center">
        <v-card width="80%" class="mt-10 py-5" style="position: relative;">
          <v-card-title class="text-h4" style="position: absolute; top: -80px;">
            Seus filmes favoritos estão aqui:
          </v-card-title>
          <BaseGrid :items="movies">
            <template #default="{ item: movie }">
              <div class="py-5">
                <v-skeleton-loader
                  v-if="isLoading"
                  height="450"
                  width="300"
                  type="image"
                />
                  
                <v-img
                  v-else
                  height="450"
                  width="300"
                  :src="movie.poster"
                  class="card-image"
                  @click="() => openMovieDetails(movie)"
                >
                  <template v-slot:placeholder>
                    <v-skeleton-loader
                      height="450"
                      width="300"
                      type="image"
                    />
                  </template>
                </v-img>
              </div>
            </template>
          </BaseGrid>
        </v-card>
      </v-col>
    </v-row>

    <BaseModalContent v-model="showMovieDetailModal" height="auto" max-width="1200">
      <BaseMovieDetailCard
        :movie="selectedMovie"
        @click:movie-details="goToMovieDetails"
        @set-movie-rating="$_movieRateMixin_mergeMovieRating"
      />
    </BaseModalContent>
  </v-container>
</template>

<script>
import { mapState } from 'pinia'

import { useUserStore } from '@/stores'
import { movieRateMixin } from '@/mixins/Movie.js'
import { UserRatedMovies } from '@/GraphQL/Movie.js'

import BaseModalContent from '@/components/BaseModalContent.vue'
import BaseGrid from '@/components/BaseGrid.vue'
import BaseMovieDetailCard from '@/components/BaseMovieDetailCard.vue'

export default {
  name: 'FavoritesIndex',
  components: {
    BaseModalContent,
    BaseGrid,
    BaseMovieDetailCard,
  },
  mixins: [movieRateMixin],
  apollo: {
    movies: {
      query: UserRatedMovies,
      loadingKey: 'isLoading',
      fetchPolicy: 'cache-and-network',
      skip() {
        return !this.userLoggedIn.userId
      },
      variables() {
        return {
          userId: this.userLoggedIn.userId,
          first: 20,
        }
      }
    }
  },
  data() {
    return {
      movies: new Array(30).fill({}),
      isLoading: 0,
      showMovieDetailModal: false,
      selectedMovie: {},
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
