<template>
  <div class="hello">
    <h1>Page utilisateur</h1>
    <h2>{{msg}}</h2>
    <b-button @click="logout">Deconnexion</b-button>
    <b-button @click="goFormTime">Demande de changement d'horaires</b-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Page des utilisateurs'
    }
  },
  methods: {
    goLoginPage () {
      this.$router.push({ path: 'login' })
    },
    logout (to, from, next) {
      console.log('Je veux me deconnecter bordel !!!!!')
      if (localStorage.getItem('jwt') == null) {
        this.$router.push({ path: 'login' })
      } else {
        let user = JSON.parse(localStorage.getItem('user'))
        localStorage.removeItem('jwt')
        user.authenticated = false
        this.$router.push({ path: 'login' })
      }
    },
    goFormTime () {
      this.$router.push({ path: 'AgendaForm' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
