<template>
  <v-autocomplete
    v-bind="$attrs"
    v-model="selectedMovies"
    :items="moviesList"
    chips
    v-on="$listeners"
  >
    <template v-slot:selection="data">
      <v-chip
        v-bind="data.attrs"
        :input-value="data.selected"
        close
        @click="data.select"
        @click:close="remove(data)"
      >
        <v-avatar rounded left>
          <v-img :src="data.item.poster" contain />
        </v-avatar>
        {{ data.item.title }}
      </v-chip>
    </template>
    <template v-slot:item="data">
      <template>
        <v-list-item-avatar rounded>
          <v-img :src="data.item.poster" contain />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-html="data.item.title"></v-list-item-title>
        </v-list-item-content>
      </template>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  name: 'MovieSelect',
  props: {
    movies: {
      type: Array,
      required: true,
    },
    favorites: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      selectedMovies: []
    }
  },
  computed: {
    moviesList() {
      return [
        ...this.favorites,
        ...this.movies,
      ]
    }
  },
  watch: {
    selectedMovies(movies) {
      this.$emit('update:favorites', movies)
    }
  },
  methods: {
    remove(data) {
      this.selectedMovies.splice(data.index, 1);
    }
  }
}
</script>
