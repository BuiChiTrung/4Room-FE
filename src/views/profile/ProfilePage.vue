<template>
  <NavBar bgColor="white"/>
  <SideBar bgColor="white"/>

  <main class="container w-100">
    <div class="row w-100 justify-content-center">
      <div class="col-lg-4 col-md-5">
        <div id="profile">
            <div>
              <input v-if="profileOwner" type="file" id="change-avatar" ref="inputAvt" class="input-avatar" @change="handleUpLoadImage($event)"/>
              <label v-if="profileOwner" for="change-avatar">
                <img v-if="profileOwner" class="camera" src="@/assets/images/camera.png" style="transform: translate(115%, 465%); width: 9%; cursor: pointer;">
              </label>
              <figure>
                <img class="avt" alt="avatar" :src="avtURL">
              </figure>
            </div>
            <div v-if="changingMode" id="buttons" class="d-flex justify-content-center">
              <button type="submit" class="btn btn-info btn-save" @click="changeAvt()">Save</button>
              <button class="btn btn-danger btn-cancel" @click="cancelChange()">Cancel</button>
            </div>
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
import {avatarURL, changeAvatar} from "../../infrastructure/apiServices";

export default {
  name: "ProfilePage",
  components: {FollowArea, EditProfileForm, StaticProfile, SideBar, NavBar, Posts},

  data() {
    return {
      profileOwner: true,
      userID: null,
      avatarID: null,
      avatarLocal: null,
      changingMode: false,
      imgFile: null
    }
  },
  computed: {
    ...mapState(['showEditForm', 'userInfo']),
    avtURL: function() {
      return (this.$data.avatarLocal === null ? avatarURL(this.userInfo['avatar_id']) : this.$data.avatarLocal)
    }
  },

  created() {
    this.userID = JSON.parse(localStorage.getItem('user_info'))['id']
    if (this.$route.params.id) {
      if (this.$route.params.id == this.userID) {
        this.$router.push('/profile')
      } else {
        this.profileOwner = false
        this.userID = this.$route.params.id
      }
    }
  },

  methods: {
    handleUpLoadImage($event) {
      const fileType = $event.target.files[0].name.split('.')[1]
      console.log(fileType)
      if (fileType !== 'jpeg' && fileType !== 'png' && fileType !== 'jpg') {
        return
      }
      this.$data.changingMode = true
      this.$data.avatarLocal = URL.createObjectURL($event.target.files[0])
      this.$data.imgFile = $event.target.files[0]
    },

    cancelChange() {
      this.$data.changingMode = false
      this.$data.avatarLocal = null
      this.$refs.inputAvt.value = null
      this.$data.imgFile = null
    },

    changeAvt() {
      let formData = new FormData()
      formData.append('avatar', this.$data.imgFile)

      changeAvatar(formData)
      .then(({data}) => {
        console.log(data)
        localStorage.setItem('user_info', JSON.stringify(data['data']))
        location.reload()
      })
      .catch(err => {
        console.log(err)
        alert('Change avatar failed. Try again!')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/sass/style.scss';

/* dev */
// div, div > * {
//   border: 1px black solid;
// }

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
    display: block;
    margin: auto;
  }
  i {
    color: $main_color;
  }
}

@media (max-width: 2000px){
  #profile-static, #follow-area, #edit-form {
    width: 30rem;
  }
}

@media (max-width: 1260px){
  #profile-static, #follow-area, #edit-form {
    width: 100%;
  }
}

@media (max-width: 767px){
  #profile-static, #follow-area, #edit-form {
    width: 30rem;
  }
}

@media (max-width: 576px){
  #profile-static, #follow-area, #edit-form {
    width: 100%;
  }
}

.avt {
  border-radius: 50%;
  width: 40%;
  aspect-ratio: 1/1;
}

.input-avatar {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.btn-save {
  background: $main_color1;
  border: $main_color1;
  color: $main_color;
}
.btn-cancel {
  margin-left: 1rem;
}
</style>
