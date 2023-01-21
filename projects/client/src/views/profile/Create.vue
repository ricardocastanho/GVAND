<template>
  <v-container fill-height fluid>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="12"
        md="10"
        lg="6"
      >
        <v-card ref="form">
          <v-card-title class="text-h4">
            Criar conta
          </v-card-title>

          <v-card-text class="mt-10">
            <v-text-field
              ref="name"
              v-model="form.name"
              :rules="[() => !!form.name || 'O campo é obrigatório']"
              label="Seu nome"
              placeholder="John Doe"
              prepend-icon="mdi-account"
              required
            ></v-text-field>

            <v-text-field
              ref="password"
              v-model="form.password"
              :rules="[() => !!form.password || 'O campo é obrigatório']"
              label="Sua senha"
              placeholder="**********"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              required
            ></v-text-field>
            
            <v-text-field
              ref="password2"
              v-model="form.password2"
              :rules="[
                () => !!form.password2 || 'O campo é obrigatório',
                () => form.password === form.password2 || 'As senhas não batem'
              ]"
              label="Confirme sua senha"
              placeholder="**********"
              prepend-icon="mdi-lock"
              :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword2 ? 'text' : 'password'"
              @click:append="showPassword2 = !showPassword2"
              required
            ></v-text-field>

            <MovieSelect
              :favorites.sync="form.movies"
              :movies="movies"
              :search-input.sync="search"
              :disabled="!!isLoadingSearch"
              :loading="!!isLoadingSearch"
              prepend-icon="mdi-movie"
              item-value="movieId"
              item-text="title"
              label="Selecione seus filmes favoritos:"
              multiple
              return-object
              :rules="[() => !!form.movies.length || 'O campo é obrigatório']"
            />
          </v-card-text>

          <v-divider class="mt-6"></v-divider>
          
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              :loading="!!isLoading"
              @click="createProfile"
            >
              Criar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { CreateUser } from '@/GraphQL/User.js'
import { MovieSearchSelect } from '@/GraphQL/Movie.js'
import { movieRateMixin } from '@/mixins/Movie.js'
import { useUserStore } from '@/stores'

import MovieSelect from '@/components/MovieSelect.vue'

export default {
  name: 'LoginPage',
  components: {
    MovieSelect,
  },
  mixins: [movieRateMixin],
  apollo: {
    movies: {
      query: MovieSearchSelect,
      debounce: 500,
      loadingKey: 'isLoadingSearch',
      variables() {
        return {
          search: this.search || 'A',
          first: 20,
        }
      }
    }
  },
  data () {
    return {
      form: {
        name: '',
        password: '',
        password2: '',
        movies: []
      },
      movies: [],
      showPassword: false,
      showPassword2: false,
      isLoading: 0,
      isLoadingSearch: 0,
      search: ''
    }
  },
  methods: {
    async createProfile() {
      if (!this.$refs.name.valid || !this.$refs.password.valid || !this.$refs.password2.valid) {
        this.$refs.name.validate();
        this.$refs.password.validate();
        this.$refs.password2.validate();
        return
      }
      
      try {
        this.isLoading = 1

        const { data } = await this.$apollo.mutate({
          mutation: CreateUser,
          variables: {
            name: this.form.name,
            userId: self.crypto.randomUUID(),
          }
        })

        const { movies } = this.form;

        const promises = movies.map(movie => {
          return this.$_movieRateMixin_mergeMovieRating({
            movieId: movie.movieId,
            userId: data.user.userId,
            rating: 5,
          });
        });

        await Promise.all(promises);

        const userStore = useUserStore();
        userStore.setUserLoggedIn(data.user);
        
        this.$router.push({ name: 'MoviesIndex' });
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = 0;
      }
    },
  }
}
</script>
