<template>
  <div>
    <h4>Formulaire de changement d'horaires</h4>
    <h2>{{msg}}</h2>
    <button @click="back">Back</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Bienvenue !'
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
