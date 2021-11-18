<template>
  <form id="edit-form" @submit="updateProfile">
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
</template>

<script>
import {profileApi} from "../../infrastructure/apiServices";
// eslint-disable-next-line no-unused-vars
import {mapMutations} from "vuex";

export default {
  name: "EditProfileForm",
  computed: {
    userInfo: {
      get() {
        return this.$store.state.userInfo
      },
      set(updatedInfo) {
        this.$store.commit('updateUserInfo', updatedInfo);
      }
    }
  },

  methods: {
    ...mapMutations(['toggleEditForm']),

    updateProfile(event) {
      event.preventDefault();
      profileApi.updateProfile(this.userInfo)
          .then(response => {
            localStorage.setItem('user_info', JSON.stringify(response.data['data']));
            this.toggleEditForm();
          })
          .catch(() => {
            alert('Fail to update profile. Please try again.');
          })
    },
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/sass/style.scss';
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
</style>
