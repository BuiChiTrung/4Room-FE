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
    <h4 class="text-start text-break text-caption"> {{ content }}</h4>
  </div>

  <div class="row">
    <a :href="downFile">
      <hr>
      <div class="d-flex file-area">
          <figure style="cursor: pointer;">
              <img class="fa-lg" src="@/assets/images/file.png" alt="file" style="height: 2.8em" >
          </figure>
          <h4 style="margin-left: 0.3em; margin-top: 0.4em">{{ filename }}</h4>
      </div>
      <hr>
    </a>
  </div>

  <div class="row">
    <div class="d-flex mb-3">
      <figure style="cursor: pointer;" @click="votePost()">
        <img src="@/assets/images/like.png" alt="like" style="height: 2em" >
      </figure>
      <figure style="cursor: pointer; margin-left: 1em" @click="hideComments=!hideComments">
        <img src="@/assets/images/comment.png" alt="comment" style="height: 2em" >
      </figure>

      <h5 class="ms-auto">{{frontUpvote}} like{{frontUpvote > 1 ? 's' : ''}}</h5>
      <h5 style="margin-left: 0.5em">{{frontComments.length}} comments</h5>
    </div>
    <hr>
  </div>

  <div class="row" v-show="!hideComments">
    <Comments :comments="comments" @submit-comment="submitComment"/>
  </div>
</div>
</template>

<script>
import { baseApiUrl } from '@/env'
import { upVote, submitComment } from "@/infrastructure/apiServices";
import Comments from "./Comments";

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
    author: {
      type: String,
      require: true
    },
    content: {
      type: String,
      require: false,
      default: ''
    },
    filename: {
      type: String,
      require: true
    },
    upvote: {
      type: Number,
      require: true
    },
    comments: {
      type: Array,
      require: true,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      liked: false,
      frontUpvote: this.$props.upvote,
      hideComments: false, //TODO: "true" initially
      frontComments: this.$props.comments
    }
  },
  computed: {
    downFile() {
      return `${baseApiUrl}/download-file/${this.$props.postID}`
    }
  },
  methods: {
    votePost() {
      if (this.$data.liked === true) {
        this.$data.frontUpvote --
      } else {
        this.$data.frontUpvote ++
      }
      this.$data.liked = !this.$data.liked;

      //TODO: need to know body request
      upVote({
        //data
      }, {
        //config
      })
      .then(() => console.log('Upvoted'))
      .catch(err => console.log(err))
    },

    submitComment(reply) {
      this.$data.frontComments.push({
        'user_id': 'vuquangle',//TODO: localStorage.getItem('user_id')
        'content': reply
      })

      //TODO: need to know body request
      submitComment({
        // data
      }, {
        //config
      })
      .then(() => console.log('Comment submitted'))
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
