<template>
<div>
  <h2>Liste des horaires:</h2>
  <ul>
    <li v-for="agenda in agendas" :key="agenda.id_temps">
      <span>
         Nom: {{ agenda.name }}
      </span>
      <span>
        Horaires du:
      </span>
      <span>
        {{ agenda.debut_taf_temps }}
      </span>
      <span>
        Debut: {{ agenda.H_start_temps }} Heures {{ agenda.M_start_temps }} Minutes
      </span>
      <span>
        Fin: {{ agenda.H_end_temps }} Heures {{ agenda.M_end_temps }} Minutes
      </span>
    </li>
  </ul>
<button @click="back">Back</button>
</div>
</template>

<script>

export default {
  data () {
    return {
      agendas: []
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
  created: function () {
    var vm = this
    this.$http.get('http://localhost:3000/allTimes')
      .then(function (response) {
        vm.agendas = response.data
      })
  }
}
</script>
