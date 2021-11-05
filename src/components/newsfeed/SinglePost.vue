<template>
<div class="container single-post">
  <div class="row" style="margin-top: 1.5em;">
    <div class="d-flex mb-3">
      <a href="#" style="margin-right: 0.5em">
        <img class="avatar" src="@/assets/images/icons/avatar.png" alt="avatar">
      </a>
      <h4 class="text-start text-break fw-bold" style="margin-top: 0.3em;">{{ author }}</h4>
    </div>
  </div>

  <div class="row caption-area">
    <h4 class="text-start text-break text-caption"> {{ caption }}</h4>
  </div>

  <div class="row">
    <div class="d-flex file-area">
      <figure style="cursor: pointer;">
        <img class="fa-lg" src="@/assets/images/file.png" alt="file" style="height: 2.8em" >
      </figure>
      <h4 style="margin-left: 0.3em; margin-top: 0.4em">{{ filename }}</h4>
    </div>
  </div>

  <div class="row">
    <div class="d-flex mb-3">
      <figure style="cursor: pointer;">
        <img src="@/assets/images/like.png" alt="like" style="height: 2em" >
      </figure>
      <figure style="cursor: pointer; margin-left: 1em">
        <img src="@/assets/images/comment.png" alt="comment" style="height: 2em" >
      </figure>

      <h5 class="ms-auto">{{upvote}} likes</h5>
      <h5 style="margin-left: 0.5em">5 comments</h5>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "SinglePost",
  props: {
    caption: {
      type: String,
      require: true
    },
    author: {
      type: String,
      require: true
    },
    filename: {
      type: String,
      require: true
    },
    link: {
      type: String,
      require: true
    },
    upvote: {
      type: Number,
      require: true
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/sass/style";

/* dev */
//div, div > * {
//  border: 1px black solid;
//}

.single-post {
  margin-top: 1.5em;
  background-color: white;
  border: 1px solid #D0D4D9;
  border-radius: 12px;
}

.avatar {
  height: 4.5em;
}

.caption-area {
  margin-bottom: 0.2em;
}

.text-caption {
  padding-bottom: 0.3em;
  border-bottom: 1px solid #D0D4D9;
}

.file-area {
  border-bottom: 1px solid #D0D4D9;
  margin-bottom: 0.75em;
}

</style>
