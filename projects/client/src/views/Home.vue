<template>
  <v-container>
    <div class="text-h4">{{ greet }}</div>
  </v-container>
</template>

<script>
import { mapState } from 'pinia'

import { greetUser } from '@/helpers'
import { useUserStore } from '@/stores'

export default {
  name: 'HomePage',
  computed: {
    ...mapState(useUserStore, ['userLoggedIn']),
    greet() {
      return greetUser(this.userLoggedIn.name)
    }
  }
}
</script>
