<template>
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
          height="450"
          width="300"
          type="image"
        />
          
        <v-img
          v-else
          height="450"
          width="300"
          :src="movie.poster"
          class="ma-4 card-image"
          @click="() => $emit('click:card', movie)"
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
    </v-slide-item>
  </v-slide-group>
</template>

<script>
export default {
  name: 'BaseMovieCardList',
  props: {
    movies: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      model: null,
    }
  }
}
</script>
