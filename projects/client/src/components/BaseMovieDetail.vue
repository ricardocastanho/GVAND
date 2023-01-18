<template>
  <v-row cols="12">
    <v-col lg="3" md="5">
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

      <div class="d-flex flex-row mb-6">
        <div class="mx-2">
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

          <div v-else>
            <v-rating
              empty-icon="mdi-star-outline"
              full-icon="mdi-star"
              half-icon="mdi-star-half-full"
              hover
              readonly
              color="yellow lighten-1"
              background-color="gray"
              length="5"
              size="20"
              :value="avgRate"
              class="pl-2"
            />
            
            <v-card-text class="text-subtitle-1 text-center font-weight-bold" style="padding: 0px 16px;">
              {{ avgRate }}
            </v-card-text>
          </div>
        </div>

        <div class="mx-2">
          <v-skeleton-loader
            v-if="isLoading"
            width="200"
            type="text"
          />
    
          <v-card-text v-else style="padding: 0px 16px;" class="text-body-1">
            Sua avaliação:
          </v-card-text>

          <v-skeleton-loader
            v-if="isLoading"
            width="150"
            type="text"
          />

          <div v-else>
            <v-rating
              v-model="userRate"
              empty-icon="mdi-star-outline"
              full-icon="mdi-star"
              half-icon="mdi-star-half-full"
              hover
              color="primary lighten-1"
              background-color="gray"
              length="5"
              size="20"
              class="pl-2"
            />
            
            <v-card-text class="text-subtitle-1 text-center font-weight-bold" style="padding: 0px 16px;">
              {{ userRate }}
            </v-card-text>
          </div>
        </div>
      </div>

      <v-skeleton-loader
        v-if="isLoading"
        width="90%"
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
import { mapState } from 'pinia'

import { useUserStore } from '@/stores'

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
  },
  data() {
    return {
      rating: null,
    }
  },
  computed: {
    ...mapState(useUserStore, ['userLoggedIn']),
    avgRate() {
      return Number(this.movie.avgRate.toFixed(1));
    },
    userRate: {
      get() {
        return this.rating || this.movie.user_rated;
      },
      set(rating) {
        this.rating = rating;
        this.$emit('set-movie-rating', {
          rating,
          movieId: this.movie.movieId,
          userId: this.userLoggedIn.userId,
        });
      }
    }
  },
  watch: {
    movie() {
      this.rating = null;
    }
  },
}
</script>
