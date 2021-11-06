<template>
  <router-view/>
</template>

<style lang="scss">
html {
  font-size: 10px;
}

body {
  background: #f0f2f5;
  /*dev*/
  //background: #b5c3da;
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
</style>
