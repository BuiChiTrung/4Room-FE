<template>
<div style="position: fixed; background-color: #f0f2f5;">
  <h6>People you may want to follow</h6>
  <UserList :usersInfo="usersInfo"/>
</div>
</template>

<script>
import UserList from "../element/UserList";
import {followApi} from "../../infrastructure/apiServices";
export default {
  name: "Follow",
  components: {UserList},
  data() {
    return {
      'usersInfo': []
    }
  },
  created() {
    followApi.suggestFollow()
      .then(({data}) => {
        this.usersInfo = data['data'].slice(2);
      })
      .catch(err => console.log(err));
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/sass/style";


</style>
