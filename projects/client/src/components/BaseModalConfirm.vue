<template>
  <BaseModal ref="baseModal" max-width="400">
    <template #button="{ on, attrs }">
      <v-btn
        v-bind="{ ...attrs, ...$attrs }"
        v-on="on"
      >
        {{ buttonText }}
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5">
        {{ title }}
      </v-card-title>

      <v-card-text>
        {{ question }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text @click="closeModal">
          {{ cancelButtonText }}
        </v-btn>

        <v-btn text @click="$emit('confirm')">
          {{ confirmButtonText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </BaseModal>
</template>

<script>
import BaseModal from './BaseModal.vue'

export default {
  name: 'BaseModalConfirm',
  components: {
    BaseModal
  },
  props: {
    title: {
      type: String,
      default: 'Título'
    },
    question: {
      type: String,
      default: 'Tem certeza?'
    },
    confirmButtonText: {
      type: String,
      default: 'Confirmar'
    },
    cancelButtonText: {
      type: String,
      default: 'Cancelar'
    },
    buttonText: {
      type: String,
      default: 'Confirmar'
    },
  },
  methods: {
    closeModal() {
      const dialog = this.$refs.baseModal.$children.at(0);
      dialog.onClickOutside();
    }
  },
}
</script>
