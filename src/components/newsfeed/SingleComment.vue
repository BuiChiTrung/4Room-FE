<template>
<div class="d-flex mb-3 single-comment">
  <a :href="`/profile/${userID}`" style="margin-right: 0.5em">
    <img class="comment-avatar avt" :src="avtURL()" alt="avatar">
  </a>
  <h5 v-if="!editMode" class="text-start text-break" style="margin-top: 0.3em;">
    <a :href="`/profile/${userID}`" style="text-decoration: none; color: black">
    <span class="text-start text-break fw-bold">{{ nameInForum }}</span>
    </a>
    {{content}}
  </h5>
  <div class="ms-auto delete-comment" v-show="ownComment" style="display: inline; cursor: pointer;" @click="deleteComment" @mousemove="turnOn('lightUpDel')" @mouseleave="turnOff('lightUpDel')">
      <span v-if="!lightUpDel" class="material-icons-outlined" style="color: #f3425f;">remove_circle_outline</span>
      <span v-if="lightUpDel" class="material-icons-outlined" style="color: #f3425f;">remove_circle</span>
  </div>
</div>
</template>

<script>
import {avatarURL} from "@/infrastructure/apiServices";

export default {
  name: "SingleComment",
  props: {
    userID: {
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
    content: {
      type: String,
      require: true
    },
    indexInCmtList: {
      type: Number,
      require: true
    }
  },
  data() {
    return {
      editMode: false,
      user_info: JSON.parse(localStorage.getItem('user_info')), // current user
      lightUpDel: false
    }
  },
  computed: {
    ownComment() {
      return this.$props.userID === this.$data.user_info['id']
    }
  },
  methods: {
    deleteComment() {
      this.$emit('delete-comment', this.$props.indexInCmtList)
    },

    turnOn(prop) {
      this.$data[prop] = true
    },

    turnOff(prop) {
      this.$data[prop] = false
    },

    avtURL() {
      return avatarURL(this.$props.avatarID)
    }
  }
}
</script>

<style lang="scss" scoped>

// div, div > * {
//   border: 1px black solid;
// }

.comment-avatar {
  height: 2.8em;
}

.single-comment {
  // padding: 1em;
  margin-bottom: 1em;
  align-items: center;
  color: #333;
  background-color: #F2F2F2;
  border-radius: 2.5em;
  box-shadow: 0.1em 0.1em 3px rgba(0, 0, 0, 0.2);
  padding-top: 0.3em;
  padding-bottom: 0.3em;
}

.single-comment .delete-comment {
  visibility: hidden;
}

.single-comment:hover .delete-comment {
  visibility: visible;
}

.avt {
  border-radius: 50%;
}

img {
  aspect-ratio: 1/1;
}


</style>
