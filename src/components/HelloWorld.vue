<template>
  <div class="hello">
    <h1>Application</h1>
    <h2>{{msg}}</h2>
    <button @click="logout">logout</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Ynov-gta'
    }
  },
  methods: {
    goLoginPage () {
      this.$router.push({ path: 'login' })
    },
    navigate () {
      this.push({ name: 'login' })
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
