<template>
  <NavBar bgColor="white"/>
  <SideBar bgColor="white"/>
  <main>
    <div>Hello world</div>
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
@import "../../assets/sass/style";
main {
  padding-left: 2rem;
  //background: green;
}
</style>
