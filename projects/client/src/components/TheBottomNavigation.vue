<template>
  <v-bottom-navigation
    :value="value"
    color="primary"
    app
    grow
    shift
  >
    <v-btn @click="goToMovies">
      <span>Filmes</span>

      <v-icon>mdi-movie</v-icon>
    </v-btn>

    <v-btn @click="goToSearch">
      <span>Pesquisar</span>

      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn @click="goToFavorites">
      <span>Favoritos</span>

      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn @click="goToProfile">
      <span>Perfil</span>

      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
  export default {
    name: 'TheBottomNavigation',
    data: () => ({ value: 0 }),
    methods: {
      goToMovies() {
        this.$router.push({ name: 'MoviesIndex' });
      },
      goToSearch() {
        this.$router.push({ name: 'SearchIndex' });
      },
      goToFavorites() {
        this.$router.push({ name: 'FavoritesIndex' });
      },
      goToProfile() {
        this.$router.push({ name: 'ProfileEdit' });
      },
    },
  }
</script>
