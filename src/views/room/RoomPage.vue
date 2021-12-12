<template>
  <Video :mutedSound="mutedSound" :roomName="roomName"/>
  <PomodoroClock v-if="displayPomodoroClock"/>
  <NavBar/>
  <SideBar/>
  <ChatArea v-if="displayChatArea" :roomName="roomName"/>
  <div id="control-buttons">
    <i @click="togglePomodoroClock" id="clock-icon" title="Pomodoro Clock" class="far fa-clock"></i>
    <i v-if="mutedSound" class="fas fa-volume-mute" title="On volume" @click="toggleSound"></i>
    <i v-else @click="toggleSound" title="Off volume" class="fas fa-volume-up"></i>
    <i @click="toggleChatArea" title="Chat room" class="fas fa-comments"></i>
  </div>
</template>

<script>
import NavBar from "@/components/layout/NavBar";
import SideBar from "@/components/layout/SideBar";
import Video from "@/views/room/Video";
import PomodoroClock from "@/views/room/PomodoroClock";
import ChatArea from "./ChatArea";
import {roomApi} from "../../infrastructure/apiServices";

export default {
  name: "RoomPage",
  components: {ChatArea, PomodoroClock, Video, SideBar, NavBar},
  data() {
    return {
      mutedSound: true,
      displayPomodoroClock: false,
      displayChatArea: false,
      roomName: ''
    }
  },


  created() {
    roomApi.getRoomInfo(this.$route.params.id)
      .then(({data}) => {
          this.roomName = data.data['name']
      })
      .catch(err => console.log(err));
  },

  methods: {
    toggleSound() {
      this.mutedSound = !this.mutedSound;
    },
    togglePomodoroClock() {
      if (!this.displayPomodoroClock) {
        this.displayChatArea = false;
      }
      this.displayPomodoroClock = !this.displayPomodoroClock;
    },
    toggleChatArea() {
      if (this.displayPomodoroClock) {
        alert('Only chat after finishing your session');
        return;
      }
      this.displayChatArea = !this.displayChatArea;
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/sass/style';
#control-buttons {
  position: fixed;
  bottom: 1rem;
  right: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  i {
    color: white;
    font-size: 3rem;
    margin: 1rem 0;
  }

  i:hover {
    color: #ced6e0;
    cursor: pointer;
  }
}
</style>
