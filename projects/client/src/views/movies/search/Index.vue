<template>
  <v-container class="my-10" >
    <div class="px-16">
      <v-text-field
        v-model="search"
        label="Pequisar"
        placeholder="Interestellar"
        filled
        rounded
        :loading="!!isLoading"
        class="px-16"
      >
        <template #progress>
          <v-progress-linear
            absolute
            rounded
            bottom
            indeterminate
            height="1"
            color="primary"
            class="progress-linear"
          />
        </template>
      </v-text-field>
    </div>

    <v-row width="100%">
      <v-col align="center">
        <v-card v-if="showGrid" width="80%" class="mt-10 py-5">
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
import { MovieSearch } from '@/GraphQL/Movie.js'

import BaseModalContent from '@/components/BaseModalContent.vue'
import BaseGrid from '@/components/BaseGrid.vue'
import BaseMovieDetailCard from '@/components/BaseMovieDetailCard.vue'

export default {
  name: 'SearchIndex',
  components: {
    BaseModalContent,
    BaseGrid,
    BaseMovieDetailCard,
  },
  mixins: [movieRateMixin],
  apollo: {
    movies: {
      query: MovieSearch,
      loadingKey: 'isLoading',
      debounce: 500,
      skip() {
        return !this.search || !this.userLoggedIn.userId
      },
      variables() {
        return {
          userId: this.userLoggedIn.userId,
          search: this.search,
          first: 20,
        }
      }
    }
  },
  data() {
    return {
      search: '',
      movies: new Array(20).fill({}),
      isLoading: 0,
      isSearching: false,
      showMovieDetailModal: false,
      selectedMovie: {},
    }
  },
  computed: {
    ...mapState(useUserStore, ['userLoggedIn']),
    showGrid() {
      return this.isSearching && this.movies.length > 0;
    }
  },
  watch: {
    search() {
      this.isSearching = true;
    }
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

<style scoped>
.progress-linear {
  left: 50%;
  margin-left: -48%;
  width: 96%;
}
</style>
