<template>
  <div id="user-list">
    <router-link :to="`/profile/${userInfo['id']}`" v-for="userInfo in usersInfo" :key="userInfo['id']">
      <img src="@/assets/images/icons/avatar.png" alt="img">
      <span>{{ userInfo['name_in_forum'] }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "UserList",
  props: ['usersInfo']
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
      justify-content: flex-start;
      padding: 1rem;
      //border-bottom: 1px solid $main-color1;
      img {
        width: 4.5rem;
        margin-right: 1rem;
      }
      span {
        font-weight: bold;
      }
    }
  }
</style>
