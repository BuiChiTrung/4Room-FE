<template>
  <div id="navbar-wrapper">
    <nav :style="{ background: bgColor }">
      <i id="menu" class="fas fa-bars" @click="toggleSideBar"></i>
      <a href="/" id="logo-title">
        <img id="logo" src="@/assets/images/icons/4room.svg" alt="logo">
        <div id="title">4Room</div>
      </a>
      <div id="search-space">
        <div id="search-box">
          <i class="search-icon fas fa-search"></i>
          <input class="search-bar" placeholder="Search" type="text">
        </div>
      </div>
      <i id="notifications" class="fas fa-bell"></i>
      <div class="dropdown dropstart">
        <a data-toggle="dropdown" href="#"  data-bs-toggle="dropdown"  aria-expanded="false">
          <img id="avatar" src="@/assets/images/icons/avatar.png" alt="avatar">
        </a>

        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li><router-link class="dropdown-item" to="/profile">Profile</router-link></li>
          <li><div class="dropdown-item" @click="logout">Logout</div></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: ['bgColor'],
  methods: {
    logout() {
      localStorage.removeItem('jwt');
      location.assign('/login');
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/sass/style';
#navbar-wrapper {
  width: 100%;
  height: $navbar-height;
}
nav {
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0 1.5rem;
  //background: red;
  i {
    font-size: 2.5rem;
  }
  #menu {
    margin: 0 2.25rem;
  }
  #logo-title {
    display: flex;
    align-items: center;
    #title {
      font-size: 2.5rem;
      font-family: Roboto, sans-serif;
    }
  }
  #avatar {
    margin: 0 2rem;
  }
  #search-space {
    width: 60%;
    margin: auto;
    #search-box {
      margin: auto;
      width: 40%;
      border-radius: 5rem;
      border: 0.1rem solid black;
      font-size: 1.5rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .search-bar {
        border: none;
        border-radius: 5rem;
        background: transparent;
        width: 55%;
      }
      .search-bar:focus {
        outline: none;
      }
      .search-icon {
        font-size: 1.5rem;
      }
    }
  }
  #notifications {
    width: 5rem;
  }
  img {
    height: 4rem;
  }
  .dropdown-menu {
    transform: translate(-2rem, 4rem) !important;
    li {
      width: 15rem;
      font-size: 1.5rem;
    }
  }
}
</style>
