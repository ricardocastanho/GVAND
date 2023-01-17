<template>
  <v-row cols="12">
    <v-col lg="3" md="5">
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
    </v-col>
    
    <v-col lg="9" md="7">
      <v-skeleton-loader
        v-if="isLoading"
        width="300"
        type="text"
      />

      <v-card-title v-else class="text-lg-h3 text-h5">
        {{ movie.title }}
        <span class="text-caption ml-2">
          ({{ movie.year }})
        </span>
      </v-card-title>

      <v-skeleton-loader
        v-if="isLoading"
        width="200"
        type="text"
      />

      <v-card-text v-else style="padding: 0px 16px;" class="text-body-1">
        Avaliação dos usuários:
      </v-card-text>

      <v-skeleton-loader
        v-if="isLoading"
        width="150"
        type="text"
      />

      <v-rating
        v-else
        empty-icon="mdi-star-outline"
        full-icon="mdi-star"
        half-icon="mdi-star-half-full"
        hover
        readonly
        color="yellow lighten-1"
        background-color="gray"
        length="5"
        size="20"
        :value="movie.imdbRating / 2"
        class="pl-2"
      />

      <v-skeleton-loader
        v-if="isLoading"
        width="600"
        type="text, text, text, text, text, text"
      />

      <v-card-text v-else class="text-body-1">
        <span class="font-weight-bold">
          Sinopse:
        </span>
        {{ movie.plot }}
      </v-card-text>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'BaseMovieDetail',
  props: {
    movie: {
      type: Object,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    }
  }
}
</script>
