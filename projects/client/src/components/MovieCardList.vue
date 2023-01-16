<template>
  <span>
    <v-slide-group
      v-model="model"
      class="mx-auto"
      width="100%"
    >
      <v-slide-item
        v-for="(movie, n) in userLoggedIn.recommendedMovies"
        :key="n"
      >
        <div>
          <v-img
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
import { mapState } from 'pinia'

import { useUserStore } from '@/stores'

export default {
  name: 'MovieCardList',
  data: () => ({
    model: null,
  }),
  computed: {
    ...mapState(useUserStore, ['userLoggedIn']),
  },
}
</script>

<style scoped>
.card-image {
  filter: brightness(50%);
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