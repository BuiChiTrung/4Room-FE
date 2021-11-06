<template>
  <video autoplay :muted="mutedSound" loop>
    <source :src="videoSrc" type="video/mp4">
  </video>
  <i v-if="mutedSound" class="fas fa-volume-mute" @click="toggleSound"></i>
  <i v-else @click="toggleSound" class="fas fa-volume-up"></i>
</template>

<script>
export default {
  name: "Video",
  data() {
    return {
      mutedSound: true,
      videoSrc: require(`@/assets/videos/${this.$route.params.name}.mp4`)
    }
  },
  mounted() {
    let video = document.querySelector('video');
    video.onloadedmetadata = function() {
      this.currentTime = Math.floor(Date.now() / 1000) % Math.floor(this.duration);
      console.log(this.currentTime, Math.floor(this.duration));
    };
  },
  methods: {
    toggleSound() {
      this.mutedSound = !this.mutedSound;
    }
  }
}
</script>

<style scoped>
video {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
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




i {
  color: white;
  font-size: 3rem;
  position: fixed;
  bottom: 1rem;
  right: 4rem;
}
</style>
