<template>
  <div id="sidebar-wrapper">
    <aside :style="{background: bgColor}">
      <router-link class="room" to="/room/piano">
        <img class="room-img" src="@/assets/images/rooms/piano.jpeg" alt="room-img">
        <div class="room-name">Piano</div>
      </router-link>
      <router-link class="room" to="/room/lofi">
        <img class="room-img" src="@/assets/images/rooms/lofi.jpg" alt="room-img">
        <div class="room-name">Lofi</div>
      </router-link>
      <router-link class="room" to="/room/library">
        <img class="room-img" src="@/assets/images/rooms/library.jpg" alt="room-img">
        <div class="room-name">Library</div>
      </router-link>
      <router-link class="room" to="/room/study-with-me">
        <img class="room-img" src="@/assets/images/rooms/live_study.jpeg" alt="room-img">
        <div class="room-name">Live Study</div>
      </router-link>
      <router-link class="room" to="/room/rain">
        <img class="room-img" src="@/assets/images/rooms/rain.jpeg" alt="room-img">
        <div class="room-name">Rain</div>
      </router-link>
      <router-link class="room" to="/room/beach">
        <img class="room-img" src="@/assets/images/rooms/beach.jpeg" alt="room-img">
        <div class="room-name">Beach</div>
      </router-link>
      <router-link class="room" to="/room/natural">
        <img class="room-img" src="@/assets/images/rooms/natural.jpg" alt="room-img">
        <div class="room-name">Natural</div>
      </router-link>
      <router-link class="room" to="/room/city">
        <img class="room-img" src="@/assets/images/rooms/city.jpg" alt="room-img">
        <div class="room-name">City</div>
      </router-link>
      <router-link class="room" to="/room/fantasy">
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
@media (max-width: 600px) {
  #sidebar-wrapper {
    display: none;
  }
}

#sidebar-wrapper {
  width: $sidebar-width;
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
