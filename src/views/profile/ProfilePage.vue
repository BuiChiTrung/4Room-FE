<template>
  <NavBar bgColor="white"/>
  <SideBar bgColor="white"/>

  <main class="container w-100 vh-100">
    <div class="row justify-content-center">
      <div class="col-lg-4">
        <div id="profile">
            <img alt="avatar" src="@/assets/images/icons/avatar.png">
            <FollowArea :profileOwner="profileOwner"/>
            <StaticProfile v-if="showEditForm" :profileOwner="profileOwner"/>
            <EditProfileForm v-else/>
        </div>
      </div>

      <div class="col-lg-8 container newsfeed">
        <div class="row justify-content-center" style="margin-top: 2em">
          <div class="col-10">
            <Posts :typePosts="{name: 'ProfilePage', userID}"></Posts>
          </div>
        </div>
      </div>
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
      profileOwner: true,
      userID: null
    }
  },
  computed: mapState(['showEditForm']),

  created() {
    const currentUser = JSON.parse(localStorage.getItem('user_info'))['id']
    if (this.$route.params.id) {
      if (this.$route.params.id == currentUser) {
        this.$router.push('/profile')
      } else {
        this.profileOwner = false
        this.$data.userID = this.$route.params.id
      }
    } else {
      this.$data.userID = currentUser
    }
  }
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
  //width: 60rem;
  font-size: 2rem;
  font-weight: bold;
  padding: 5rem 0;
  min-height: 50vh;
  background-image: linear-gradient(45deg, rgba(45, 52, 54, 0.7),rgba(248, 255, 255,0.8)), url('../../assets/images/profile_background.jpg');
  background-size: cover;
  position: sticky;
  top: 3.1em;
  img {
    width: 30%;
    display: block; margin: auto;
  }
  i {
    color: $main_color;
  }
}


</style>
