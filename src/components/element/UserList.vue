<template>
  <div id="user-list">
    <div v-for="user in usersInfo" :key="user['id']">
      <div @click="changeRoute(`/profile/${user['id']}`)" style="cursor: pointer;">
        <a>
          <img :src="avtURL(user['avatar_id'])" alt="img">
          <span class="h5">{{ user['name_in_forum'] }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import {avatarURL} from "@/infrastructure/apiServices";

export default {
  name: "UserList",
  props: {
    usersInfo: {
      type: Array,
      require: true,
      default: () => []
    }
  },
  mounted() {
    console.log(this.$props.usersInfo)
  },
  methods: {
    changeRoute(route) {
      this.$router.push(route)
    },
    avtURL(avtID) {
      return avatarURL(avtID)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/assets/sass/style.scss';
  #user-list {
    width: 100%;
    background: #f0f2f5;
    a {
      display: block;
      @include flex-center;
      padding: 1rem;
      img {
        width: 4.5rem;
        margin-right: 1rem;
      }
      span {
        font-weight: bold;
      }
    }
  }
  @media (max-width: 600px) {
    img {
      display: none;
    }
    span {
      font-size: 1rem;
    }
  }
</style>
