<template>
  <v-container class="my-10">
    <v-card class="pa-8">
      <BaseMovieDetail :movie="movie" :is-loading="!!isLoading" />
    </v-card>
  </v-container>
</template>

<script>
import BaseMovieDetail from '@/components/BaseMovieDetail.vue';

import { GetMovieDetails } from '@/GraphQL/Movie.js'

export default {
  name: 'MoviesDetail',
  components: {
    BaseMovieDetail,
  },
  props: {
    movieId: {
      type: String,
      required: true,
    }
  },
  apollo: {
    movie: {
      query: GetMovieDetails,
      loadingKey: 'isLoading',
      update: ({ movie }) => movie.at(0),
      skip() {
        return !this.movieId;
      },
      variables() {
        return {
          filter: {
            movieId: this.movieId,
          },
        }
      }
    }
  },
  data() {
    return {
      movie: {},
      isLoading: 0
    }
  }
}
</script>