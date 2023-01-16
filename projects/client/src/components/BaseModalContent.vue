<template>
  <BaseModal
    v-bind="$attrs"
    ref="baseModal"
    v-on="$listeners"
  >
    <slot />

    <slot name="card-actions" />
  </BaseModal>
</template>

<script>
import BaseModal from './BaseModal.vue'

export default {
  name: 'BaseModalContent',
  components: {
    BaseModal
  },
  props: {
    title: {
      type: String,
      default: 'Título'
    },
  },
}
</script>
