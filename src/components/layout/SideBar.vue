<template>
  <div id="sidebar-wrapper">
    <aside :style="{background: bgColor}">
      <a class="room" href="/room/piano">
        <img class="room-img" src="@/assets/images/rooms/piano.jpeg" alt="room-img">
        <div class="room-name">Piano</div>
      </a>
      <a class="room" href="/room/lofi">
        <img class="room-img" src="@/assets/images/rooms/lofi.jpg" alt="room-img">
        <div class="room-name">Lofi</div>
      </a>
      <a class="room" href="/room/library">
        <img class="room-img" src="@/assets/images/rooms/library.jpg" alt="room-img">
        <div class="room-name">Library</div>
      </a>
      <a class="room" href="/room/study-with-me">
        <img class="room-img" src="@/assets/images/rooms/live_study.jpeg" alt="room-img">
        <div class="room-name">Live Study</div>
      </a>
      <a class="room" href="/room/rain">
        <img class="room-img" src="@/assets/images/rooms/rain.jpeg" alt="room-img">
        <div class="room-name">Rain</div>
      </a>
      <a class="room" href="/room/beach">
        <img class="room-img" src="@/assets/images/rooms/beach.jpeg" alt="room-img">
        <div class="room-name">Beach</div>
      </a>
      <a class="room" href="/room/natural">
        <img class="room-img" src="@/assets/images/rooms/natural.jpg" alt="room-img">
        <div class="room-name">Natural</div>
      </a>
      <a class="room" href="/room/city">
        <img class="room-img" src="@/assets/images/rooms/city.jpg" alt="room-img">
        <div class="room-name">City</div>
      </a>
      <a class="room" href="/room/fantasy">
        <img class="room-img" src="@/assets/images/rooms/fantasy.jpg" alt="room-img">
        <div class="room-name">Fantasy</div>
      </a>
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
