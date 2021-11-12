<template>
  <NavBar bgColor="white"/>
  <SideBar bgColor="white"/>

  <main>
    <div id="profile">
      <img alt="avatar" src="@/assets/images/icons/avatar.png">
      <div v-if="showEditForm" id="profile-static">
        <div>
          <span>Following: {{userInfo['following']}}</span>
          <span v-if="!profileOwner && !followed" @click="followUser" title="Follow" class="material-icons" style="cursor: pointer;">favorite_border</span>
          <span v-if="!profileOwner && followed" @click="unFollowUser" title="Unfollow" class="material-icons" style="cursor: pointer;">favorite</span>
          <span>Follower: {{userInfo['follower']}}</span>
        </div>
        <div>{{userInfo.name_in_forum}}</div>
        <div>{{userInfo.bio}}</div>
        <hr>
        <button v-show="profileOwner" class="btn btn-info" @click="toggleEditForm">Edit Profile</button>

        <div id="contact">
          <a :href="userInfo.linkedin_link"><i class="fab fa-linkedin"></i></a>
          <a :href="userInfo.instagram_link"><i class="fab fa-instagram"></i></a>
          <a :href="userInfo.facebook_link"><i class="fab fa-facebook"></i></a>
          <a :href="userInfo.twitter_link"><i class="fab fa-twitter"></i></a>
        </div>
      </div>

      <form v-else id="edit-form" @submit="updateProfile">
        <div>
          <label for="name_in_forum">Name</label>
          <input type="text" class="form-control" id="name_in_forum" v-model="userInfo.name_in_forum">
        </div>

        <div>
          <label for="bio">Bio</label>
          <textarea type="email" class="form-control" id="bio" aria-describedby="emailHelp" v-model="userInfo.bio"></textarea>
        </div>

        <hr>

        <div class="row">
          <label class="col-1 col-form-label" for="linkedin-link" ><i class="fab fa-linkedin"></i></label>
          <div class="col-11">
            <input class="form-control" id="linkedin-link" name="linkedin-link" placeholder="Linkedin Link" type="text" v-model="userInfo.linkedin_link">
          </div>
        </div>

        <div class="row">
          <label class="col-1 col-form-label" for="instagram-link" ><i class="fab fa-instagram"></i></label>
          <div class="col-11">
            <input class="form-control" id="instagram-link" name="instagram-link" placeholder="Instagram Link" type="text" v-model="userInfo.instagram_link">
          </div>
        </div>

        <div class="row">
          <label class="col-1 col-form-label" for="facebook-link" ><i class="fab fa-facebook"></i></label>
          <div class="col-11">
            <input class="form-control" id="facebook-link" name="linkedin-link" placeholder="Facebook Link" type="text" v-model="userInfo.facebook_link">
          </div>
        </div>

        <div class="row">
          <label class="col-1 col-form-label" for="twitter-link" ><i class="fab fa-twitter"></i></label>
          <div class="col-11">
            <input class="form-control" id="twitter-link" name="linkedin-link" placeholder="Twitter Link" type="text" v-model="userInfo.twitter_link">
          </div>
        </div>

        <div id="buttons">
          <input type="submit" class="btn btn-info btn-save"  value="Save">
          <button class="btn btn-danger btn-cancel" @click="toggleEditForm">Cancel</button>
        </div>

      </form>
    </div>

      <div id="current-posts">
        <div class="justify-content-center">
            <Posts :typePosts="'Profile'" />
        </div>
      </div>
  </main>
</template>

<script>
import NavBar from "@/components/layout/NavBar";
import SideBar from "@/components/layout/SideBar";
import Posts from "@/components/newsfeed/Posts";
import {getUserInfo, getProfile, updateProfile, follow, unFollow} from "../../infrastructure/apiServices";

export default {
  name: "ProfilePage",
  components: {SideBar, NavBar, Posts},

  data() {
    console.log(localStorage.getItem('user_info'));
    return {
      showEditForm: true,
      userInfo: '',
      profileOwner: true,
      followed: false
    }
  },

  created() {
      const userId = this.$route.params.id;
      if (userId) {
        this.profileOwner = false
        getUserInfo(userId)
          .then(response => {
            this.userInfo = response.data['data'];
            this.followed = response.data['followed'];
          })
          .catch(err => console.log(err));
      }
      else {
        getProfile()
          .then(response => {
            this.userInfo = response.data['data'];
          })
          .catch(err => console.log(err));
      }
  },

  methods: {
    toggleEditForm(){
      this.showEditForm = !this.showEditForm;
    },
    updateProfile(event) {
      event.preventDefault();
      updateProfile(this.userInfo)
      .then(response => {
        this.userInfo = response.data['data'];
        this.showEditForm = !this.showEditForm;
      })
      .catch(() => {
        alert('Fail to update profile. Please try again.');
      })
    },
    followUser(event) {
      event.preventDefault();
      let self = this;

      follow(this.userInfo['id'])
          .then(() => {
            self.followed = true;
            self.userInfo['follower']++;
          })
          .catch((err) => console.log(err))
    },
    unFollowUser(event) {
      event.preventDefault();
      let self = this;
      unFollow(this.userInfo['id'])
          .then(() => {
            self.followed = false;
            self.userInfo['follower']--;
          })
          .catch((err) => console.log(err))
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
    width: 30rem;
    display: block; margin: auto;
  }
  i {
    color: $main_color;
  }
  #profile-static {
    color: $main_color;
    width: 30rem;
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
    div:nth-child(1) {
      font-size: 1.5rem;
      display: flex;
      justify-content: space-between;
      color: #2a2929;
      .material-icons {
        font-size: 3rem;
        color: pink;
      }
    }
    div:nth-child(2){
      font-size: 3.5rem;
      font-weight: bold;
    }
  }
  #edit-form {
    color: $main_color;
    width: 30rem;
    margin: 0 auto;
    div {
      display: block;
    }
    input, textarea, button {
      font-size: 1.3rem;
    }
    .btn-save {
      background: $main_color1;
      border: $main_color1;
      color: $main_color;
    }
    .btn-cancel {
      margin-left: 1rem;
    }
    textarea {
      height: 7rem;
    }
    .row {
      display: flex;
      align-items: center;
    }
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
  div {
    padding: 0 2rem;
  }
}

</style>
