<template>
<div id="follow-suggestion">
  <h4>People you may want to follow</h4>
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

#follow-suggestion {
  //position: fixed;
  background-color: #f0f2f5;
  width: 80%;

  h4 {
    //font-weight: bold;
  }
}

</style>
