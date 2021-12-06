<template>
  <div id="sidebar-wrapper">
    <aside :style="{background: bgColor}" v-if="showSidebar">
      <RoomButton roomId="1" roomName="beach"/>
      <RoomButton roomId="2" roomName="city"/>
      <RoomButton roomId="3" roomName="fantasy"/>
      <RoomButton roomId="4" roomName="library"/>
      <RoomButton roomId="5" roomName="lofi"/>
      <RoomButton roomId="6" roomName="natural"/>
      <RoomButton roomId="7" roomName="piano"/>
      <RoomButton roomId="8" roomName="rain"/>
      <RoomButton roomId="9" roomName="live-study"/>
    </aside>
  </div>
</template>

<script>
import RoomButton from "./RoomButton";
import {mapState} from "vuex";
export default {
  name: "SideBar",
  components: {RoomButton},
  props: ['bgColor'],
  computed: mapState(['showSidebar'])
}
</script>

<style lang="scss" scoped>
@import 'src/assets/sass/style';
@media (max-width: 600px) {
  #sidebar-wrapper {
    display: none;
  }
}

#sidebar-wrapper {
  width: $sidebar-width;
  height: 20px;
  //min-height: 90vh;
  aside {
    position: fixed;
    text-align: center;
    width: $sidebar-width;
    min-height: 100%;
    .room {
      display: block;
      margin-top: 1rem;
      text-decoration: none;
      color: black;
      text-shadow: 1px 0 0 #fff, -1px 0 0 #fff, 0 1px 0 #fff, 0 -1px 0 #fff, 0.5px 0.5px #fff, -0.5px -0.5px 0 #fff, 0.5px -0.5px 0 #fff, -0.5px 0.5px 0 #fff;
      font-weight: bold;
      .room-img {
        width: 5rem;
        border-radius: 40%;
        margin: auto;
      }
    }
  }
}

</style>
