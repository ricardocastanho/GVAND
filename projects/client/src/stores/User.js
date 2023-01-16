import { defineStore } from 'pinia'

export const useUserStore = defineStore('User', {
  state: () => {
    const userData = localStorage.getItem("user");
    const userLoggedIn = JSON.parse(userData);
    
    return {
      /** @type {{ name: string, userId: string }} */
      userLoggedIn,
    }
  },
  actions: {
    setUserLoggedIn(user) {
      this.userLoggedIn = user

      const userData = JSON.stringify(user);
      localStorage.setItem("user", userData);
    },
  },
})
