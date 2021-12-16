<template>
    <router-view :key="$route.path"></router-view>
</template>

<script>
</script>

<style lang="scss">
@import 'src/assets/sass/style.scss';
html {
  font-size: 10px;
  font-family: 'Open Sans', sans-serif;
}

body {
  background: #f0f2f5;
}

@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url(assets/fonts/material-icons/MaterialIcons-Regular.ttf) format('truetype');
}

@font-face {
  font-family: 'Material Icons Outlined';
  font-style: normal;
  font-weight: 400;
  src: url(assets/fonts/material-icons/MaterialIconsOutlined-Regular.otf) format('opentype');
}

.material-icons, .material-icons-outlined {
  font-weight: normal;
  font-style: normal;
  font-size: 24px;  /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
}

.material-icons {
  font-family: 'Material Icons';
}

.material-icons-outlined {
  font-family: 'Material Icons Outlined';
}

#app {
  font-family: Helvetica, Arial, sans-serif;
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
