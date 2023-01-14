<template>
  <v-slide-group
    v-model="model"
    class="mx-auto"
    width="100%"
  >
    <v-slide-item
      v-for="(movie, n) in userLoggedIn.recommendedMovies"
      :key="n"
      v-slot="{ active, toggle }"
    >
      <div>
        <v-img
          height="200"
          width="300"
          :src="movie.poster"
          class="ma-4 card-image"
          @click="toggle"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <v-scale-transition>
              <v-card-title v-if="active" class="card-title">
                {{ movie.title }}
              </v-card-title>
            </v-scale-transition>
          </v-row>
        </v-img>
      </div>
    </v-slide-item>
  </v-slide-group>
</template>

<script>
import { mapState } from 'pinia'

import { useUserStore } from '@/stores'

export default {
  name: 'MovieCardList',
  data: () => ({
    model: null
  }),
  computed: {
    ...mapState(useUserStore, ['userLoggedIn']),
  },
}
</script>

<style scoped>
.brightness {
  filter: brightness(50%);
}

.card-title {
  position: absolute;
  bottom: 0px;
  left: 0px;
}

.card-image:hover {
  cursor: pointer;
}
</style>