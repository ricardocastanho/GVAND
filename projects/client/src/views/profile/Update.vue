<template>
  <v-container fill-height fluid class="d-flex align-center justify-center mb-6">
    <v-avatar size="300" class="mx-6">
      <v-img
        alt="user"
        src="/img/user-placeholder.png"
      >
        <template v-slot:placeholder>
          <v-skeleton-loader
            height="450"
            width="300"
            type="image"
          />
        </template>
      </v-img>
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

      <div class="mt-6 px-3">
        <v-alert outlined type="error" class="align-center">
          <v-row align="center">
            <v-col class="grow">
              <strong>Deletar</strong> sua conta <strong>permanentemente</strong>
            </v-col>

            <v-col class="shrink" style="padding: 0px !important">
              <BaseModalConfirm 
                button-text="Deletar"
                title="Excluir conta"
                question="Tem certeza que você deseja excluir a sua conta permanentemente?"
                confirmButtonText="Deletar"
                cancelButtonText="Cancelar"
                text
                dense
                color="error"
                @confirm="deleteProfile"
              />
            </v-col>
          </v-row>
        </v-alert>
      </div>

      <v-divider class="mt-6"></v-divider>
      
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          :loading="!!isLoading"
          @click="updateProfile"
        >
          Atualizar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'pinia'

import BaseModalConfirm from '@/components/BaseModalConfirm.vue'
import { useUserStore } from '@/stores'
import { UpdateUser, DeleteUser } from '@/GraphQL/User.js'

export default {
  name: 'LoginPage',
  components: {
    BaseModalConfirm,
  },
  data () {
    return {
      form: {
        name: '',
        password: '',
        password2: '',
      },
      showPassword: false,
      showPassword2: false,
      isLoading: 0,
      confirmDeleteDialog: false,
    }
  },
  computed: {
    ...mapState(useUserStore, ['userLoggedIn']),
  },
  mounted() {
    this.form.name = this.userLoggedIn.name;
  },
  methods: {
    async updateProfile() {
      if (!this.$refs.name.valid) {
        this.$refs.name.validate();
        return
      }
      
      try {
        this.isLoading = 1

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
        this.isLoading = 0
      }
    },
    async deleteProfile() {
      try {
        this.isLoading = 1

        await this.$apollo.mutate({
          mutation: DeleteUser,
          variables: {
            userId: this.userLoggedIn.userId,
          }
        })

        const userStore = useUserStore();
        userStore.setUserLoggedIn(null);
        
        this.$router.push({ name: 'Login' })
      } catch (e) {
        console.error(e)
      } finally {
        this.isLoading = 0
      }
    },
  }
}
</script>
