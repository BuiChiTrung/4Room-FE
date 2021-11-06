<template>
  <Video/>
  <PomodoroClock/>
  <NavBar/>
  <SideBar/>
</template>

<script>
import NavBar from "@/components/layout/NavBar";
import SideBar from "@/components/layout/SideBar";
import Video from "@/views/room/Video";
import PomodoroClock from "@/views/room/PomodoroClock";
export default {
  name: "RoomPage",
  components: {PomodoroClock, Video, SideBar, NavBar},
  // components: {Video, SideBar, NavBar},
}
</script>

<style scoped>
</style>
