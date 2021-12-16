<template>
<div class="posts">
    <SinglePost
        v-for="(item, index) in postLists" :key="index"
        :postID="item.id"
        :ownerID="item.owner.id"
        :avatarID="item.owner.avatar_id"
        :nameInForum="item.owner.name_in_forum"
        :title="item.title"
        :content="item.content"
        :file="item.file"
        :upvote="item.upvote"
        :comments="item.comments"
        :indexInPostLists="index"
        :hideAllComments="true"
        @delete-post="deletePost"
    />
    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
</div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import SinglePost from "./SinglePost";
import {fetchPost, fetchUserPost, deleteAPost} from "@/infrastructure/apiServices";

export default {
  name: "Posts",
  components: {
    InfiniteLoading,
    SinglePost
  },
  props: {
    typePosts: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      postLists: [],
      page: 1
    }
  },
  methods: {
    infiniteHandler($state) {
      const fetch = (this.$props.typePosts['name'] === 'HomePage' ? fetchPost : fetchUserPost)
      fetch(this.$data.page, this.$props.typePosts.userID)
      .then(response => {
        const posts = response.data['data']
        if (posts.length) {
          this.postLists.push(...posts)
          $state.loaded()
          this.$data.page ++
        } else {
          $state.complete()
        }
      })
      .catch(err => console.log(err))
    },

    deletePost(indexInPostLists) {
      deleteAPost(this.$data.postLists[indexInPostLists]["id"])
      .then(response => {
        console.log(response)
        this.$data.postLists.splice(indexInPostLists, 1)
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


</style>
