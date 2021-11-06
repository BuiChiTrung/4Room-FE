<template>
  <NavBar bgColor="white"/>
  <SideBar bgColor="white"/>

  <main>
    <div id="profile">
      <img alt="avatar" src="@/assets/images/icons/avatar.png">
      <div v-if="showEditForm" id="profile-static">
        <div>{{userInfo.name_in_forum}}</div>
        <div>{{userInfo.bio}}</div>
        <hr>
        <button class="btn btn-info" @click="toggleEditForm">Edit Profile</button>

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

    <div id="posts">

    </div>
  </main>
</template>

<script>
import NavBar from "@/components/layout/NavBar";
import SideBar from "@/components/layout/SideBar";
import {updateProfile} from "@/infrastructure/apiServices";

export default {
  name: "ProfilePage",
  components: {SideBar, NavBar},
  data() {
    console.log(localStorage.getItem('user_info'));
    return {
      showEditForm: true,
      userInfo: JSON.parse(localStorage.getItem('user_info'))
      // userInfo: {
      //   'email': 'trungcspntl@gmail.com',
      //   'name_in_forum': 'Straw',
      //   'bio': "Taylor Swift's bf",
      //   'linkedin_link': 'https://www.linkedin.com/',
      //   'instagram_link': 'https://www.instagram.com/',
      //   'twitter_link': 'https://twitter.com/',
      //   'facebook_link': 'https://www.facebook.com/'
      // }
    }
  },

  created() {

  },

  methods: {
    toggleEditForm(){
      this.showEditForm = !this.showEditForm;
    },
    updateProfile(event) {
      event.preventDefault();
      updateProfile(this.userInfo)
      .then(response => {
        localStorage.setItem('user_info', JSON.stringify(response.data['user_info']));
        this.userInfo = response.data['user_info'];
        this.showEditForm = !this.showEditForm;
      })
      .catch(() => {
        alert('Fail to update profile. Please try again.');
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/sass/style.scss';

main {
  flex-grow: 1;
}

#profile {
  width: 50rem;
  font-size: 2rem;
  font-weight: bold;
  padding: 8rem;
  min-height: 100vh;
  background-image: linear-gradient(45deg, rgba(45, 52, 54, 0.7),rgba(248, 255, 255,0.8)), url('../../assets/images/profile_background.jpg');
  background-size: cover;
  img {
    width: 80%;
    display: block; margin: auto;
  }
  i {
    color: $main_color;
  }
  #profile-static {
    color: $main_color;
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
    div:first-child {
      font-size: 4rem;
      font-weight: bold;
    }
  }
  #edit-form {
    color: $main_color;
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
</style>
