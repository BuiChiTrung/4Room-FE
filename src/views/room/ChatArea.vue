<template>
  <main id="chat-area">
    <div id="chat-area-name">
      <div># {{ roomName }} chat room</div>
    </div>

    <div id="messages">
      <infinite-loading direction="top" @infinite="infiniteHandler"></infinite-loading>

      <div class="message" v-for="message in messages" :key="message['id']" :class="{'message-logged-in-user': isLoggedInUserMessage(message['user_id'])}">
        <a :href="`/profile/${message['user_id']}`"><img class="author-avatar avt" :src="avtURL(message['avatar_id'])" alt="image"></a>
        <div class="author-content">
          <div class="author">{{ message['name_in_forum'] }}</div>
          <div class="content" v-for="content in message['contents']" :key="content['id']">
            {{ content['content'] }}
          </div>
        </div>
      </div>
    </div>

    <form @submit="sendMessage">
      <input  type="text" name="new_message" placeholder="Type in your message" v-model="newMessage['content']" autocomplete="off">
      <i id="btn-send" class="fas fa-paper-plane" @click="sendMessage"></i>
    </form>
  </main>
</template>

<script>
import {messageApi} from "@/infrastructure/apiServices";
import InfiniteLoading from "vue-infinite-loading";
import {avatarURL} from "@/infrastructure/apiServices";

export default {
  name: 'ChatArea',
  components: {InfiniteLoading},
  props: ['roomName'],

  data() {
    return {
      messages: [],
      newMessage: {
        'content': null
      },
      page: 1
    }
  },

  created() {
    const channel = window.pusher.subscribe(`private-message_room.${this.$route.params.id}`);
    channel.bind('MessageUpdateEvent', ({message: data}) => {
      data = {
        'message_id': data['id'],
        'user_id': data['owner']['id'],
        'avatar_id': data['owner']['avatar_id'],
        'name_in_forum': data['owner']['name_in_forum'],
        'content': data['content']
      }
      const totalMessages = this.messages.length;
      if (data['user_id'] === this.messages[totalMessages - 1]['user_id']) {
        this.messages[totalMessages - 1]['contents'].push({'id': data['message_id'], 'content': data['content']})
      }
      else
        this.messages.push({
          'user_id': data['user_id'],
          'name_in_forum': data['name_in_forum'],
          'avatar_id': data['avatar_id'],
          'contents': [{'id': data['message_id'], 'content': data['content']}]
        })
      setTimeout(() => {
        let objDiv = document.getElementById("messages");
        objDiv.scrollTop = objDiv.scrollHeight;
      })
    })
  },

  methods: {
    infiniteHandler($state) {
      messageApi.getMessagesInRoom(this.$route.params.id, this.page)
      .then(({ data }) => {
        if (data.data.length) {
          this.page += 1;
          this.messages.unshift(...this.mergeMessageOfSamePerson(data.data).reverse());
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    },

    isLoggedInUserMessage(userId) {
      return userId === parseInt(JSON.parse(localStorage.getItem('user_info'))['id'])
    },

    mergeMessageOfSamePerson(messages) {
      let mergedMessages = [];
      for (let i = 0; i < messages.length;) {
        let messagesOfSamePerson = {
          'user_id': messages[i]['owner']['id'],
          'name_in_forum': messages[i]['owner']['name_in_forum'],
          'avatar_id': messages[i]['owner']['avatar_id'],
          'contents': []
        };

        let j = i;
        while(j < messages.length && messages[j]['owner']['id'] === messages[i]['owner']['id']) {
          messagesOfSamePerson['contents'].push({
            'id': messages[j]['owner']['id'],
            'content': messages[j]['content']
          });
          ++j;
        }

        messagesOfSamePerson['contents'] = messagesOfSamePerson['contents'].reverse();
        mergedMessages.push(messagesOfSamePerson);
        i = j;
      }
      return mergedMessages;
    },

    sendMessage(e) {
      e.preventDefault();
      messageApi.sendMessage(this.newMessage, this.$route.params.id)
      .then(() => {})
      .catch(err => console.log(err));
      this.newMessage['content'] = '';
    },

    avtURL(avtID) {
      return avatarURL(avtID)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/sass/style';
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,500;1,300&display=swap');

.avt {
  border-radius: 50%;
}

#chat-area {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  font-family: 'Open Sans', sans-serif;

  border-radius: 2rem;
  background: white;
  width: calc(100vw - #{$sidebar-width} - 6rem);
  height: calc(100vh - #{$navbar-height} - 2rem);
  padding: 5rem 3rem 3rem;

  #chat-area-name {
    position: absolute;
    top: 1rem;
    div {
      text-transform: capitalize;
      font-size: 2rem;
      font-weight: bold;
    }
  }

  #messages {
    margin: 2rem 0;
    flex-grow: 1;
    overflow-y: scroll;

    .message {
      display: flex;
      align-items: flex-end;
      margin-bottom: 1rem;

      .author-avatar {
        width: 4rem;
        margin-right: 2rem;
      }

      .author {
        color: #636e72;
        margin-left: 1.5rem;
      }

      .content {
        width: fit-content;
        font-size: 1.3rem;
        background: whitesmoke;
        padding: 0.5rem 1.5rem;
        border-radius: 1.5rem;
        margin-bottom: 0.3rem;
      }
    }

    .message-logged-in-user {
      //flex-direction: column;
      justify-content: flex-end;

      .author-content {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding-right: 2rem;
      }

      .content {
        background: $main_color1;
        color: white;
      }
      .author-avatar, .author {
        display: none;
      }
    }
  }

  form {
    @include flex-center;
    justify-content: space-around;
    border-radius: 2rem;
    border: 1px solid black;
    padding: 0.3rem;

    background: rgba(245, 245, 245, 0.6);
    input {
      width: 90%;
      display: inline;
      margin-right: 2rem;
      border: none;
      font-size: 1.2rem;
      background: rgba(245, 245, 245, 0.6);
    }
    input:focus {
      outline: none;
    }

    #btn-send {
      font-size: 2rem;
    }
    #btn-send:hover {
      color: rgba(50, 63, 76, 0.68);
      cursor: pointer;
    }
  }
}

img {
  aspect-ratio: 1/1;
}

</style>
