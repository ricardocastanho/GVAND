<template>
  <BaseMovieCardList
    v-bind="$attrs"
    :movies="movies"
    :is-loading="!!isLoading"
    v-on="$listeners"
  />
</template>

<script>
import BaseMovieCardList from '@/components/BaseMovieCardList.vue'

import { GetMovies } from '@/GraphQL/Movie.js'

export default {
  name: 'MovieCardListByGenre',
  components: {
    BaseMovieCardList,
  },
  props: {
    genre: {
      type: Object,
      required: true
    }
  },
  apollo: {
    movies: {
      query: GetMovies,
      loadingKey: 'isLoading',
      skip () {
        return !this.genre.name;
      },
      variables() {
        return {
          first: 10,
          filter: {
            in_genre: {
              name: this.genre.name,
            }
          },
        }
      }
    }
  },
  data: () => ({
    movies: new Array(10).fill({}),
    isLoading: 0
  }),
}
</script>
