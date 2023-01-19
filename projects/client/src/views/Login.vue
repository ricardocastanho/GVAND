<template>
  <v-container fill-height fluid>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="10"
        md="6"
        lg="4"
      >
        <v-card ref="form">
          <v-card-title class="text-h4">
            Entrar
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
          </v-card-text>

          <v-card-text>
            Ainda não possui uma conta?
            <span class="text-decoration-underline" @click="createProfile" style="cursor: pointer;">
              Clique aqui para criar!
            </span>
          </v-card-text>

          <v-divider class="mt-6"></v-divider>
          
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              :loading="!!isLoading"
              @click="signIn"
            >
              Entrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useUserStore } from '@/stores'
import { SignUserIn } from '@/GraphQL/User'

export default {
  name: 'LoginPage',
  data () {
    return {
      form: {
        name: '',
        password: '',
      },
      showPassword: false,
      isLoading: 0,
    }
  },
  methods: {
    async signIn() {
      if (!this.$refs.name.valid || !this.$refs.password.valid) {
        this.$refs.name.validate();
        this.$refs.password.validate();
        return
      }

      this.isLoading = 1

      try {
        const { data } = await this.$apollo.query({
          query: SignUserIn,
          variables: {
            name: this.form.name,
          }
        })

        const [user] = data.user;

        if (!user) {
          console.warn('User not find');
          return
        }

        const userStore = useUserStore();
        userStore.setUserLoggedIn(user);

        this.$router.push({ name: 'MoviesIndex' });
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = 0
      }
    },
    createProfile() {
      this.$router.push({ name: 'ProfileCreate' });
    }
  }
}
</script>
