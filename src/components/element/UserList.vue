<template>
  <div id="user-list">
    <router-link class="user-info" v-for="user in usersInfo" :key="user['id']" :to="`/profile/${user['id']}`">
        <div class="user">
          <img class="avatar avt" :src="avtURL(user['avatar_id'])" alt="img">
          <span class="name-in-forum">{{ user['name_in_forum'] }}</span>
        </div>
<!--        <span @click="user['followed']" title="Follow" class="material-icons" style="cursor: pointer;">favorite_border</span>-->
<!--        <span v-if="!profileOwner && followStatus" @click="unFollowUser" title="Unfollow" class="material-icons" style="cursor: pointer;">favorite</span>-->
    </router-link>
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

    .user-info {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
    }

    .user-info:hover {
      background: #dedfe2;
      border-radius: 2rem;
    }

    .user {
      display: block;
      @include flex-center;


      .avatar {
        width: 4.5rem;
        margin-right: 1rem;
      }
      .name-in-forum {
        font-weight: bold;
        font-size: 1.5rem;
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
