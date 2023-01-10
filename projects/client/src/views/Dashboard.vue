<template>
  <v-container>
    <div class="text-h4">{{ greet }}</div>
  </v-container>
</template>

<script>
import { greetUser } from '@/support'

export default {
  name: 'DashboardPage',
  computed: {
    greet() {
      return greetUser('Ricardo')
    }
  }
}
</script>
