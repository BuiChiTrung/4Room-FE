<template>
  <div id="follow-area">
    <span data-bs-toggle="modal" data-bs-target="#follow-modal">Following: {{userInfo['following']}}</span>
    <span v-if="!profileOwner && !followStatus" @click="followUser" title="Follow" class="material-icons" style="cursor: pointer;">favorite_border</span>
    <span v-if="!profileOwner && followStatus" @click="unFollowUser" title="Unfollow" class="material-icons" style="cursor: pointer;">favorite</span>
    <span data-bs-toggle="modal" data-bs-target="#follow-modal">Follower: {{userInfo['follower']}}</span>

    <div class="modal fade" id="follow-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ...
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import {followApi} from "../../infrastructure/apiServices";

export default {
  name: "FollowArea",
  computed: mapState(['userInfo', 'followStatus']),
  props: ['profileOwner'],

  methods: {
    ...mapMutations(['updateFollowStatus']),

    followUser(event) {
      event.preventDefault();

      followApi.follow(this.userInfo['id'])
          .then(() => {
            this.updateFollowStatus(true);
            this.userInfo['follower']++;
          })
          .catch((err) => console.log(err))
    },

    unFollowUser(event) {
      event.preventDefault();
      followApi.unFollow(this.userInfo['id'])
          .then(() => {
            this.updateFollowStatus(false);
            this.userInfo['follower']--;
          })
          .catch((err) => console.log(err))
    }
  },
}
</script>

<style lang="scss" scoped>
#follow-area {
  width: 30rem;
  margin: 0 auto;
  font-size: 1.5rem;
  display: flex;
  justify-content: space-between;
  color: #2a2929;
  .material-icons {
    font-size: 3rem;
    color: pink;
  }
}

#follow-modal {

}
</style>
