<template>
  <span>
    <v-slide-group
      v-model="model"
      class="mx-auto"
      width="100%"
    >
      <v-slide-item
        v-for="(movie, n) in movies"
        :key="n"
      >
        <div class="ma-4">
          <v-skeleton-loader
            v-if="isLoading"
            height="400"
            width="300"
            type="image"
          />
            
          <v-img
            v-else
            height="400"
            width="300"
            :src="movie.poster"
            class="ma-4 card-image"
            @click="() => $emit('click:card', movie)"
          />
        </div>
      </v-slide-item>
    </v-slide-group>
  </span>
</template>

<script>
import { GetMovies } from '@/GraphQL/Movie.js'

export default {
  name: 'MovieCardList',
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
        return !this.genre;
      },
      variables() {
        return {
          first: 10,
          filter: {
            in_genre: {
              name: this.genre.name
            }
          },
        }
      }
    }
  },
  data: () => ({
    movies: new Array(10).fill({}),
    model: null,
    isLoading: 0
  }),
}
</script>

<style scoped>
.card-image {
  filter: brightness(80%);
}

.card-image:hover {
  cursor: pointer;
}

.card-title {
  position: absolute;
  bottom: 0px;
  left: 0px;
}
</style>
