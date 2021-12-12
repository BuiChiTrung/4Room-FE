<template>
  <router-link class="room" :to="`/room/${roomId}`">
    <img class="room-img" :src="roomImgLink" alt="room-img">
    <div class="room-name">{{ roomName }}</div>
  </router-link>
</template>

<script>
export default {
  name: "RoomButton",
  props: ['roomName', 'roomId'],
  data() {
    return {
      roomImgLink: require(`@/assets/images/rooms/${this.roomName}.jpg`)
    }
  }
}
</script>

<style lang="scss" scoped>
.room {
  display: block;
  margin-top: 1rem;
  text-decoration: none;
  color: black;
  text-shadow: 1px 0 0 #fff, -1px 0 0 #fff, 0 1px 0 #fff, 0 -1px 0 #fff, 0.5px 0.5px #fff, -0.5px -0.5px 0 #fff, 0.5px -0.5px 0 #fff, -0.5px 0.5px 0 #fff;
  font-weight: bold;
}

.room:hover {
  .room-img {
    border-radius: 50%;
  }
}

.room-img {
  width: 5rem;
  border-radius: 40%;
  margin: auto;
}

.room-name {
  text-transform: capitalize;
}
</style>
