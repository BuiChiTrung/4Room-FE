<template>
<div class="d-flex mb-3 single-comment">
  <a :href="`/profile/${userID}`" style="margin-right: 0.5em">
    <img class="comment-avatar" src="@/assets/images/icons/avatar.png" alt="avatar">
  </a>
  <h5 v-if="!editMode" class="text-start text-break" style="margin-top: 0.3em;">
    <a :href="`/profile/${userID}`" style="text-decoration: none; color: black">
    <span class="text-start text-break fw-bold">{{ nameInForum }}</span>
    </a>
    {{content}}
  </h5>
  <div class="ms-auto" v-if="ownComment" style="display: inline;">
    <figure class="delete-comment" style="cursor: pointer;" @click="deleteComment">
      <img src="@/assets/images/remove/remove.png" alt="" style="height: 1.8em" >
    </figure>
  </div>
</div>
</template>

<script>
export default {
  name: "SingleComment",
  props: {
    userID: {
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
      user_info: JSON.parse(localStorage.getItem('user_info')) // current user
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
    }
  }
}
</script>

<style lang="scss" scoped>

.comment-avatar {
  height: 2.8em;
}

.single-comment {
  padding: 1em;
  margin-bottom: 1em;
  align-items: center;
  color: #333;
  background-color: #F2F2F2;
  border-radius: 2.5em;
  box-shadow: 0.1em 0.1em 3px rgba(0, 0, 0, 0.2);
}

.single-comment .delete-comment {
  visibility: hidden;
}

.single-comment:hover .delete-comment {
  visibility: visible;
}
</style>
