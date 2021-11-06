<template>
<div class="container">
  <div class="row" v-for="(item, index) in comments" :key="index">
    <SingleComment :user_id="item.user_id" :content="item.content"/>
  </div>

  <div class="row">
    <hr>
    <div class="d-flex mb-3 reply">
      <a href="#" style="margin-right: 0.5em">
        <img class="comment-avatar" src="@/assets/images/icons/avatar.png" alt="avatar">
      </a>
      <input
          type="text"
          v-model.trim="reply"
          class="reply-text"
          placeholder="Leave a comment..."
          maxlength="250"
          required
          @keyup.enter="submitComment"
      />
    </div>
  </div>
</div>
</template>

<script>
import SingleComment from "./SingleComment";
export default {
  name: "Comments",
  components: {SingleComment},
  props: {
    comments: {
      type: Array,
      require: false,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      currentUser: '',
      reply: ''
    }
  },
  mounted() {
    this.$data.currentUser = 'vuquangle'//TODO: localStorage.getItem('user_id')
  },
  methods: {
    submitComment() {
      if (this.reply !== '') {
        this.$emit('submit-comment', this.reply)
      }
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

</style>
