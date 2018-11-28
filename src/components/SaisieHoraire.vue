<template>
  <div>
    <h4>Formulaire de changement d'horaires</h4>
    <h2>{{msg}}</h2>
    <form>
      <label for="name"></label>
      <div>
        <label for="name">Choisir le nom</label>
        <select v-model="name">
          <option v-for="user in users" :key="user.id">
            {{ user.name }}
          </option>
        </select>
      </div>
      <div>
      <label for="debut_taf_temps">Date: </label>
        <input class="form-control" type="date" v-model="debut_taf_temps" id="debut_taf_temps">
      </div>
      <div>
      <label for="H_start_temps">Heure embauche:</label>
        <select class="form-control"  v-model="H_start_temps" id="H_start_temps">
          <option v-for="h in heures" :key="h">
            {{ h }}
          </option>
        </select>
        H
      </div>
      <div>
      <label for="M_start_temps">Minute embauche:</label>
        <select class="form-control" v-model="M_start_temps" id="M_start_temps">
          <option v-for="m in minutes" :key="m">
            {{ m }}
          </option>
        </select>
        Mn
      </div>
      <div>
      <label for="H_end_temps">Heure fin:</label>
        <select class="form-control"  v-model="H_end_temps" id="H_end_temps">
          <option v-for="h in heures" :key="h">
            {{ h }}
          </option>
        </select>
        H
      </div>
      <div>
      <label for="M_end_temps">Minute fin:</label>
        <select class="form-control"  v-model="M_end_temps" id="M_end_temps">
          <option v-for="m in minutes" :key="m">
            {{ m }}
          </option>
        </select>
        Mn
      </div>
      <div>
        <button type="submit" @click="handleSubmit">
          Enregistrer
        </button>
      </div>
    </form>
    <button @click="back">Back</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      debut_taf_temps: '',
      fin_taf_temps: '',
      H_start_temps: '',
      M_start_temps: '',
      H_end_temps: '',
      M_end_temps: '',
      FK_userID: '',
      msg: 'Saisie horaires salarié !',
      selected: '',
      heures: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
      minutes: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
      users: []
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      if (localStorage.getItem('jwt') != null) {
        console.log(this.name + '  =>  START: ' + this.debut_taf_temps + '   START: ' + this.fin_taf_temps)
        let url = 'http://localhost:3000/saisieHoraire'
        if (this.isAdmin != null || this.isAdmin === 1) url = 'http://localhost:3000/saisieHoraire'
        this.$http.post(url, {
          name: this.name,
          debut_taf_temps: this.debut_taf_temps,
          fin_taf_temps: this.fin_taf_temps,
          H_start_temps: this.H_start_temps,
          M_start_temps: this.M_start_temps,
          H_end_temps: this.H_end_temps,
          M_end_temps: this.M_end_temps

        })
          .then(response => {
            localStorage.setItem('user', JSON.stringify(response.data.user))
            localStorage.setItem('jwt', response.data.token)

            if (localStorage.getItem('jwt') != null) {
              this.$emit('loggedIn')
              if (this.$route.params.nextUrl != null) {
                this.$router.push('/UserBoard')
              } else {
                this.$router.push('/')
              }
            }
          })
          .catch(error => {
            console.error(error)
          })
      } else {
        this.name = ''
        this.debut_taf_temps = ''
        this.fin_taf_temps = ''
        this.H_start_temps = ''
        this.M_start_temps = ''
        this.H_end_temps = ''
        this.M_end_temps = ''
        this.FK_userID = ''

        return alert('Saisie incorrecte')
      }
    },
    back () {
      this.$router.go(-1)
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
