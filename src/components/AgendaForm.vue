<template>
  <div>
    <h4>Formulaire de demande de changement d'horaires</h4>
    <h2>{{msg}}</h2>
    <button @click="back">Back</button>
    <button @click="back">TEST</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Ici on demande au chef des changements...'
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
