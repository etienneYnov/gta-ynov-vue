<template>
<div>
  <h2>Liste des utilisateurs:</h2>
  <ul>
    <a v-on:click="goPageHorairePerso ()">
      <li v-for="user in users" :key="user.id">
        <b-card class="text-center">
          {{ user.name }}
        </b-card>
      </li>
    </a>
  </ul>
<button @click="back">Back</button>
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
    },
    goPageHorairePerso () {
      this.$router.push({ name: 'HorairePerso' })
    }
  },
  created: function () {
    var vm = this
    this.$http.get('http://localhost:3000/allUsers')
      .then(function (response) {
        vm.users = response.data
      })
  }
}
</script>
