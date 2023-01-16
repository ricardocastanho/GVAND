<template>
  <v-dialog v-bind="$attrs" v-on="$listeners">
    <template #activator="{ on, attrs }">
      <slot name="button" v-bind="{ on, attrs }" />
    </template>

    <slot />
  </v-dialog>
</template>

<script>
export default {
  name: 'BaseModal'
}
</script>
