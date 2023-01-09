<template>
  <component :is="layouts[layout]">
    <router-view />
  </component>
</template>

<script>
import BaseLayout from './layouts/BaseLayout.vue'
import BlankLayout from './layouts/BlankLayout.vue'

export default {
  name: 'App',
  components: {
    BaseLayout,
    BlankLayout
  },
  data () {
    return {
      layouts: {
        BaseLayout,
        BlankLayout,
      },
    }
  },
  computed: {
    layout () {
      return this.$route.meta.layout || 'BaseLayout'
    }
  },
}
</script>
