<template>
  <NavBar bgColor="white"/>
  <SideBar bgColor="white"/>

  <main>
    <div id="profile">
      <img alt="avatar" src="@/assets/images/icons/avatar.png">

      <FollowArea :profileOwner="profileOwner"/>
      <StaticProfile v-if="showEditForm" :profileOwner="profileOwner"/>
      <EditProfileForm v-else/>
    </div>

      <div id="current-posts">
<!--        <div class="justify-content-center">-->
<!--            <Posts :typePosts="'Profile'" />-->
<!--        </div>-->
      </div>
  </main>
</template>

<script>
import NavBar from "@/components/layout/NavBar";
import SideBar from "@/components/layout/SideBar";
import Posts from "@/components/newsfeed/Posts";
import {mapState} from 'vuex';
import StaticProfile from "./StaticProfile";
import EditProfileForm from "./EditProfileForm";
import FollowArea from "./FollowArea";

export default {
  name: "ProfilePage",
  // eslint-disable-next-line vue/no-unused-components
  components: {FollowArea, EditProfileForm, StaticProfile, SideBar, NavBar, Posts},

  data() {
    return {
      profileOwner: true
    }
  },
  computed: mapState(['showEditForm']),

  created() {
    if (this.$route.params.id) {
      console.log(JSON.parse(localStorage.getItem('user_info'))['id'], this.$route.params.id);
      if (this.$route.params.id == JSON.parse(localStorage.getItem('user_info'))['id']) {
        this.$router.push('/profile');
      } else {
        this.profileOwner = false
      }
    }


  },
}
</script>

<style lang="scss" scoped>
@import 'src/assets/sass/style.scss';

main {
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
}

#profile {
  width: 60rem;
  font-size: 2rem;
  font-weight: bold;
  padding: 5rem 0;
  min-height: 95vh;
  background-image: linear-gradient(45deg, rgba(45, 52, 54, 0.7),rgba(248, 255, 255,0.8)), url('../../assets/images/profile_background.jpg');
  background-size: cover;
  img {
    width: 50%;
    display: block; margin: auto;
  }
  i {
    color: $main_color;
  }
}

@media (max-width: 1200px) {
  #profile {
    width: 40rem;
  }
}

@media (max-width: 800px) {
  #profile {
    width: 100%;
  }
}

#current-posts {
  flex-grow: 1;
  display: inline !important;
  div {
    padding: 0 2rem;
  }
}

</style>
