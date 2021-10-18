<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div id="app">
      <!-- ACCESS DATA -->
      <div v-if="showFilms">{{ title }} - {{ mainActor }} - {{ publishYear }}</div>

      <!-- CLICK EVENT -->
      <!-- onclick function can be declared inside html or in vue js file -->
      <button v-on:click="publishYear++">Increase Year</button>
      <button v-on:click="publishYear--">Decrease Year</button>
      <!-- @click is short term for v-on:click -->
      <br>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return {
      showFilms: true,
      title: 'Pirate of caribeen',
      mainActor: 'Johny Deep',
      publishYear: 2012
    }
  },
  computed: {
    a: 10,
  }
}
</script>

<style lang="scss">
  button {
    background: blue;
  }
</style>
