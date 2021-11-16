<template>
<div>
  <p>People you may want to follow</p>
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
    const self = this;
    followApi.suggestFollow()
      .then(({data}) => {
        self.usersInfo = data['data'];
        // console.log(self.usersInfo[0]);
      })
      .catch(err => console.log(err));
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/sass/style";


</style>
