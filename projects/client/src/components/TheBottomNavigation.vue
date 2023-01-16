<template>
  <v-bottom-navigation
    :value="value"
    color="primary"
    app
    grow
    shift
  >
    <v-btn @click="goToHome">
      <span>Filmes</span>

      <v-icon>mdi-movie</v-icon>
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
      goToHome() {
        this.$router.push({ name: 'Home' });
      },
      goToFavorites() {
        this.$router.push({ name: 'Favorites' });
      },
      goToProfile() {
        this.$router.push({ name: 'UpdateAccount' });
      },
    },
  }
</script>
