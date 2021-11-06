<template>
<div class="posts">
    <SinglePost
        v-for="(item, index) in postLists" :key="index"
        :postID="item.post_id"
        :author="item.owner_id"
        :content="item.content"
        :filename="item.filename"
        :upvote="item.upvote"
        :comments="item.comments"
    />
<!--  <infinite-loading spinner="spiral"></infinite-loading>-->
</div>
</template>

<script>
// import InfiniteLoading from 'vue-infinite-loading'
import SinglePost from "./SinglePost";

export default {
  name: "Posts",
  components: {
    // InfiniteLoading,
    SinglePost
  },
  props: {
    typePosts: { //TODO: use this type to determine postLists to fetch
      type: String,
      require: true
    }
  },
  data() {
    return {
      // TODO: use InfiniteLoading instead of mock-data
      postLists: [
        {
          "post_id": 1,
          "owner_id": "vuquangle",
          "content": "hope this can help",
          "filename": "networking.pdf",
          "upvote": 0,
          "comments": [
            {
              "user_id": "Bob",
              "content": "oke!"
            },
            {
              "user_id": "Alice",
              "content": "it's suck!"
            }
          ]
        },
        {
          "post_id": 2,
          "owner_id": "vuquangle",
          "content": "hope this can help",
          "filename": "web.pdf",
          "upvote": 2,
          "comments": [
            {
              "user_id": "Bob",
              "content": "oke!"
            },
            {
              "user_id": "Alice",
              "content": "it's suck!"
            }
          ]
        },
        {
          "post_id": 3,
          "owner_id": "vuquangle",
          "content": "hope this can help",
          "filename": "x.pdf",
          "upvote": 10,
          "comments": [
            {
              "user_id": "Bob",
              "content": "oke!"
            },
            {
              "user_id": "Alice",
              "content": "it's suck!"
            }
          ]
        }
      ],
      // firstPostId: 1
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


</style>
