<template>
  <v-navigation-drawer
    absolute
    permanent
    expand-on-hover
  >
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://avatars.githubusercontent.com/u/48383095?v=4"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Ricardo Castanho
          </v-list-item-title>
          <v-list-item-subtitle>
            Editar seu perfil
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list
      nav
      dense
    >
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-movie</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Filmes</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-star</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Minhas avaliações</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'TheSidebar',
}
</script>