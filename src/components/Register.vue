<template>
  <div>
    <h4>Enregistrement</h4>
    <form>
      <label for="name">Nom</label>
      <div>
        <input id="name" type="text" v-model="name" required autofocus>
      </div>

      <label for="email" >Addresse E-Mail</label>
      <div>
        <input id="email" type="email" v-model="email" required>
      </div>

      <label for="password">Password</label>
      <div>
        <input id="password" type="password" v-model="password" required>
      </div>

      <label for="password-confirm">Confirmer Password</label>
      <div>
        <input id="password-confirm" type="password" v-model="password_confirmation" required>
      </div>

      <label for="password-confirm">Administrateur ?</label>
      <div>
        <select v-model="isAdmin">
          <option value=1>Oui</option>
          <option value=0>Non</option>
        </select>
      </div>

      <div>
        <button type="submit" @click="handleSubmit">
          Ajouter
        </button>
      </div>
    </form>
    <button @click="back">Back</button>
  </div>
</template>

<script>
export default {
  props: ['nextUrl'],
  data () {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      isAdmin: null
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()

      if (this.password === this.password_confirmation && this.password.length > 0) {
        console.log(this.isAdmin)
        let url = 'http://localhost:3000/register'
        if (this.isAdmin != null || this.isAdmin === 1) url = 'http://localhost:3000/register-admin'
        this.$http.post(url, {
          name: this.name,
          email: this.email,
          password: this.password,
          isAdmin: this.isAdmin
        })
          .then(response => {
            localStorage.setItem('user', JSON.stringify(response.data.user))
            localStorage.setItem('jwt', response.data.token)

            if (localStorage.getItem('jwt') != null) {
              this.$emit('loggedIn')
              if (this.$route.params.nextUrl != null) {
                this.$router.push({ name: 'admin' })
              } else {
                this.$router.push('/admin')
              }
            }
          })
          .catch(error => {
            console.error(error)
          })
      } else {
        this.password = ''
        this.passwordConfirm = ''

        return alert('Mot de passe incorrect')
      }
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
