<template>
  <div id="user-list">
    <div v-for="user in usersInfo" :key="user['id']">
      <div @click="changeRoute(`/profile/${user['id']}`)" style="cursor: pointer;">
        <a class="user">
          <img class="avatar" :src="avtURL(user['avatar_id'])" alt="img">
          <span class="name-in-forum h5">{{ user['name_in_forum'] }}</span>
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
      avtID = 1;
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
    //clip-path: polygon(44% 8%, 49% 0, 54% 8%, 100% 8%, 100% 100%, 0 100%, 0 8%);

    .user {
      display: block;
      @include flex-center;
      padding: 1rem;
      border-radius: 2rem;
      .avatar {
        width: 4.5rem;
        margin-right: 1rem;
      }
      .name-in-forum {
        font-weight: bold;
      }
      //.name-in-forum:hover {
      //  text-decoration: underline;
      //}
    }

    .user:hover {
      background: whitesmoke;
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
