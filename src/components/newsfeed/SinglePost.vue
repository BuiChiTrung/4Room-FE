<template>
<div class="container single-post">
  <div class="row" style="margin-top: 1.5em;">
    <div class="d-flex mb-3">
      <a :href="`/profile/${ownerID}`" style="margin-right: 0.5em">
        <img class="avatar" src="@/assets/images/icons/avatar.png" alt="avatar">
      </a>
      <a :href="`/profile/${ownerID}`">
      <h4 class="text-start text-break fw-bold" style="margin-top: 0.3em; margin-left: 0.3em">{{ nameInForum }}</h4>
      </a>
    </div>
  </div>

  <div class="row caption-area">
    <h4 class="text-start text-break text-caption"> {{ content }}</h4>
  </div>

  <div class="row" v-show="file !== null">
    <div @click="feDownFile()" style="cursor: pointer;">
      <hr>
      <div class="d-flex file-area">
          <figure>
              <img class="fa-lg" src="@/assets/images/file.png" alt="file" style="height: 2.8em" >
          </figure>
          <h4 style="margin-left: 0.3em; margin-top: 0.4em">{{ file === null ? '' : file.file_name }}</h4>
      </div>
      <hr>
    </div>
  </div>

  <div class="row">
    <hr v-show="file === null">
    <div class="d-flex mb-3">
      <figure style="cursor: pointer;" @click="votePost()">
        <img src="@/assets/images/like.png" alt="like" style="height: 2em" >
      </figure>
      <figure style="cursor: pointer; margin-left: 1em" @click="hideComments=!hideComments">
        <img src="@/assets/images/comment.png" alt="comment" style="height: 2em" >
      </figure>

      <h5 class="ms-auto">{{frontUpvote}} like{{frontUpvote > 1 ? 's' : ''}}</h5>
      <h5 style="margin-left: 0.5em">{{frontComments.length}} comment{{frontComments.length > 1 ? 's' : ''}}</h5>
    </div>
    <hr>
  </div>

  <div class="row" v-show="!hideComments">
    <Comments :comment="frontComments" @submit-comment="submitComment"/>
  </div>
</div>
</template>

<script>
import { upVote, submitComment } from "@/infrastructure/apiServices";
import Comments from "./Comments";
import {downFile} from "@/infrastructure/apiServices";

export default {
  name: "SinglePost",
  components: {
    Comments
  },
  props: {
    postID: {
      type: Number,
      require: true
    },
    ownerID: {
      type: Number,
      require: true
    },
    nameInForum: {
      type: String,
      require: true
    },
    content: {
      type: String,
      require: false,
      default: ''
    },
    file: {
      type: Object,
      default: null
    },
    upvote: {
      type: Number,
      require: true
    },
    comment: {
      type: Array,
      require: true,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      liked: false, //TODO: get from api
      frontUpvote: this.$props.upvote,
      hideComments: true, //TODO: "true" initially
      frontComments: this.$props.comment,
      user_info: JSON.parse(localStorage.getItem('user_info'))
    }
  },
  methods: {
    feDownFile() {
      if (this.$props.file === null) {
        return
      }
      downFile(this.$props.file.file_address)
      .then(response => console.log(response))
      .catch(err => console.log(err))
    },

    votePost() {
      const addUpvote = this.$data.liked === false
      if (addUpvote) {
        this.$data.frontUpvote ++
      } else {
        this.$data.frontUpvote --
      }
      this.$data.liked = !this.$data.liked;

      //TODO: need to know body request
      upVote(addUpvote, this.$props.postID)
      .then(response => console.log(response.data['success']))
      .catch(err => console.log(err))
    },

    submitComment(reply) {
      this.$data.frontComments.push({
        user_id: this.$data.user_info['id'],
        name_in_forum: this.$data.user_info['name_in_forum'],
        content: reply
      })

      let data = new FormData()
      data.append('content', reply)
      submitComment(data, this.$props.postID)
      .then(response => console.log(response))
      .catch(err => console.log(err))
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
}

.file-area {
  margin-bottom: 0.75em;
}

</style>
