<template>
  <NavBar bgColor="white"/>
  <SideBar bgColor="rgba(223, 249, 251,0.2)"/>

  <main class="container w-100 vh-100 p-3">
    <div class="row justify-content-center">
      <div class="col-8 container newsfeed">
        <div class="row justify-content-center">
          <div class="col-10">
            <UpPost></UpPost>
          </div>
        </div>

        <div class="row justify-content-center" style="margin-top: 2em">
          <div class="col-10">
            <Posts></Posts>
          </div>
        </div>
      </div>

      <div class="follow col-4">
        follow
        <Follow></Follow>
      </div>
    </div>

  </main>
</template>

<script>
import SideBar from "@/components/layout/SideBar";
import NavBar from "@/components/layout/NavBar";
import UpPost from "../../components/newsfeed/UpPost";
import Posts from "../../components/newsfeed/Posts";
import Follow from "../../components/newsfeed/Follow";

export default {
  name: "HomePage",
  components: {
    NavBar,
    SideBar,
    UpPost,
    Posts,
    Follow
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/sass/style";

/* dev */
//main, main * {
//  border: 1px solid black;
//}

main {
  margin-top: 2em;
}

$breakpoint-tablet: 775px;
@media (max-width: $breakpoint-tablet) {
  .follow {
    display: none;
  }

  .newsfeed {
    width: 100%;
  }
}

</style>
