<template>
  <NavBar></NavBar>
  <SideBar></SideBar>
  <main>
    <h1>Hello world</h1>
  </main>
</template>

<script>
import SideBar from "@/components/layout/SideBar";
import NavBar from "@/components/layout/NavBar";
export default {
  name: "HomePage",
  components: {NavBar, SideBar}
}
</script>

<style lang="scss" scoped>
main {
  //transform: translate(7rem, 7rem);
  overflow-x: hidden;
  //min-height: 100vh;
  //background: red;
}
</style>
