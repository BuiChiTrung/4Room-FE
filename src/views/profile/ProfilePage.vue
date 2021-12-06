<template>
  <NavBar bgColor="white"/>
  <SideBar bgColor="white"/>

  <main class="container w-100">
    <div class="row w-100 justify-content-center">
      <div class="col-lg-4 col-md-5">
        <div id="profile">
            <img alt="avatar" :src="avtURL()">
            <FollowArea :profileOwner="profileOwner"/>
            <StaticProfile v-if="showEditForm" :profileOwner="profileOwner"/>
            <EditProfileForm v-else/>
        </div>
      </div>

      <div class="col-lg-8 col-md-7 container newsfeed">
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
import {avatarURL, profileApi} from "../../infrastructure/apiServices";

export default {
  name: "ProfilePage",
  components: {FollowArea, EditProfileForm, StaticProfile, SideBar, NavBar, Posts},

  data() {
    return {
      profileOwner: true,
      userID: null,
      avatarID: null
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
    profileApi.getUserInfo(this.$data.userID)
    .then(({data}) => {
      this.$data.avatarID = data['data']['avatar_id']
    })
    .catch (err => console.log(err))
  },
  methods: {
    avtURL() {
      // this.avatarID = 1
      return avatarURL(this.$data.avatarID)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/sass/style.scss';

main {
  max-width: calc(100vw - #{$sidebar-width} - 2rem);
  display: flex;
  flex-wrap: wrap;
}

#profile {
  font-size: 2rem;
  font-weight: bold;
  padding: 5rem 4rem;
  min-height: 50vh;
  margin-top: 3.5rem;
  border-radius: 2rem;
  background-image: linear-gradient(45deg, rgba(45, 52, 54, 0.7),rgba(248, 255, 255,0.8)), url('../../assets/images/profile_background.jpg');
  background-size: cover;
  img {
    width: 40%;
    display: block;
    margin: auto;
  }
  i {
    color: $main_color;
  }
}
</style>
