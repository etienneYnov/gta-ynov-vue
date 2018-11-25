<template>
<div id="app">
  <h2>Liste des utilisateurs:</h2>
  <ul>
    <li v-for="user in users" :key="user.id">{{ user.name }}</li>
  </ul>
</div>
</template>

<script>

export default {
  data () {
    return {
      users: []
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
  created: function () {
    var vm = this
    this.$http.get('http://localhost:3000/allUsers')
      .then(function (response) {
        vm.users = response.data
        console.log(response.data)
      })
  }
}
</script>
