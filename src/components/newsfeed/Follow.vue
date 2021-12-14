<template>
<div id="follow-suggestion">
  <h4>People you may want to follow</h4>
  <UserList :usersInfo="usersInfo" :followDirectly="true"/>
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
        this.usersInfo = data['data'];
      })
      .catch(err => console.log(err));
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/sass/style";

#follow-suggestion {
  background-color: #f0f2f5;
  width: 80%;
}

</style>
