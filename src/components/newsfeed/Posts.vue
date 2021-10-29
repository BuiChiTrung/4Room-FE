<template>
<div class="posts">
  <SinglePost :caption="'Hello'" :author="'Alice'" :filename="'web.pdf'" :link="'#'" :upvote="10"></SinglePost>
  <SinglePost :caption="'Hi'" :author="'Bob'" :filename="'networking.pdf'" :link="'#'" :upvote="10"/>
  <SinglePost :caption="'Hello hi blah blah Hello hi blah blah Hello hi blah blah Hello hi blah blah Hello hi blah blah Hello hi blah blah'" :author="'Alice'" :filename="'software.pdf'" :link="'#'" :upvote="10"/>
<!--  <div v-for="(item, index) in postLists" :key="index">-->
<!--    <SinglePost />-->
<!--  </div>-->
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
  data() {
    // return {
    //   postLists: [],
    //   firstPostId: 1
    // }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/sass/style";

/* dev */
//div, div > * {
//  border: 1px black solid;
//}

.posts {
}

</style>
