<template>
  <div id="sidebar-wrapper">
    <aside :style="{background: bgColor}">
      <router-link class="room" to="/room">
        <img class="room-img" src="@/assets/images/rooms/piano.jpeg" alt="room-img">
        <div class="room-name">Piano</div>
      </router-link>
      <router-link class="room" to="/room">
        <img class="room-img" src="@/assets/images/rooms/lofi.jpg" alt="room-img">
        <div class="room-name">Lofi</div>
      </router-link>
      <router-link class="room" to="/room">
        <img class="room-img" src="@/assets/images/rooms/library.jpg" alt="room-img">
        <div class="room-name">Library</div>
      </router-link>
      <router-link class="room" to="/room">
        <img class="room-img" src="@/assets/images/rooms/live_study.jpeg" alt="room-img">
        <div class="room-name">Live Study</div>
      </router-link>
      <router-link class="room" to="/room">
        <img class="room-img" src="@/assets/images/rooms/rain.jpeg" alt="room-img">
        <div class="room-name">Rain</div>
      </router-link>
      <router-link class="room" to="/room">
        <img class="room-img" src="@/assets/images/rooms/beach.jpeg" alt="room-img">
        <div class="room-name">Beach</div>
      </router-link>
      <router-link class="room" to="/room">
        <img class="room-img" src="@/assets/images/rooms/natural.jpg" alt="room-img">
        <div class="room-name">Natural</div>
      </router-link>
      <router-link class="room" to="/room">
        <img class="room-img" src="@/assets/images/rooms/city.jpg" alt="room-img">
        <div class="room-name">City</div>
      </router-link>
      <router-link class="room" to="/room">
        <img class="room-img" src="@/assets/images/rooms/fantasy.jpg" alt="room-img">
        <div class="room-name">Fantasy</div>
      </router-link>
    </aside>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  props: ['bgColor']
}
</script>

<style lang="scss" scoped>
@import 'src/assets/sass/style';
#sidebar-wrapper {
  width: $sidebar-width;
  aside {
    position: fixed;
    //background: blue;
    text-align: center;
    width: $sidebar-width;
    min-height: 100%;
    .room {
      display: block;
      margin-top: 1rem;
      text-decoration: none;
      color: black;
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
