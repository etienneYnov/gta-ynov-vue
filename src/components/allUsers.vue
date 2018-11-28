<template>
<div>
  <h2>Liste des utilisateurs:</h2>
  <a v-on:click="goPageHorairePerso ()">
    <b-card class="text-center" v-for="user in users" :key="user.id">
      {{ user.name }}
    </b-card>
  </a>

<b-button variant="danger" @click="back">Back</b-button>
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
