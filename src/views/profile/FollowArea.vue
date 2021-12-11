<template>
  <div id="follow-area">
    <span data-bs-toggle="modal" data-bs-target="#follow-modal" @click="getFollowing" style="cursor: pointer;"><i>Following:</i> <strong>{{userInfo['following']}}</strong></span>
    <span v-if="!profileOwner && !followStatus" @click="followUser" title="Follow" class="material-icons" style="cursor: pointer;">favorite_border</span>
    <span v-if="!profileOwner && followStatus" @click="unFollowUser" title="Unfollow" class="material-icons" style="cursor: pointer;">favorite</span>
    <span data-bs-toggle="modal" data-bs-target="#follow-modal" @click="getFollowers" style="cursor: pointer;"><i>Follower:</i> <strong>{{userInfo['follower']}}</strong></span>

    <div class="modal fade" id="follow-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold" id="exampleModalLabel">{{ modalTitle }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" data-bs-dismiss="modal">
            <UserList :usersInfo="followList"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import {followApi} from "../../infrastructure/apiServices";
import UserList from "../../components/element/UserList";

export default {
  name: "FollowArea",
  components: {UserList},
  computed: mapState(['userInfo', 'followStatus']),
  props: ['profileOwner'],

  data() {
    return {
      followList: [],
      modalTitle: '',
    }
  },

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
    },

    getFollowers() {
      followApi.getFollowers(this.userInfo['id'])
        .then(({data}) => {
          this.followList = data.data;
          this.modalTitle = 'Followers';
          this.userInfo['follower'] = this.followList.length
        })
        .catch(err => console.log(err))
    },

    getFollowing() {
      followApi.getFollowing(this.userInfo['id'])
          .then(({data}) => {
            this.followList = data.data;
            this.modalTitle = 'Following';
            this.userInfo['following'] = this.followList.length
          })
          .catch(err => console.log(err))
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'src/assets/sass/style';

#follow-area {
  margin: 0 auto;
  font-size: 1.5rem;
  display: flex;
  justify-content: space-between;
  color: #2a2929;
  .material-icons {
    font-size: 3rem;
    color: pink;
  }
  i {
    font-weight: 600;
  }
  strong {
    font-weight: 1000;
    font-size: 1.7rem;
  }
}

#follow-modal {
  .modal-dialog {
    width: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .modal-body {
    max-height: 50vh;
    overflow-y: scroll;
  }
}
</style>
