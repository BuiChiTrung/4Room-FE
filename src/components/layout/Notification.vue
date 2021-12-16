<template>
  <div id="notifications" class="dropdown dropstart">
    <a  href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
      <i class="fas fa-bell" @click="getNotifications"></i>
    </a>

    <div id="new-notification" v-if="newNotification">{{ newNotification }}</div>

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
      page: 1
    }
  },

  created() {
    const channel = window.pusher.subscribe('private-notification_user.' + JSON.parse(localStorage.getItem('user_info'))['id']);
    channel.bind('NotificationUpdate', (data) => {
      console.log(data);
      this.notifications.unshift(this.parseNotification(data['notification']))
      this.newNotification++;
    });

    notificationApi.countUnread()
      .then(({data}) => {
          this.newNotification = data['unread_notifications'];
      })
      .catch(err => console.log(err));
  },

  methods: {
    getNotifications() {
      this.page = 1;
      this.notifications = [];
      this.markAsRead();
      this.infiniteHandler();
    },

    infiniteHandler($state) {
      notificationApi.getNotifications(this.page).then(({ data }) => {
        console.log(data.data);
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
        .then(() => this.newNotification = 0)
        .catch(err => console.log(err));
    },

    parseNotification(notification) {
      console.log(notification);
      let formattedNotification = {...notification};
      if (notification['follow_id'] !== null) {
        formattedNotification.message = 'started following you.'
        formattedNotification.link = `/profile/${notification['record']['user_id']}`
      } else if (notification['upvote_id'] !== null) {
        formattedNotification.message = ' upvoted on your post.'
        formattedNotification.link = `/post/${notification['record']['post_id']}`
      } else {
        formattedNotification.message = ' commented on your post.'
        formattedNotification.link = `/post/${notification['record']['post_id']}`
      }
      return formattedNotification
    },

  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/sass/style';
#notifications {
  width: 4rem;
  position: relative;
  i {
    font-size: 2.5rem;
  }
  i:hover {
    color: rgba(0, 0, 0, 0.44);
  }

  #new-notification {
    width: 1.5rem;
    text-align: center;
    position: absolute;
    right: 0;
    top: 0;
    background: #ff4757;
    color: white;
    padding: 0 0.2rem;
    border-radius: 50%;
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
