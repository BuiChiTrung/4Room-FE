<template>
  <NavBar/>
  <SideBar/>
  <main>
    <input class="form-control" id="post-title" type="text" placeholder="Title" v-model="newPost.title">
    <v-md-editor v-model="newPost.content"></v-md-editor>
    <button id="btn-save" class="btn btn-success">Save Post</button>
  </main>
<!--  <v-md-preview :text="text"></v-md-preview>-->
</template>

<script>

import NavBar from "../../components/layout/NavBar";
import SideBar from "../../components/layout/SideBar";
export default {
  name: "PostEditor",
  components: {SideBar, NavBar},
  data() {
    return {
      newPost: {
        'title': null,
        'content': ''
      }
    };
  },
  watch: {
    newPost() {
      console.log(this.newPost.title, this.newPost.content);
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/sass/style';

.avt {
  border-radius: 50%;
}

main {
  //position: relative;
  //display: flex;
  //flex-direction: column;
  //justify-content: space-between;
  //
  //font-family: 'Open Sans', sans-serif;
  //border-radius: 2rem;
  //background: white;
  padding: 0 1rem;
  width: calc(100vw - #{$sidebar-width});
  height: calc(100vh - #{$navbar-height} - 2rem);

  #post-title {
    font-size: 1.5rem;
  }

  .v-md-editor {
    height: calc(100vh - #{$navbar-height} - 10rem);
    margin: 2rem 0;
  }

  #btn-save {
    //font-size: 1.3rem;
  }
}
</style>
