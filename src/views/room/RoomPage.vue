<template>
  <video autoplay muted loop>
    <source src="@/assets/videos/video1.mp4" type="video/mp4">
  </video>
  <NavBar/>
  <SideBar/>
</template>

<script>
import NavBar from "@/components/layout/NavBar";
import SideBar from "@/components/layout/SideBar";
export default {
  name: "RoomPage",
  components: {SideBar, NavBar}
}
</script>

<style scoped>
video {
  position: absolute;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
}
</style>
