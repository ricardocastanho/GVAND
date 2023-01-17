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
          </v-card-text>

          <v-divider class="mt-6"></v-divider>
          
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              :loading="isLoading"
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
import { useUserStore } from '@/stores'

export default {
  name: 'LoginPage',
  data () {
    return {
      form: {
        name: '',
        password: '',
        password2: '',
      },
      showPassword: false,
      showPassword2: false,
      isLoading: false,
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
        this.isLoading = true

        const { data } = await this.$apollo.mutate({
          mutation: CreateUser,
          variables: {
            name: this.form.name,
            userId: self.crypto.randomUUID(),
          }
        })

        const userStore = useUserStore();
        userStore.setUserLoggedIn(data.user);
        
        this.$router.push({ name: 'MoviesIndex' })
      } catch (e) {
        console.error(e)
      } finally {
        this.isLoading = false
      }
    },
  }
}
</script>
