<template>
  <router-view :key='$route.fullPath' />
</template>

<style lang="scss">
@import 'src/assets/sass/style.scss';
html {
  font-size: 10px;
}

body {
  background: #f0f2f5;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  display: flex;
  flex-wrap: wrap;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

hr {
  opacity: 1;
}

/* width */
::-webkit-scrollbar {
  width: 0.7rem;
}

/* Track */
::-webkit-scrollbar-track {
  //box-shadow: inset 0 0 2px grey;
  border-radius: 1px;
  background: white;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #bdc3c7;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: grey;
}

</style>
