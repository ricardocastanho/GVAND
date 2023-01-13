<template>
  <v-carousel
    cycle
    height="600"
    dark
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(movie, i) in movies"
      :key="i"
    >
      <v-img
        height="100%"
        width="100%"
        :src="movie.banner"
        class="carousel-image"
      />
      <v-card-title class="carousel-title text-h2 font-weight-medium">
        {{ movie.title }}
      </v-card-title>
      <v-card-text class="carousel-subtitle text-h6 text-subtitle-1 d-inline-block text-truncate">
        {{ movie.plot }}
      </v-card-text>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import { movies } from '@/mock.json'

export default {
  name: 'MovieCarousel',
  data () {
    return {
      movies
    }
  },
}
</script>

<style scoped>
.carousel-image {
  filter: brightness(50%);
}

.carousel-title {
  position: absolute;
  bottom: 70px;
  left: 16px;
}

.carousel-subtitle {
  position: absolute;
  bottom: 30px;
  left: 16px;
  max-height: 80px;
  max-width: 50%;
}
</style>
