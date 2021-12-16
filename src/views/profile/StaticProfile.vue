<template>
  <div id="profile-static">
    <div id="name-in-forum">{{userInfo.name_in_forum}}</div>
    <div id="bio" style="white-space: pre-line;">{{userInfo.bio}}</div>
    <hr>
    <button v-show="profileOwner" class="btn btn-info" @click="toggleEditForm">Edit Profile</button>

    <div id="contact">
      <a :href="userInfo.linkedin_link"><i class="fab fa-linkedin"></i></a>
      <a :href="userInfo.instagram_link"><i class="fab fa-instagram"></i></a>
      <a :href="userInfo.facebook_link"><i class="fab fa-facebook"></i></a>
      <a :href="userInfo.twitter_link"><i class="fab fa-twitter"></i></a>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import {profileApi} from "../../infrastructure/apiServices";
export default {
  name: "StaticProfile",
  props: ['profileOwner'],
  computed: mapState(['userInfo', 'showEditForm', 'followStatus']),
  methods: mapMutations(['updateUserInfo', 'toggleEditForm', 'updateFollowStatus']),

  created() {
    if (!this.profileOwner) {
      profileApi.getUserInfo(this.$route.params.id)
          .then(response => {
            this.updateUserInfo(response.data['data']);
            this.updateFollowStatus(response.data['followed'])
          })
          .catch(err => console.log(err));
    }
    else {
      profileApi.getProfile()
          .then(response => {
            this.updateUserInfo(response.data['data']);
          })
          .catch(err => console.log(err));
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'src/assets/sass/style.scss';

#profile-static {
  color: $main_color;
  margin: 0 auto;
  button {
    width: 100%;
    border: none;
    border-radius: 1rem;
    background: rgba(45, 52, 54,1.0);
    color: $main_color;
  }
  #contact {
    display: flex;
    font-size: 3rem;
    justify-content: space-between;
    margin-top: 2rem;
  }
  div:nth-child(0) {
    font-size: 1.5rem;
    display: flex;
    justify-content: space-between;
    color: #2a2929;
    .material-icons {
      font-size: 3rem;
      color: pink;
    }
  }
  div:nth-child(1){
    font-size: 3rem;
    font-weight: bold;
  }
}
</style>
