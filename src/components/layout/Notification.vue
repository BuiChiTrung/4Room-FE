<template>
  <div id="notifications" class="dropdown dropstart">
    <a  href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
      <i class="fas fa-bell" @click="getNotifications" :class="{'new-notification': newNotification}"></i>
    </a>

    <ul v-if="notifications" class="dropdown-menu" aria-labelledby="dropdownMenuLink">
      <router-link :to="notification['link']" v-for="notification in notifications" :key="notification['id']">
        <span v-if="notification['upvote_id']" class="material-icons" style="color: #0984e3">thumb_up</span>
        <span v-if="notification['follow_id']" class="material-icons" style="color: pink">favorite</span>
        <span v-if="notification['comment_id']" class="material-icons" style="color: #6ab04c">question_answer</span>
        <span><strong>{{ notification['name_in_forum'] }}</strong> {{ notification['message'] }}</span>
      </router-link>

      <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </ul>

  </div>
</template>

<script>
import {notificationApi} from "../../infrastructure/apiServices";
import InfiniteLoading from "vue-infinite-loading";

export default {
  name: "Notification",
  components: {
    InfiniteLoading,
  },

  data() {
    return {
      notifications: [],
      newNotification: 0,
      page: 2
    }
  },

  created() {
    notificationApi.countUnread()
      .then(({data}) => {
          console.log(data);
          this.newNotification = data['unread_notifications'];
      })
      .catch(err => console.log(err));
  },

  methods: {
    getNotifications() {
      this.markAsRead();
      this.infiniteHandler();
    },

    infiniteHandler($state) {
      notificationApi.getNotifications(this.page).then(({ data }) => {
        if (data.data.length) {
          this.page += 1;
          this.notifications.push(...data['data'].map(this.parseNotification));
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    },

    markAsRead() {
      notificationApi.markAsRead()
        .then(() => this.newNotification = false)
        .catch(err => console.log(err));
    },

    parseNotification(notification) {
      let formattedNotification = {...notification};
      formattedNotification.link = `/profile/${notification['record']['user_id']}`
      if (notification['follow_id'] !== null) {
        formattedNotification.message = 'started following you.'

      } else if (notification['upvote_id'] !== null) {
        formattedNotification.message = ' upvoted on your post.'
        // TODO: formattedNotification link
      } else {
        formattedNotification.message = ' commented on your post.'
        // TODO: formattedNotification link
      }
      return formattedNotification
    },

  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/sass/style';
#notifications {
  i {
    font-size: 2.5rem;
  }

  .new-notification {
    color: #ff4757;
  }

  .dropdown-menu {
    transform: translate(0rem, 3.5rem) !important;
    padding: 0;
    max-height: 50vh;
    overflow-y: scroll;
    a {
      width: 30rem;
      padding: 1rem 1rem 2rem;
      font-size: 1.5rem;
      @include flex-center;
      .material-icons {
        margin-right: 1rem;
      }
    }
    a:hover {
      background: #f5f6fa;
    }
  }
}
</style>
