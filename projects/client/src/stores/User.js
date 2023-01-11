import { defineStore } from 'pinia'

export const useUserStore = defineStore('User', {
  state: () => ({
    /** @type {{ name: string }} */
    userLoggedIn: null,
  }),
  actions: {
    setUserLoggedIn(user) {
      this.userLoggedIn = user
    },
  },
})
