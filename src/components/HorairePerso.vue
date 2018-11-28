<template>
  <div>
    <h4>Formulaire de changement d'horaires</h4>
    <h2>{{msg}}</h2>
    <form>
      <label for="name">Nom:</label>
      <div>
        <select class="form-control" v-model="name">
          <option v-for="temps in users" :key="temps.id" v-bind:value="temps.value">
            {{ temps.name }}
          </option>
        </select>
      </div>
      <label for="debut_taf_temps">Date debut::</label>
      <input class="form-control" v-model="debut_taf_temps" >
      <label for="fin_taf_temps">Date fin:</label>
      <input class="form-control" v-model="fin_taf_temps">
    </form>
    <b-button variant="danger" @click="back">Back</b-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      debut_taf_temps: '',
      fin_taf_temps: '',
      msg: '',
      selected: '',
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
    this.$http.get('http://localhost:3000/HorairePerso')
      .then(function (response) {
        vm.users = response.data
      })
  }
}
</script>
