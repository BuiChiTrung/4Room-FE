<template>
  <div id="navbar-wrapper">
    <nav>
      <i id="menu" class="fas fa-bars" @click="toggleSideBar"></i>
      <div id="logo-title">
        <img id="logo" src="@/assets/images/icons/4room.svg" alt="logo">
        <span id="title">4Room</span>
      </div>
      <div id="search-space">
        <div id="search-box">
          <i class="search-icon fas fa-search"></i>
          <input class="search-bar" placeholder="Search" type="text">
        </div>
      </div>
      <i id="notifications" class="fas fa-bell"></i>
      <img id="avatar" src="@/assets/images/icons/avatar.png" alt="avatar">
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style lang="scss" scoped>
#navbar-wrapper {
  //height: 5rem;
  //width: 136px !important;
}
nav {
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0;
  background: white;
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
      font-size: 3rem;
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
}



</style>
