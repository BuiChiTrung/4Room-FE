<template>
  <video autoplay :muted="mutedSound" loop>
    <source v-if="roomName" :src="videoSrc" type="video/mp4">
  </video>

</template>

<script>
import {baseStorageAPI} from "../../env";

export default {
  name: "Video",
  props: ['mutedSound', 'roomName'],

  computed: {
    videoSrc() {
      return `${baseStorageAPI}/videos/${this.roomName}.mp4`
    }
  },
  mounted() {
    let video = document.querySelector('video');
    video.onloadedmetadata = function() {
      this.currentTime = Math.floor(Date.now() / 1000) % Math.floor(this.duration);
    };
  },
}
</script>

<style scoped>
video {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
}

@media (max-aspect-ratio: 16/9) {
  video {
    width: auto;
    height: 100%;
  }
}

@media(min-aspect-ratio: 16/9) {
  video {
    width: 100%;
    height: auto;

  }
}
</style>
