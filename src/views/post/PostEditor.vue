<template>
  <NavBar/>
  <SideBar/>
  <main>
    <input class="form-control" id="post-title" type="text" placeholder="Caption" v-model="title" required>
    <v-md-editor v-model="content"></v-md-editor>
    <button v-if="updateMode" id="btn-update" class="btn btn-primary" @click="updatePost">Update Post</button>
    <button v-else id="btn-save" class="btn btn-success" @click="createNewPost">Save Post</button>
    <button class="btn btn-danger" @click="cancel">Cancel</button>
  </main>

</template>

<script>

import NavBar from "../../components/layout/NavBar";
import SideBar from "../../components/layout/SideBar";
// eslint-disable-next-line no-unused-vars
import {getAPost, updatePostContent, upPost} from "../../infrastructure/apiServices";
export default {
  name: "PostEditor",
  components: {SideBar, NavBar},
  data() {
    return {
      updateMode: false,
      title: null,
      postId: null,
      content: ''
    };
  },

  created() {
    this.postId = this.$route.params.id;

    if (this.postId) {
      this.updateMode = true;

      getAPost(this.postId)
        .then(({data}) => {
            if (data['data']['owner']['id'] !== JSON.parse(localStorage.getItem('user_info'))['id']) {
              this.$router.push('/');
              alert("You don't have permission to edit this post");
            }
            this.title = data['data']['title'];
            this.content = data['data']['content'];
        })
        .catch(err => alert(err.response.data.message))
    }
  },

  methods: {
    createNewPost(e) {
      e.preventDefault();

      if (!this.title || !this.content) {
        alert('Post content and title are required');
        return;
      }

      let newPost = new FormData();
      newPost.append('content', this.content);
      newPost.append('title', this.title);

      upPost(newPost)
          .then(() => {
            this.$router.push('/');
          })
          .catch(err => {
            alert(err.response.data.message);
          })
    },

    updatePost(e) {
      e.preventDefault();
      updatePostContent(this.postId, {'title': this.title, 'content': this.content})
        .then(() => {
            this.$router.go();
        })
        .catch(err => alert(err.response.data.message))
    },

    cancel() {
      this.$router.go(-1);
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'src/assets/sass/style';

.avt {
  border-radius: 50%;
}

main {
  padding: 0 1rem;
  width: calc(100vw - #{$sidebar-width} - 3rem);
  height: calc(100vh - #{$navbar-height} - 2rem);

  #post-title {
    font-size: 1.5rem;
  }

  .v-md-editor {
    height: calc(100vh - #{$navbar-height} - 12rem);
    margin: 2rem 0;
  }

  button {
    font-size: 1.5rem;
    margin-right: 1rem;
  }
}
</style>
