<template>
  <v-container fill-height fluid class="d-flex align-center justify-center mb-6">
    <v-avatar size="300" class="mx-6">
      <img
        alt="user"
        src="https://avatars.githubusercontent.com/u/48383095?v=4"
      >
    </v-avatar>

    <v-card ref="form" width="700" class="mx-6">
      <v-card-title class="text-h5">
        Suas informações
      </v-card-title>

      <v-card-text class="mt-5">
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
          label="Sua nova senha"
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
          label="Confirme sua nova senha"
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
          text
          class="mx-2"
          @click="back"
        >
          Voltar
        </v-btn>
        <v-btn
          color="primary"
          text
          :loading="isLoading"
          @click="updateAccount"
        >
          Atualizar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'pinia'

import { useUserStore } from '@/stores'
import { UpdateUser } from '@/GraphQL/User.js'

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
  computed: {
    ...mapState(useUserStore, ['userLoggedIn']),
  },
  mounted() {
    this.form.name = this.userLoggedIn.name;
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    async updateAccount() {
      if (!this.$refs.name.valid) {
        this.$refs.name.validate();
        return
      }
      
      try {
        this.isLoading = true

        const { data } = await this.$apollo.mutate({
          mutation: UpdateUser,
          variables: {
            name: this.form.name,
            userId: this.userLoggedIn.userId,
          }
        })

        const userStore = useUserStore();
        userStore.setUserLoggedIn(data.user);
      } catch (e) {
        console.error(e)
      } finally {
        this.isLoading = false
      }
    },
  }
}
</script>
