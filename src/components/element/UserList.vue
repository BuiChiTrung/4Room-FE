<template>
  <div id="user-list">
    <div v-for="user in usersInfo" :key="user['id']">
      <div @click="changeRoute(`/profile/${user['id']}`)" style="cursor: pointer;">
        <a class="user">
          <img class="avatar avt" :src="avtURL(user['avatar_id'])" alt="img">
          <span class="name-in-forum">{{ user['name_in_forum'] }}</span>
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

  .avt {
    border-radius: 50%;
  }

  #user-list {
    width: 100%;
    background: #f0f2f5;
    border-radius: 2rem;

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
        font-size: 1.5rem;
      }
      //.name-in-forum:hover {
      //  text-decoration: underline;
      //}
    }

    .user:hover {
      background: #dedfe2;
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
