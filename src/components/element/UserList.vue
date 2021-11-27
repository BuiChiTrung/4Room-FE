<template>
  <div id="user-list" style="background: #f0f2f5;">
    <div v-for="user in usersInfo" :key="user['id']">
      <router-link :to="`/profile/${user['id']}`">
        <img src="@/assets/images/icons/avatar.png" alt="img">
        <span class="h5">{{ user['name_in_forum'] }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
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
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/assets/sass/style.scss';
  #user-list {
    width: 100%;
    background: white;
    z-index: 1000;
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
