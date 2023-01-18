<template>
  <v-container class="my-10">
    <v-card class="pa-8">
      <BaseMovieDetail
        :movie="movie"
        :is-loading="!!isLoading"
        @set-movie-rating="$_movieRateMixin_mergeMovieRating"
      />
    </v-card>

    <v-card class="pa-8 mt-5">
      <v-card-title class="text-h5">
        <v-skeleton-loader
          v-if="isLoading"
          width="200px"
          type="text"
        />

        <span v-else>
          Os usuários que gostaram deste filme também curtiram:
        </span>
      </v-card-title>

      <BaseMovieCardList
        :movies="movie.similar"
        :is-loading="!!isLoading"
        @click:card="openMovieDetails"
      />
    </v-card>

    <BaseModalContent
      v-model="showMovieDetailModal"
      height="auto"
      max-width="1200"
    >
      <BaseMovieDetailCard
        :movie="selectedMovie"
        @click:movie-details="goToMovieDetails"
        @set-movie-rating="$_movieRateMixin_mergeMovieRating"
      />
    </BaseModalContent>
  </v-container>
</template>

<script>
import { mapState } from 'pinia'

import { useUserStore } from '@/stores'
import { movieRateMixin } from '@/mixins/Movie.js'
import { GetMovieDetails } from '@/GraphQL/Movie.js'

import BaseModalContent from '@/components/BaseModalContent.vue'
import BaseMovieDetail from '@/components/BaseMovieDetail.vue';
import BaseMovieDetailCard from '@/components/BaseMovieDetailCard.vue'
import BaseMovieCardList from '@/components/BaseMovieCardList.vue'

export default {
  name: 'MoviesDetail',
  components: {
    BaseModalContent,
    BaseMovieDetail,
    BaseMovieDetailCard,
    BaseMovieCardList,
  },
  mixins: [movieRateMixin],
  props: {
    movieId: {
      type: String,
      required: true,
    }
  },
  apollo: {
    movie: {
      query: GetMovieDetails,
      loadingKey: 'isLoading',
      update: ({ movie }) => movie.at(0),
      skip() {
        return !this.movieId || !this.userLoggedIn.userId;
      },
      variables() {
        return {
          filter: {
            movieId: this.movieId,
          },
          userId: this.userLoggedIn.userId
        }
      }
    }
  },
  data() {
    return {
      movie: {
        similar: new Array(15).fill({})
      },
      showMovieDetailModal: false,
      selectedMovie: null,
      isLoading: 0,
    }
  },
  computed: {
    ...mapState(useUserStore, ['userLoggedIn']),
  },
  methods: {
    openMovieDetails(movie) {
      this.selectedMovie = { ...movie };
      this.showMovieDetailModal = true;
    },
    goToMovieDetails(movie) {
      this.showMovieDetailModal = false;

      this.$router.push({
        name: 'MoviesDetail',
        params: {
          movieId: movie.movieId,
        }
      });
    },
    p () {
      console.log('object');
    }
  }
}   
</script>