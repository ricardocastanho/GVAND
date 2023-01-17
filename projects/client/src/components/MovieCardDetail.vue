<template>
  <v-card class="pa-8">
    <v-row no-gutters cols="12">
      <v-col md="5">
        <v-img
          height="400"
          width="250"
          :src="movie.poster"
          class="ma-4 card-image"
        />
      </v-col>
      <v-col md="7">
        <v-card-title class="text-h5">
          {{ movie.title }}
          <span class="text-caption ml-2">
            ({{ movie.year }})
          </span>
        </v-card-title>

        <v-card-text style="padding: 0px 16px;">
          Avaliação dos usuários:
        </v-card-text>
        
        <v-rating
          empty-icon="mdi-star-outline"
          full-icon="mdi-star"
          half-icon="mdi-star-half-full"
          hover
          readonly
          color="yellow lighten-1"
          background-color="gray"
          length="5"
          size="15"
          :value="movie.imdbRating / 2"
          class="pl-2"
        />

        <v-card-text>
          <span class="font-weight-bold">
            Sinopse:
          </span>
          {{ movie.plot }}
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'MovieCardDetail',
  props: {
    movie: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style scoped lang="scss">
$rating-padding: 0.4rem;
</style>
