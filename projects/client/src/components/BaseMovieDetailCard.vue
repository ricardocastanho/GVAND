<template>
  <v-card class="pa-8">
    <BaseMovieDetail :movie="movie" v-on="$listeners" />

    <v-card-actions>
      <v-spacer />

      <v-btn
        color="primary"
        text
        @click="() => $emit('click:movie-details', movie)"
      >
        Ver Mais
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import BaseMovieDetail from '@/components/BaseMovieDetail.vue'

export default {
  name: 'BaseMovieCardDetail',
  components: {
    BaseMovieDetail,
  },
  props: {
    movie: {
      type: Object,
      required: true,
    }
  }
}
</script>
