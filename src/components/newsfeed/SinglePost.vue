<template>
<div class="container single-post">
  <div class="row" style="margin-top: 1.5em;">
    <div class="d-flex mb-3">
      <a :href="`/profile/${ownerID}`" style="margin-right: 0.5em">
        <img class="avatar avt" :src="avtURL()" alt="avatar">
      </a>
      <a :href="`/profile/${ownerID}`">
        <h4 class="text-start text-break fw-bold" style="margin-top: 0.3em; margin-left: 0.3em">{{ nameInForum }}</h4>
      </a>
      <div v-if="ownPost" class="dropdown ms-auto" style="cursor: pointer;">
        <a id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          <img class="dropdown-toggle" src="@/assets/images/dots.png"  style="height: 2em;" alt="">
        </a>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li class="dropdown-item" @click="editPost">Edit</li>
          <li class="dropdown-item" @click="deletePost">Delete</li>
        </ul>
      </div>
    </div>
  </div>

  <div v-show="!editMode" class="row caption-area">
    <h4 class="text-start text-break text-caption" style="white-space: pre-line;"> {{ frontTitle }}</h4>
    <span v-if="content" class="btn-open-md" data-bs-toggle="modal" :data-bs-target="`#markdownPost-${postID}`">
      View post
    </span>

    <div v-if="content" class="modal fade markdown" :id="`markdownPost-${postID}`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <v-md-preview :text="content"></v-md-preview>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-show="editMode" style="margin-bottom: 1em;">
    <textarea class="form-control text-write-caption" v-model="frontTitle"/>
  </div>

  <div class="row file-area" v-show="file !== null">
    <a :href="feDownFile()" style="cursor: pointer;" :download="file === null ? '' : file.name">
      <div class="d-flex">
          <figure>
              <img class="fa-lg" src="@/assets/images/file.png" alt="file" style="height: 2.8em" >
          </figure>
          <h4 style="margin-left: 0.3em; margin-top: 0.4em; word-break: break-all">{{ file === null ? '' : file.name }}</h4>
      </div>
    </a>
  </div>

  <div class="row like-upvote" v-show="!editMode">
    <div class="d-flex mb-3">
      <figure style="cursor: pointer;" @click="votePost()">
        <i v-if="!liked" class="far fa-thumbs-up fa-2x" style="color: rgb(32, 120, 244);"></i>
        <i v-if="liked" class="fas fa-thumbs-up fa-2x" style="color: rgb(32, 120, 244);"></i>
      </figure>
      <figure style="cursor: pointer; margin-left: 1em" @click="hideComments=!hideComments">
        <i class="far fa-comment-dots fa-2x"></i>
      </figure>

      <h5 data-bs-toggle="modal" :data-bs-target="`#upvote-modal-${postID}`" class="ms-auto" style="cursor: pointer;" @click="getUserUpvotePost">
        {{frontUpvote}} like{{frontUpvote > 1 ? 's' : ''}}
      </h5>
      <h5 style="margin-left: 0.5em; cursor: pointer;" @click="hideComments=!hideComments">{{frontComments.length}} comment{{frontComments.length > 1 ? 's' : ''}}</h5>
    </div>
  </div>
  <div class="row edit-done" v-show="editMode">
    <div class="d-flex mb-3">
      <figure class="ms-auto" style="cursor:pointer;" @click="updatePost()" @mouseover="turnOn('lightUpDone')" @mouseleave="turnOff('lightUpDone')">
        <i v-if="lightUpDone" class="fas fa-check-circle fa-2x" style="color: rgb(32, 120, 244);"></i>
        <i v-if="!lightUpDone" class="far fa-check-circle fa-2x" style="color: rgb(32, 120, 244);"></i>
      </figure>
    </div>
  </div>

  <div class="row cmt-area" v-show="!hideComments">
    <Comments :comment="frontComments" @submit-comment="submitComment" @delete-comment="deleteComment"/>
  </div>

  <div class="modal fade upvote" :id="`upvote-modal-${postID}`" tabindex="-1" aria-labelledby="upvoteModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fw-bold" id="upvoteModalLabel">Likes</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" data-bs-dismiss="modal">
          <UserList :usersInfo="upvoteList"/>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import { upVote, avatarURL, submitComment, updatePostContent, deleteAComment, isUpvoted, getUsersUpvote, downFile } from "@/infrastructure/apiServices";
import Comments from "./Comments";
import UserList from "@/components/element/UserList";
import {baseStorageAPI} from "../../env";

export default {
  name: "SinglePost",
  components: {
    Comments,
    UserList
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
    avatarID: {
      type: Number,
      require: true
    },
    nameInForum: {
      type: String,
      require: true
    },
    title: {
      type: String,
      require: false,
      default: ''
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
    comments: {
      type: Array,
      require: true,
      default: () => {
        return []
      }
    },
    indexInPostLists: {
      type: Number,
      require: true
    },
    hideAllComments: {
      type: Boolean,
      require: true
    }
  },
  created() {

  },
  data() {
    return {
      liked: null,
      frontUpvote: this.$props.upvote,
      hideComments: this.$props.hideAllComments,
      frontComments: this.$props.comments,
      user_info: JSON.parse(localStorage.getItem('user_info')),
      editMode: false,
      frontTitle: this.$props.title,
      lightUpDone: false,
      upvoteList: [],
      storageUrl: baseStorageAPI
    }
  },
  watch: {
    postID: function (new_postID) {
      console.log(new_postID)
      this.$data.liked = null
      this.$data.frontUpvote = this.$props.upvote
      this.$data.hideComments = true
      this.$data.frontComments = this.$props.comments
      this.$data.user_info = JSON.parse(localStorage.getItem('user_info'))
      this.$data.editMode = false
      this.$data.frontTitle = this.$props.title
      this.$data.lightUpDone = false
      this.$data.upvoteList = []
      this.$data.storageUrl = baseStorageAPI

      isUpvoted(this.$props.postID)
      .then(({ data }) => {
        this.$data.liked = data["is_upvoted"]
      })
      .catch(err => console.log(err))
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
      return downFile(this.$props.file.address)
    },

    votePost() {
      const addUpvote = this.$data.liked === false
      if (addUpvote) {
        this.$data.frontUpvote ++
      } else {
        this.$data.frontUpvote --
      }
      this.$data.liked = !this.$data.liked;

      upVote(addUpvote, this.$props.postID)
      .then(response => console.log(response.data['success']))
      .catch(err => console.log(err))
    },

    submitComment(reply) {
      let data = new FormData()
      data.append('content', reply)
      submitComment(data, this.$props.postID)
      .then(({data}) => {
        this.$data.frontComments.push(data['data'])
      })
      .catch(err => console.log(err))
    },

    updatePost() {
      updatePostContent(this.$props.postID, {"title": this.$data.frontTitle})
      .then(response => {
        console.log(response)
        this.$data.editMode = false
      })
      .catch(err => console.log(err))
    },

    editPost() {
      this.editMode = true;
      this.hideComments = true;
      if (this.content)
        this.$router.push(`/post/edit/${this.postID}`);
    },

    deletePost() {
      this.$emit('delete-post', this.$props.indexInPostLists)
    },

    deleteComment(indexInCmtList) {
      deleteAComment(this.$props.postID, this.$data.frontComments[indexInCmtList]["id"])
      .then(response => {
        console.log(response)
        this.$data.frontComments.splice(indexInCmtList, 1)
      })
      .catch(err => console.log(err))
    },

    getUserUpvotePost() {
      getUsersUpvote(this.$props.postID)
      .then(({data}) => {
        this.$data.upvoteList = data['data']
        this.$data.frontUpvote = this.$data.upvoteList.length
        console.log(this.$data.upvoteList)
      })
      .catch(err => console.log(err))
    },

    avtURL() {
      return avatarURL(this.$props.avatarID)
    },

    turnOn(prop) {
      this.$data[prop] = true
    },

    turnOff(prop) {
      this.$data[prop] = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/sass/style";

/* dev */
// div, div > * {
//   border: 1px black solid;
// }

.single-post {
  margin-top: 1.5em;
  background-color: white;
  border: 1px solid #D0D4D9;
  border-radius: 12px;
  box-shadow: 0.1em 0.1em 3px rgba(0, 0, 0, 0.2);
}

.text-start.text-break.fw-bold:hover {
  text-decoration: underline !important;
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
  padding-top: 1em;
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

.modal.fade {
  .modal-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .modal-body {
    overflow-y: scroll;
  }
}

.modal.fade.upvote {
  .modal-dialog {
    width: 50%;
  }
  .modal-body {
    max-height: 50vh
  }
}

.modal.fade.markdown {
  .modal-dialog {
    min-width: 90vw !important;
  }
  .modal-body {
    max-height: 80vh
  }
}

.avt {
  border-radius: 50%;
}

.btn-open-md {
  color: rgb(32, 120, 244);
  font-size: 1.5rem;
}

.btn-open-md:hover {
  font-weight: bold;
  cursor: pointer;
}

.dropdown-menu {
  font-size: 1.5rem;
  padding: 0;
}

img {
  aspect-ratio: 1/1;
}

</style>
