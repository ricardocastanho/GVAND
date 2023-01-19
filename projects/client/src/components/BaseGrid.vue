<template>
  <v-row no-gutters>
    <template v-for="(item, n) in items">
      <v-col :key="n" align="center">
        <slot :item="item" />
      </v-col>

      <v-responsive
        v-if="((n + 1) %	cols) === 0"
        :key="`width-${n}`"
        width="100%"
      ></v-responsive>
    </template>
  </v-row>
</template>

<script>
export default {
  name: 'BaseGrid',
  props: {
    items: {
      type: Array,
      required: true,
    },
    cols: {
      type: Number,
      default: 4,
    }
  }
}
</script>