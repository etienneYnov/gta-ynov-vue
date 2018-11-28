<template>
  <div class="hello">
    <h1>Page des admin</h1>
    <h2>{{msg}}</h2>
    <b-button @click="logout">Deconnexion</b-button>
    <b-button @click="goRegisterPage">Ajouter un salarié</b-button>
    <b-button @click="goToAgendas">Liste des horaires</b-button>
    <b-button @click="changePlanning">Saisie horaires</b-button>
    <b-button @click="goListUsers">Liste des salariés</b-button>
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
    goListUsers () {
      this.$router.push({ path: 'allUsers' })
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
    goToAgendas () {
      this.$router.push({ name: 'allTimes' })
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
