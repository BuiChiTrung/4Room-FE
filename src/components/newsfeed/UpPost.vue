<template>
<div class="up-post container">
  <div class="row row-with-caption">
    <div class="d-flex mb-3">
      <a href="#" style="margin-right: 1em">
        <img class="avatar avt" :src="avtURL()" alt="avatar">
      </a>
      <textarea class="form-control text-write-caption" v-model="caption" name="caption" placeholder="What's on your mind?"></textarea>
    </div>
  </div>

  <div class="row attach-file justify-content-end">
    <div class="col-10 d-flex mb-3">
      <div>
        <input type="file" id="file" class="input-file" @change="handleFileUpload($event)"/>
        <label for="file" class="up-icon" style="cursor: pointer;">
          <router-link to="/post/edit" title="Post editor"><span class="material-icons-outlined" style="color: rgb(32, 120, 244); margin-right: 1rem">create</span></router-link>
          <span v-show="this.file === null" class="material-icons-outlined" style="color: rgb(32, 120, 244);" title="Upload file">cloud_upload</span>
          <span v-show="this.file !== null" class="material-icons" style="color: rgb(32, 120, 244);">cloud_done</span>
        </label>
      </div>
      <div style="padding-left: 1em; padding-top: 0.8em">
        <span>{{ fileName }}</span>
      </div>
      <div class="ms-auto">
        <figure @click="submitPost()" style="cursor: pointer;">
          <i v-show="this.file === null && this.caption === ''" class="far fa-paper-plane fa-2x" style="color: rgb(32, 120, 244);"></i>
          <i v-show="!(this.file === null && this.caption === '')" class="fas fa-paper-plane fa-2x" style="color: rgb(32, 120, 244);"></i>
        </figure>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { upPost } from "@/infrastructure/apiServices";
import {avatarURL} from "../../infrastructure/apiServices";

export default {
  name: "UpPost",
  data() {
    return {
      caption: '',
      fileName: '',
      file: null
    }
  },
  methods: {
    _reload() {
      location.reload()
    },

    handleFileUpload(event) {
      this.file = event.target.files[0]
      this.fileName = this.file.name
    },

    submitPost() {
      if (this.file === null && this.caption === '') {
        return
      }

      let formData = new FormData()
      formData.append('title', this.caption)
      formData.append('file', this.file)

      upPost(formData)
      .then(response => console.log(response.data['success']))
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        this._reload()
      })
    },

    avtURL() {
      const avtID = JSON.parse(localStorage.getItem('user_info'))['avatar_id']
      return avatarURL(avtID)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/sass/style";

/* dev */
//div * {
//  border: 1px black solid;
//}

.up-post {
  margin-bottom: 1em;
  border: 1px solid #D0D4D9;
  border-radius: 12px;
  padding-top: 2.5em;
  background-color: white;
  box-shadow: 0.1em 0.1em 3px rgba(0, 0, 0, 0.2);
}

.text-write-caption {
  font-size: 12.9px;
  line-height: 1.2;
}

.row-with-caption {
  height: 7.7em;
}

.attach-file {
  margin-top: 3em;
  padding-top: 1em;
  border-top: 1px solid #D0D4D9
}

.input-file {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.up-icon {
  margin-bottom: -3em;
}

i:hover, .material-icons:hover {
  color: rgb(6, 36, 80) !important;
}

.avatar {
  height: 5.5em;
}

textarea {
  height: 100%;
  resize: none;
  border: 1px solid #D0D4D9;
  border-radius: 12px;
}

textarea::-webkit-scrollbar {
  width: 9px;
  background-color: #ffffff;
}

textarea::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #b5c3da;
}

$breakpoint-tablet: 500px;
@media (max-width: $breakpoint-tablet) {
  #avatar {
    display: none;
  }
}

.avt {
  border-radius: 50%;
}

img {
  aspect-ratio: 1/1;
}


</style>
