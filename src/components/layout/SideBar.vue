<template>
  <div id="sidebar-wrapper">
    <aside>
      <a class="room" href="#">
        <img class="room-img" src="@/assets/images/rooms/piano.jpeg" alt="room-img">
        <div class="room-name">Piano</div>
      </a>
      <a class="room" href="#">
        <img class="room-img" src="@/assets/images/rooms/lofi.jpg" alt="room-img">
        <div class="room-name">Lofi</div>
      </a>
      <a class="room" href="#">
        <img class="room-img" src="@/assets/images/rooms/library.jpg" alt="room-img">
        <div class="room-name">Library</div>
      </a>
      <a class="room" href="#">
        <img class="room-img" src="@/assets/images/rooms/live_study.jpeg" alt="room-img">
        <div class="room-name">Live Study</div>
      </a>
      <a class="room" href="#">
        <img class="room-img" src="@/assets/images/rooms/rain.jpeg" alt="room-img">
        <div class="room-name">Rain</div>
      </a>
      <a class="room" href="#">
        <img class="room-img" src="@/assets/images/rooms/beach.jpeg" alt="room-img">
        <div class="room-name">Beach</div>
      </a>
      <a class="room" href="#">
        <img class="room-img" src="@/assets/images/rooms/natural.jpg" alt="room-img">
        <div class="room-name">Natural</div>
      </a>
      <a class="room" href="#">
        <img class="room-img" src="@/assets/images/rooms/city.jpg" alt="room-img">
        <div class="room-name">City</div>
      </a>
      <a class="room" href="#">
        <img class="room-img" src="@/assets/images/rooms/fantasy.jpg" alt="room-img">
        <div class="room-name">Fantasy</div>
      </a>
    </aside>
  </div>
</template>

<script>
export default {
  name: "SideBar"
}
</script>

<style lang="scss" scoped>
#sidebar-wrapper {
  width: 6rem;
  aside {
    position: fixed;
    background: white;
    margin-top: 5rem;
    width: 7rem;
    min-height: 100%;
    .room {
      display: block;
      margin-top: 1rem;
      text-decoration: none;
      color: black;
      font-weight: bold;
      .room-img {
        width: 70%;
        border-radius: 40%;
        margin: auto;
      }
    }
  }
}

</style>
