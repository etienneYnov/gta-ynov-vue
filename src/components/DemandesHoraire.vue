<template>
  <div>
    <h4>Page pour voir toutes les demandes des utilisateurs</h4>
    <h2>{{msg}}</h2>
    <button @click="back">Back</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Bienvenue chef!'
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
