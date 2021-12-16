<template>
  <div id="user-list">
    <div class="user-info" v-for="user in usersInfo" :key="user['id']" >
        <router-link :to="`/profile/${user['id']}`" class="user">
          <img class="avatar avt" :src="avtURL(user['avatar_id'])" alt="img">
          <span class="name-in-forum">{{ user['name_in_forum'] }}</span>
        </router-link>
        <span v-if="followDirectly" @click="followOrUnfollowUser($event, user['id'])" title="Follow" class="material-icons" style="cursor: pointer; color: #e2a5b0">favorite_border</span>
    </div>
  </div>
</template>

<script>
import {avatarURL} from "@/infrastructure/apiServices";
// eslint-disable-next-line no-unused-vars
import {followApi} from "../../infrastructure/apiServices";

export default {
  name: "UserList",

  props: {
    usersInfo: {
      type: Array,
      require: true,
      default: () => []
    },
    followDirectly: {
      type: Boolean,
      require: false
    }
  },

  methods: {
    changeRoute(route) {
      this.$router.push(route)
    },
    avtURL(avtID) {
      return avatarURL(avtID)
    },
    followOrUnfollowUser(e, userId) {
      e.preventDefault();
      if (e.target.innerHTML === 'favorite_border') {
        e.target.innerHTML = 'favorite';
        followApi.follow(userId).catch(err => console.log(err))
      } else {
        e.target.innerHTML = 'favorite_border'
        followApi.unFollow(userId).catch(err => console.log(err))
      }
    },
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
        aspect-ratio: 1/1;
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
