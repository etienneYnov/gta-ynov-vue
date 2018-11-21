<template>
  <div class="hello">
    <h1>Page des admin</h1>
    <h2>{{msg}}</h2>
    <button @click="logout">Deconnexion</button>
    <button @click="goRegisterPage">Ajouter un salarié</button>
    <button @click="goToRequests">Voir les demandes</button>
    <button @click="changePlanning">Changement horaires</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Pour les administrateurs'
    }
  },
  methods: {
    goLoginPage () {
      this.$router.push({ path: 'login' })
    },
    goRegisterPage () {
      this.$router.push({ name: 'register' })
    },
    logout (to, from, next) {
      console.log('Je veux me deconnecter bordel !!!!!')
      if (localStorage.getItem('jwt') == null) {
        next({
          path: '/login',
          params: { nextUrl: to.fullPath }
        })
      } else {
        let user = JSON.parse(localStorage.getItem('user'))
        localStorage.removeItem('jwt')
        user.authenticated = false
        this.$router.push({ path: 'login' })
      }
    },
    goToRequests () {
      this.$router.push({ name: 'DemandesHoraire' })
    },
    changePlanning () {
      this.$router.push({ name: 'saisieHoraire' })
    }
  }
}
</script>
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
