<template>
  <v-container>
    <v-data-table
      :items="movies"
      :headers="headers"
    />
  </v-container>
</template>

<script>
import { GetMovies } from '../GraphQL/Movie.js'

export default {
  name: 'HomePage',
  apollo: {
    movies: {
      query: GetMovies,
    }
  },
  data () {
    return {
      movies: [],
      headers: [
        { text: 'Title', value: 'title' },
      ]
    }
  }
}
</script>
