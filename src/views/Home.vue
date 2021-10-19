<template>
  <div class="home">
<!--    <img alt="Vue logo" src="../assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <video  autoplay muted loop>
      <source src="../assets/video1.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  data() {
    return {
      showFilms: true,
      title: 'Pirate of caribeen',
      mainActor: 'Johny Deep',
      publishYear: 2012
    }
  },
}
</script>

<style lang="scss">
  * {
    margin: 0;
  }
  body {
    //width: 100vw;
    //min-height: 100vh;
  }
  .home {
    position: relative;
    min-height: 100vh;
  }
  video {
    //position: absolute;
    //width: 100%;
    //left: 0;
    //overflow-x: hidden;
    //max-height: 100vh;
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
  }
</style>
