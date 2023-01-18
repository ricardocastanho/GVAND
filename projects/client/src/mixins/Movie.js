import { MergeUserRate } from '@/GraphQL/Movie.js'

export const movieRateMixin = {
  methods: {
    $_movieRateMixin_mergeMovieRating({ movieId, userId, rating }) {
      this.$apollo.mutate({
        mutation: MergeUserRate,
        variables: {
          to: { movieId },
          data: {
            rating,
            timestamp: 1
          },
          from: { userId }
        }
      })
    }
  }
}
