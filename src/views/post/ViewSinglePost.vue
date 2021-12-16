<template>
    <NavBar bgColor="white"/>
    <SideBar bgColor="white"/>
    <main class="container w-100 p-3">
      <div class="row justify-content-center">
        <div class="col-8 container newsfeed">
          <div class="row justify-content-center">
            <div class="col-10">
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
                  :hideAllComments="false"
                  @delete-post="deletePost"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
</template>

<script>
import SinglePost from "@/components/newsfeed/SinglePost";
import {getAPost, deleteAPost} from "@/infrastructure/apiServices";
import SideBar from "@/components/layout/SideBar";
import NavBar from "@/components/layout/NavBar";

export default {
  name: "ViewSinglePost",
  components: {SinglePost, SideBar, NavBar},
  data() {
    return {
      postLists: [],
      postID: null
    }
  },
  created() {
    if (this.$route.params.postid) {
      this.$data.postID = this.$route.params.postid
    } else {
      this.$router.push('/')
    }
  },
  mounted() {
    getAPost(this.$data.postID)
    .then(({data}) => {
      this.$data.postLists.push(data['data'])
    })
    .catch(err => {
      this.$router.push('/')
      console.log(err)
    })
  },
  methods: {
    deletePost(indexInPostLists) {
      deleteAPost(this.$data.postLists[indexInPostLists]["id"])
          .then(response => {
            console.log(response)
            this.$data.postLists.splice(indexInPostLists, 1)
            this.$router.push('/')
          })
          .catch(err => {
            alert('Error: Fail to delete post. Try again')
            console.log(err)
          })
    }
  }
}
</script>

<style scoped>

</style>
