<template>
<div class="posts">
    <SinglePost
        v-for="(item, index) in postLists" :key="index"
        :postID="item.post_id"
        :ownerID="item.owner_id"
        :nameInForum="item.name_in_forum"
        :content="item.content"
        :file="item.file"
        :upvote="item.upvote"
        :comments="item.comments"
    />
    <infinite-loading @infinite="infiniteHandler"></infinite-loading>

</div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import SinglePost from "./SinglePost";
import {fetchPost} from "@/infrastructure/apiServices";

export default {
  name: "Posts",
  components: {
    InfiniteLoading,
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
      postLists: [],
      page: 1
    }
  },
  methods: {
    infiniteHandler($state) {
      fetchPost(this.$data.page)
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
