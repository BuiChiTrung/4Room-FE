<template>
  <div id="navbar-wrapper">
    <nav :style="{ background: bgColor }">
      <i id="menu" class="fas fa-bars" @click="toggleSidebar"></i>
      <a href="/" id="logo-title">
        <img id="logo" src="@/assets/images/icons/4room.png" alt="logo">
        <div id="title">4Room</div>
      </a>

      <div id="search-space">
        <div id="search-box">
          <i class="search-icon fas fa-search"></i>
          <input class="search-bar" placeholder="Search" type="text"  v-model="nameInForum">
          <UserList :usersInfo="usersInfo" style="position: absolute;top: 2.5rem"/>
        </div>
      </div>

      <Notification/>

      <div class="dropdown dropstart">
        <a data-toggle="dropdown" href="#"  data-bs-toggle="dropdown"  aria-expanded="false">
          <img class="avt" id="avatar" :src="avtURL()" alt="avatar">
        </a>

        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li><a class="dropdown-item" href="/profile">Profile</a></li>
          <li><div class="dropdown-item" @click="logout">Logout</div></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import {authApi} from "@/infrastructure/apiServices";
import {profileApi} from "../../infrastructure/apiServices";
import UserList from "../element/UserList";
import Notification from "./Notification";
import {avatarURL} from "../../infrastructure/apiServices";
import {mapMutations} from "vuex";

export default {
  name: "NavBar",
  components: {Notification, UserList},
  props: ['bgColor'],

  data() {
    return {
      nameInForum: null,
      usersInfo: []
    }
  },

  methods: {
    ...mapMutations(['toggleSidebar']),

    async logout() {
      let response = await authApi.logout();
      if (response.status === 200) {
        localStorage.removeItem('jwt');
        location.assign('/login');
      }
    },

    avtURL() {
      const avtID = JSON.parse(localStorage.getItem('user_info'))['avatar_id']
      return avatarURL(avtID)
    }
  },

  watch: {
    nameInForum() {
      let self = this;
      if (this.nameInForum !== '')
        profileApi.searchUserByName(this.nameInForum)
            .then(response => {
              self.usersInfo = response.data['data'];
            })
            .catch(err => console.log(err))
      else
        this.usersInfo = [];
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/sass/style';
@import url('https://fonts.googleapis.com/css2?family=Dongle:wght@700&family=Fruktur&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap');
#navbar-wrapper {
  width: 100%;
  height: $navbar-height;
  z-index: 5;
}
nav {
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0 1.5rem;
  i {
    font-size: 2.5rem;
  }
  #menu {
    margin: 0 2.25rem;
  }
  #menu:hover {
    cursor: pointer;
  }

  #logo-title {
    display: flex;
    align-items: center;
    #title {
      font-size: 2.3rem;
      font-family: 'Roboto', sans-serif;
      font-weight: 800;
      margin-left: 1rem;
      color: #f5f3f3;
      text-shadow: 2px 0 0 #000, -2px 0 0 #000, 0 2px 0 #000, 0 -2px 0 #000, 1px 1px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000;
    }
  }

  #avatar {
    margin: 0 1.5rem;
  }

  #search-space {
    width: 60%;
    margin: auto;
    #search-box:focus {
      background: red;
    }
    #search-box {
      position: relative;
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

  #user-list {
    box-shadow: 0.1em 0.1em 3px rgba(0, 0, 0, 0.2);
  }

  img {
    height: 4rem;
  }
  .dropdown-menu {
    transform: translate(-2rem, 4rem) !important;
    padding: 0;
    li {
      width: 15rem;
      font-size: 1.5rem;
    }
  }
}

.avt {
  border-radius: 50%;
}

</style>
