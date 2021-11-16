<template>
<div class="up-post container">
  <div class="row row-with-caption">
    <div class="d-flex mb-3">
      <a href="#" style="margin-right: 1em">
        <img class="avatar" src="@/assets/images/icons/avatar.png" alt="avatar">
      </a>
      <textarea class="form-control text-write-caption" v-model="caption" name="caption" placeholder="what's on your mind?"></textarea>
    </div>
  </div>

  <div class="row attach-file justify-content-end">
    <div class="col-10 d-flex mb-3">
      <div>
        <input type="file" id="file" class="input-file" @change="handleFileUpload($event)"/>
        <label for="file" class="up-icon" style="cursor: pointer;">
          <img src="@/assets/images/file-upload.png" alt="file-upload" style="height: 2.8em">
        </label>
      </div>
      <div style="padding-left: 1em; padding-top: 0.8em">
        <span>{{ fileName }}</span>
      </div>
      <div class="ms-auto">
        <figure @click="submitPost()" style="cursor: pointer;">
          <img src="@/assets/images/share.png" alt="file-upload" style="height: 2.8em" >
        </figure>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { upPost } from "@/infrastructure/apiServices";

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
      formData.append('content', this.caption)
      formData.append('file', this.file)

      upPost(formData)
      .then(response => console.log(response.data['success']))
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        this._reload()
      })
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

</style>
