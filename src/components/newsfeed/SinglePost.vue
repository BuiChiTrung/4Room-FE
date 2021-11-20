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
      <div v-if="ownPost" class="dropdown ms-auto" style="cursor: pointer;">
        <a id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          <img class="dropdown-toggle" src="@/assets/images/dots.png"  style="height: 2em;" alt="">
        </a>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li class="dropdown-item" @click="editMode = true; hideComments = true;">Edit</li>
          <li class="dropdown-item" @click="deletePost">Delete</li>
        </ul>
      </div>
    </div>
  </div>

  <div v-show="!editMode" class="row caption-area">
    <h4 class="text-start text-break text-caption"> {{ frontContent }}</h4>
  </div>
  <div v-show="editMode" style="margin-bottom: 1em;">
    <textarea class="form-control text-write-caption" v-model="frontContent"/>
  </div>

  <div class="row file-area" v-show="file !== null">
    <a :href="feDownFile()" style="cursor: pointer;" :download="file === null ? '' : file.file_name">
      <div class="d-flex">
          <figure>
              <img class="fa-lg" src="@/assets/images/file.png" alt="file" style="height: 2.8em" >
          </figure>
          <h4 style="margin-left: 0.3em; margin-top: 0.4em">{{ file === null ? '' : file.file_name }}</h4>
      </div>
    </a>
  </div>

  <div class="row like-upvote" v-show="!editMode">
    <div class="d-flex mb-3">
      <figure style="cursor: pointer;" @click="votePost()">
        <img src="@/assets/images/like/like.png" alt="like" style="height: 2em;">
      </figure>
      <figure style="cursor: pointer; margin-left: 1em" @click="hideComments=!hideComments">
        <img src="@/assets/images/comment.png" alt="comment" style="height: 2em;" >
      </figure>

      <h5 class="ms-auto">{{frontUpvote}} like{{frontUpvote > 1 ? 's' : ''}}</h5>
      <h5 style="margin-left: 0.5em">{{frontComments.length}} comment{{frontComments.length > 1 ? 's' : ''}}</h5>
    </div>
  </div>
  <div class="row edit-done" v-show="editMode">
    <div class="d-flex mb-3">
      <figure class="ms-auto" style="cursor:pointer;" @click="updatePost()">
        <img src="@/assets/images/check/check.png" alt="check" style="height: 2em;">
      </figure>
    </div>
  </div>

  <div class="row cmt-area" v-show="!hideComments">
    <Comments :comment="frontComments" @submit-comment="submitComment" @delete-comment="deleteComment"/>
  </div>
</div>
</template>

<script>
import { upVote, submitComment, updatePostContent, deleteAComment } from "@/infrastructure/apiServices";
import Comments from "./Comments";
import {isUpvoted} from "@/infrastructure/apiServices";
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
    },
    indexInPostLists: {
      type: Number,
      require: true
    }
  },
  data() {
    return {
      liked: null,
      frontUpvote: this.$props.upvote,
      hideComments: true,
      frontComments: this.$props.comment,
      user_info: JSON.parse(localStorage.getItem('user_info')),
      editMode: false,
      frontContent: this.$props.content
    }
  },
  computed: {
    ownPost() {
      return this.$props.ownerID === this.$data.user_info['id']
    }
  },
  mounted() {
    isUpvoted(this.$props.postID)
    .then(({ data }) => {
      this.$data.liked = data["is_upvoted"]
    })
    .catch(err => console.log(err))
  },
  methods: {
    feDownFile() {
      if (this.$props.file === null) {
        return
      }
      return downFile(this.$props.file.file_address)
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
    },

    updatePost() {
      updatePostContent(this.$props.postID, {"content": this.$data.frontContent})
      .then(response => {
        console.log(response)
        this.$data.editMode = false
      })
      .catch(err => console.log(err))
    },

    deletePost() {
      this.$emit('delete-post', this.$props.indexInPostLists)
    },

    deleteComment(indexInCmtList) {
      deleteAComment(this.$props.postID, this.$data.frontComments[indexInCmtList]["comment_id"])
      .then(response => {
        console.log(response)
        this.$data.frontComments.splice(indexInCmtList, 1)
      })
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
  box-shadow: 0.1em 0.1em 3px rgba(0, 0, 0, 0.2);
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
  padding-top: 1.1em;
  border-top: 1px solid #D0D4D9;
}

.like-upvote {
  border-top: 1px solid #D0D4D9;
  padding-top: 1em;
  margin-bottom: -1em;
}

.edit-done {
  border-top: 1px solid #D0D4D9;
  padding-top: 1em;
}

.cmt-area {
  border-top: 1px solid #D0D4D9;
}

textarea {
  height: 100%;
  resize: none;
}

textarea::-webkit-scrollbar {
  width: 9px;
  background-color: #ffffff;
}

textarea::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #b5c3da;
}

.text-write-caption {
  font-size: 12.9px;
  line-height: 1.2;
}

</style>
