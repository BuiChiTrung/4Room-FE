<template>
<div class="container">
  <div class="row" v-for="(item, index) in comment" :key="index">
    <SingleComment
        :nameInForum="item.owner.name_in_forum"
        :userID="item.owner.id"
        :avatarID="item.owner.avatar_id"
        :content="item.content"
        :indexInCmtList="index"
        @delete-comment="deleteComment"
    />
  </div>

  <div class="row">
    <div class="d-flex mb-3 reply">
      <a href="#" style="margin-right: 0.5em">
        <img class="comment-avatar avt" :src="avtURL()" alt="avatar">
      </a>
      <input
          type="text"
          v-model.trim="reply"
          class="reply-text"
          placeholder="Leave a comment..."
          required
          @keyup.enter="submitComment"
      />
    </div>
  </div>
</div>
</template>

<script>
import SingleComment from "./SingleComment";
import {avatarURL} from "@/infrastructure/apiServices";
export default {
  name: "Comments",
  components: {SingleComment},
  props: {
    comment: {
      type: Array,
      require: false,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      reply: ''
    }
  },
  methods: {
    submitComment() {
      if (this.reply !== '') {
        this.$emit('submit-comment', this.reply)
        this.reply = ''
      }
    },

    deleteComment(indexInCmtList) {
      this.$emit('delete-comment', indexInCmtList)
    },

    avtURL() {
      const avtID = JSON.parse(localStorage.getItem('user_info'))['avatar_id']
      return avatarURL(avtID)
    }
  }
}
</script>

<style lang="scss" scoped>

//div, div > * {
//  border: 1px black solid;
//}

.comment-avatar {
  height: 2.8em;
}

.reply {
  align-items: center;
  background-color: #EBEBEB;
  border-radius: 30px;
  padding: 5px 10px;
  //overflow: hidden;
}

.reply-text {
  font-size: 1.2em;
  min-height: 2.5em;
  padding: 0em 1.2em;
  margin-right: 10px;
  border: 0;
  color: #333;
  width: 100%;
  outline: 0;
  background-color: transparent;
  box-shadow: none;
}

.avt {
  border-radius: 50%;
}

img {
  aspect-ratio: 1/1;
}


</style>
